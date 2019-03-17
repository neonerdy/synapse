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
    public class AttachmentController : Controller
    {

        private AppDbContext context;

        public AttachmentController() 
        {
            context = new AppDbContext();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByBugId(Guid id)
        {
            var attachments = await context.Attachments
                .Where(a=>a.BugId == id).ToListAsync();

            return Ok(attachments);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var attachment = await context.Attachments.FindAsync(id);
            context.Remove(attachment);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }

    }

}