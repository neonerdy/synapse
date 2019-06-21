

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
    public class HistoryController : Controller
    {
        public AppDbContext context;
        public HistoryController() 
        {
            context = new AppDbContext();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByTaskId(Guid id)
        {
            var histories = await context.Histories
                .Where(h=>h.TaskId == id)
                .ToListAsync();
            
            return Ok(histories); 
        }



    }

}