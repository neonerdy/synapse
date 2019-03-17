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
    public class CommentController : Controller
    {
        private AppDbContext context;
        public CommentController() 
        {
            context = new AppDbContext();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByBugId(Guid id)
        {
            var comments = await context.Comments
                .Include(c=>c.Commenter)
                .Where(c=>c.BugId == id).ToListAsync();
            
            return Ok(comments); 
        }
        

        [HttpPost]
        public async Task<IActionResult> Save(Comment comment)
        {
            comment.ID = Guid.NewGuid();
            comment.CreatedDate = DateTime.Now;
            context.Add(comment);

            var result = await context.SaveChangesAsync();
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Comment comment)
        {
            context.Update(comment);
            var result = await context.SaveChangesAsync();
            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var comment = await context.Comments.FindAsync(id);
            context.Remove(comment);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }




    }

}