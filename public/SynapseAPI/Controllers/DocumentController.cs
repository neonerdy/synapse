

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
    public class DocumentController : Controller
    {

        public AppDbContext context;

        public DocumentController()
        {
            context = new AppDbContext();;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await context.Documents
                .Include(d=>d.Author)
                .OrderByDescending(d=>d.CreatedDate)
                .ToListAsync();
            
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult>  GetById(Guid id)
        {
            var project = await context.Documents.FindAsync(id);
            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody]Document document)
        {
            document.ID = Guid.NewGuid();
            document.CreatedDate = DateTime.Now;

            context.Add(document);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody]Document document)
        {
            context.Update(document);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var document = await context.Documents.FindAsync(id);
            context.Remove(document);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }



    }

}