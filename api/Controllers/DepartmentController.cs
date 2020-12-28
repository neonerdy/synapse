using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SynapseAPI.Models;

namespace SynapseAPI.Controllers
{

    [Route("api/[controller]/[action]")]
    public class DepartmentController : Controller
    {
        private AppDbContext context;

        public DepartmentController() {
            context = new AppDbContext();
        }

        [HttpGet]    
        public async Task<IActionResult> GetAll()
        {
            var departments = await context.Departments
                .OrderBy(d=>d.DepartmentName)
                .ToListAsync();

            return Ok(departments);
        }

        [HttpGet("{id}")]    
        public async Task<IActionResult> GetById(Guid id)
        {
            var department = await context.Departments.FindAsync(id);
            return Ok(department);
        }



    }

}
