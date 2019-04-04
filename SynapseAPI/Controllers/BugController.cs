
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Synapse.Models;

namespace Synapse.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BugController : Controller
    {
        private AppDbContext context;
        public BugController()
        {
            context = new AppDbContext();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bugs = await context.Bugs
                .Include(b=>b.Assignee)
                .Select(b=>new {
                    b.ID,
                    b.Tracker,
                    b.Title,
                    b.Priority,
                    Assignee = b.Assignee.FullName,
                    b.Status,
                    b.CreatedDate
                })
                .OrderByDescending(b=>b.CreatedDate)
                .ToListAsync();
            
            return Ok(bugs);
        }



        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetByProject(Guid projectId)
        {
            var bugs = await context.Bugs
                .Include(b=>b.Project)
                .Include(b=>b.Assignee)
                .Where(b=>b.ProjectId == projectId)
                .OrderByDescending(b=>b.CreatedDate)
                .ToListAsync();
            
            return Ok(bugs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var bug = await context.Bugs
                .Include(b=>b.Project)
                .Include(b=>b.Reporter)
                .Include(b=>b.Assignee)
                .Include(b=>b.Tester)
                .Where(b=>b.ID == id)
                .SingleOrDefaultAsync();
            
            return Ok(bug);
        }


        [HttpGet("{status}")]
        public async Task<IActionResult> GetByStatus(string status)
        {
            var bugs = await context.Bugs
                .Include(b=>b.Project)
                .Include(b=>b.Reporter)
                .Include(b=>b.Assignee)
                .Include(b=>b.Tester)
                .Where(b=>b.Status == status)
                .OrderByDescending(b=>b.CreatedDate)
                .ToListAsync();

            return Ok(bugs);
        }

        
        
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Bug bug)
        {
            var project = await context.Projects.Where(p=>p.ID == bug.ProjectId)
                            .SingleOrDefaultAsync();
            
            var existingBug = await context.Bugs
                .OrderByDescending(b=>b.CreatedDate)
                .Where(b=>b.ProjectId == bug.ProjectId)    
                .Take(1)
                .SingleOrDefaultAsync();

            string newTracker =  "";
          
            if (existingBug != null) {

                var tracker = existingBug.Tracker;;
                var trackers = tracker.Split('-');
                var increment = Convert.ToInt32(trackers[1]) + 1;
                newTracker = trackers[0] + "-" + increment;

            } else {
                newTracker = project.Initial + "-1";
            }

            bug.ID = Guid.NewGuid();
            bug.Tracker = newTracker;
            bug.CreatedDate = DateTime.Now;
            bug.Status = "New";

            context.Add(bug);
            var result = await context.SaveChangesAsync();
           
            return Ok(result);    
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Bug bug)
        {
            bug.ModifiedDate = DateTime.Now;
            context.Update(bug);

            var result = await context.SaveChangesAsync();
            return Ok(result);
        }


        [HttpGet("{id}/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status)
        {
            var bug = await context.Bugs.FindAsync(id);
            bug.Status = status;
            context.Update(bug);

            var result = await context.SaveChangesAsync();
            return Ok(result);    
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var bug = await context.Bugs.FindAsync(id);
            context.Remove(bug);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }

        

    }


}