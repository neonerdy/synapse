using System;
using Microsoft.EntityFrameworkCore;
using SynapseAPI.Models;

namespace SynapseAPI
{
    public class AppDbContext : DbContext
    {
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Branch> Branches { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attendance>(entity =>{
                entity.ToTable("attendances");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
                entity.Property(e => e.WorkScheduleId).HasColumnName("work_schedule_id");
                entity.Property(e => e.AttendanceDate).HasColumnName("attendance_date");
                entity.Property(e => e.ClockIn).HasColumnName("clock_in");
                entity.Property(e => e.ClockOut).HasColumnName("clock_out");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.LateDuration).HasColumnName("late_duration");
                entity.Property(e => e.Note).HasColumnName("note");
            });

            modelBuilder.Entity<Branch>(entity =>{
                entity.ToTable("branches");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.BranchName).HasColumnName("branch_name");
                entity.Property(e => e.Province).HasColumnName("province");
                entity.Property(e => e.City).HasColumnName("city");
            });

            modelBuilder.Entity<Department>(entity =>{
                entity.ToTable("departments");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.DepartmentName).HasColumnName("department_name");
                entity.Property(e => e.Description).HasColumnName("description");
            });

            modelBuilder.Entity<Attendance>(entity =>{
                entity.ToTable("attendances");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            });

            modelBuilder.Entity<Employee>(entity =>{
                entity.ToTable("employees");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeCode).HasColumnName("employee_code");
                entity.Property(e => e.EmployeeName).HasColumnName("employee_name");
                entity.Property(e => e.BirthDate).HasColumnName("birth_date");
                entity.Property(e => e.BirthPlace).HasColumnName("birth_place");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.City).HasColumnName("city");
                entity.Property(e => e.Province).HasColumnName("province");
                entity.Property(e => e.ZipCode).HasColumnName("zip_code");
                entity.Property(e => e.Nationality).HasColumnName("nationality");
                entity.Property(e => e.NationalIdentityId).HasColumnName("national_identity_id");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.Gender).HasColumnName("gender");
                entity.Property(e => e.Religion).HasColumnName("religion");
                entity.Property(e => e.MaritalStatus).HasColumnName("marital_status");
                entity.Property(e => e.NumberOfChilds).HasColumnName("number_of_childs");
                entity.Property(e => e.BloodType).HasColumnName("blood_type");
                entity.Property(e => e.BranchId).HasColumnName("branch_id");
                entity.Property(e => e.DepartmentId).HasColumnName("department_id");
                entity.Property(e => e.JobTitleId).HasColumnName("job_title_id");
                entity.Property(e => e.JoinDate).HasColumnName("join_date");
                entity.Property(e => e.ResignDate).HasColumnName("resign_date");
                entity.Property(e => e.EmploymentStatus).HasColumnName("employment_status");
                entity.Property(e => e.ApprovalLineId).HasColumnName("approval_line_id");
                entity.Property(e => e.BasicSalary).HasColumnName("basic_salary");
                entity.Property(e => e.PaymentType).HasColumnName("payment_type");
                entity.Property(e => e.BankName).HasColumnName("bank_name");
                entity.Property(e => e.BankAccount).HasColumnName("bank_account");
                entity.Property(e => e.NPWP).HasColumnName("npwp");
                entity.Property(e => e.Photo).HasColumnName("photo");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
                
            });
            



        }

    }


        

    
     

}