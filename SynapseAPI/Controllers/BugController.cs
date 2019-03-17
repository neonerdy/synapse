
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
                .Where(b=>b.ProjectId == id)
                .SingleOrDefaultAsync();
            
            return Ok(bug);
        }
        
        
        [HttpPost]
        public async Task<IActionResult> Save(Bug bug)
        {
            bug.ID = Guid.NewGuid();
            bug.CreatedDate = DateTime.Now;
            bug.Status = "New";

            context.Add(bug);
            var result = await context.SaveChangesAsync();

            return Ok(result);    
        }

        [HttpPut]
        public async Task<IActionResult> Update(Bug bug)
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