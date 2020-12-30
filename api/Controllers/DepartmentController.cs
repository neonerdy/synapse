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


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Department department)
        {
            int result = 0;

            department.ID = Guid.NewGuid();
            context.Departments.Add(department);
            result = await context.SaveChangesAsync();

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Department department)
        {
            int result = 0;
            context.Update(department);
            result = await context.SaveChangesAsync();
            return Ok(result);
        }
        

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            int result = 0;

            var department = await context.Departments.FindAsync(id);
            context.Remove(department);
            result = await context.SaveChangesAsync();

            return Ok(result);
        }



    }

}
