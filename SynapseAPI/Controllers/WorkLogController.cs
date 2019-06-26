
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TaskMaster.Models;

namespace TaskMaster.Models
{
    [Route("api/[controller]/[action]")]
    public class WorkLogController : Controller
    {

        private AppDbContext context;
        public WorkLogController() 
        {
            context = new AppDbContext();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByTaskId(Guid id)
        {
             var workLogs = await context.WorkLogs
                .Include(w=>w.User)
                .Where(w=>w.TaskId == id)
                .Select(w=>new {
                    w.ID,
                    User = w.User.FullName,
                    Date = w.Date,
                    Log = w.Log,
                    Unit = w.Unit,
                    LogInMinute = w.LogInMinute
                }).ToListAsync();
            
            return Ok(workLogs); 
        }

        
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] WorkLog workLog)
        {
            workLog.ID = Guid.NewGuid();

            if (workLog.Unit == "Minute") {
                workLog.LogInMinute = workLog.Log;
            } else if (workLog.Unit == "Hour") {
                workLog.LogInMinute = workLog.Log * 60;
            } else if (workLog.Unit == "Day") {
                workLog.LogInMinute = workLog.Log * 8*60;
            }
           
            context.Add(workLog);

            var result = await context.SaveChangesAsync();
            return Ok(result);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var workLog = await context.WorkLogs.FindAsync(id);
            context.Remove(workLog);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


    }


}