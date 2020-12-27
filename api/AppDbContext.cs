using System;
using Microsoft.EntityFrameworkCore;
using SynapseAPI.Models;

namespace SynapseAPI
{
    public class AppDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Branch>(entity =>{
                entity.ToTable("branches");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.BranchName).HasColumnName("branch_name");
                entity.Property(e => e.Province).HasColumnName("province");
                entity.Property(e => e.City).HasColumnName("city");
            });

            modelBuilder.Entity<Department>(entity =>{
                entity.ToTable("departments");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.DepartmentName).HasColumnName("department_name");
                entity.Property(e => e.Description).HasColumnName("description");
            });


        }

    }


        

    
     

}