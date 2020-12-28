using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SynapseAPI.Models;

namespace SynapseAPI.Controllers
{

    [Route("api/[controller]/[action]")]
    public class EmployeeController : Controller
    {
        private AppDbContext context;

        public EmployeeController() {
            context = new AppDbContext();
        }

        [HttpGet]    
        public async Task<IActionResult> GetAll()
        {
            var employees = await context.Employees
                .OrderBy(e=>e.EmployeeName)
                .ToListAsync();

            return Ok(employees);
        }

        [HttpGet("{id}")]    
        public async Task<IActionResult> GetById(Guid id)
        {
            var employee = await context.Employees.FindAsync(id);
            return Ok(employee);
        }



    }

}
