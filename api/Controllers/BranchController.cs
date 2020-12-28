using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SynapseAPI.Models;

namespace SynapseAPI.Controllers
{

    [Route("api/[controller]/[action]")]
    public class BranchController : Controller
    {
        private AppDbContext context;

        public BranchController() {
            context = new AppDbContext();
        }

        [HttpGet]    
        public async Task<IActionResult> GetAll()
        {
            var branches = await context.Branches
                .OrderBy(b=>b.BranchName)
                .ToListAsync();

            return Ok(branches);
        }

        [HttpGet("{id}")]    
        public async Task<IActionResult> GetById(Guid id)
        {
            var branch = await context.Branches.FindAsync(id);
            return Ok(branch);
        }



    }

}
