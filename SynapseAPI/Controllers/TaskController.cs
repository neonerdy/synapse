
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TaskMaster.Models;

namespace TaskMaster.Controllers
{
    [Route("api/[controller]/[action]")]
    public class TaskController : Controller
    {
        private AppDbContext context;
        public TaskController()
        {
            context = new AppDbContext();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await context.Tasks
                .Include(t=>t.Assignee)
                .Select(t=>new {
                    t.ID,
                    t.Category,
                    t.Tracker,
                    t.Title,
                    t.Priority,
                    Assignee = t.Assignee.FullName,
                    t.Status,
                    t.CreatedDate
                })
                .OrderByDescending(t=>t.CreatedDate)
                .ToListAsync();
            
            return Ok(tasks);
        }



        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetByProject(Guid projectId)
        {
            var tasks = await context.Tasks
                .Include(t=>t.Project)
                .Include(t=>t.Assignee)
                .Where(t=>t.ProjectId == projectId)
                .OrderByDescending(t=>t.CreatedDate)
                .ToListAsync();
            
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var task = await context.Tasks
                .Include(t=>t.Project)
                .Include(t=>t.Reporter)
                .Include(t=>t.Assignee)
                .Include(t=>t.Tester)
                .Where(t=>t.ID == id)
                .SingleOrDefaultAsync();
            
            return Ok(task);
        }


        [HttpGet("{status}")]
        public async Task<IActionResult> GetByStatus(string status)
        {
            var tasks = await context.Tasks
                .Include(t=>t.Project)
                .Include(t=>t.Reporter)
                .Include(t=>t.Assignee)
                .Include(t=>t.Tester)
                .Where(t=>t.Status == status)
                .OrderByDescending(t=>t.CreatedDate)
                .ToListAsync();

            return Ok(tasks);
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetMyTask(Guid userId)
        {
            var tasks = await context.Tasks
                .Where(t=>t.AssigneeId == userId && t.Status != "Closed")
                .OrderByDescending(t=>t.CreatedDate)
                .ToListAsync();
            
            return Ok(tasks);
        }

       
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetMyNotification(Guid userId)
        {
            //need join to task, where task status = "closed"

            /* 
            var histories = await context.Histories
                .Where(h=>h.UserId == userId)
                .OrderByDescending(h=>h.Date)
                .ToListAsync();
            */

            return Ok();
        }

        
        
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] TaskMaster.Models.Task task)
        {
            var project = await context.Projects.Where(p=>p.ID == task.ProjectId)
                            .SingleOrDefaultAsync();
            
            var existingTask = await context.Tasks
                .OrderByDescending(t=>t.CreatedDate)
                .Where(t=>t.ProjectId == task.ProjectId)    
                .Take(1)
                .SingleOrDefaultAsync();

            string newTracker =  "";
          
            if (existingTask != null) {

                var tracker = existingTask.Tracker;;
                var trackers = tracker.Split('-');
                var increment = Convert.ToInt32(trackers[1]) + 1;
                newTracker = trackers[0] + "-" + increment;

            } else {
                newTracker = project.Initial + "-1";
            }

            task.ID = Guid.NewGuid();
            task.Tracker = newTracker;
            task.CreatedDate = DateTime.Now;
            task.Status = "New";

            context.Add(task);
            var result = await context.SaveChangesAsync();
           
            return Ok(result);    
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] TaskMaster.Models.Task task)
        {
            task.ModifiedDate = DateTime.Now;
            context.Update(task);

            var result = await context.SaveChangesAsync();
            return Ok(result);
        }


        [HttpGet("{id}/{status}/{userId}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status, Guid userId)
        {
            var task = await context.Tasks.FindAsync(id);
            task.Status = status;
          
            if (status == "Closed") {
                task.ClosedDate = DateTime.Now;
            } else {
                task.ModifiedDate = DateTime.Now;
                task.ClosedDate = null;
            }

            context.Update(task);

            var history = new History();

            history.ID = Guid.NewGuid();
            history.TaskId = task.ID;
            history.Date = DateTime.Now;
            //history.UserId = userId;
            history.ActivityLog = "Changed to " + task.Status + " on " + DateTime.Now;

            context.Add(history);
            
            var result = await context.SaveChangesAsync();
            return Ok(result);    
        }

        

        [HttpGet("{id}/{userId}")]
        public async Task<IActionResult> AssignedTaskToMe(Guid id, Guid userId)
        {
            var task = await context.Tasks.FindAsync(id);
            task.AssigneeId = userId;
            context.Update(task);

            var result = await context.SaveChangesAsync();
            return Ok(result);  
        }


        [HttpGet("{id}/{userId}")]
        public async Task<IActionResult> AssignedTesterToMe(Guid id, Guid userId)
        {
            var task = await context.Tasks.FindAsync(id);
            task.TesterId = userId;
            context.Update(task);

            var result = await context.SaveChangesAsync();
            return Ok(result);  
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var task = await context.Tasks.FindAsync(id);
            context.Remove(task);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }

        

    }


}