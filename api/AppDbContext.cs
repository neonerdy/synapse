using System;
using Microsoft.EntityFrameworkCore;
using SynapseAPI.Models;

namespace SynapseAPI
{
    public class AppDbContext : DbContext
    {
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeCourse> employeeCourses { get; set; }
        public DbSet<EmployeeEducation> EmployeeEducations { get; set; }
        public DbSet<EmployeeFamily> EmployeeFamilies { get; set; }
        public DbSet<EmployeeSalary> EmployeeSalaries { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<LoanInstallment> LoanInstallments { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<OverTime> OverTimes { get; set; }
        public DbSet<Payroll> Payrolls { get; set; }
        public DbSet<PayrollComponent> PayrollComponents { get; set; }
        public DbSet<Reimbursement> Reimbursements { get; set; }
        public DbSet<ReimbursementRequest> ReimbursementRequests { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleAccess> RoleAccesses { get; set; }
        public DbSet<SalaryComponent> SalaryComponents { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<WorkSchedule> WorkSchedules { get; set; }
        


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>(entity => 
            {
                entity.ToTable("announcements");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.Title).HasColumnName("title");
                entity.Property(e => e.Date).HasColumnName("date");
                entity.Property(e => e.Message).HasColumnName("message");
            });

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


            modelBuilder.Entity<EmployeeCourse>(entity => 
            {
                entity.ToTable("employee_courses");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
                entity.Property(e => e.CourseName).HasColumnName("course_name");
                entity.Property(e => e.Provider).HasColumnName("provider");
                entity.Property(e => e.StartDate).HasColumnName("start_date");
                entity.Property(e => e.EndDate).HasColumnName("end_date");
                entity.Property(e => e.Duration).HasColumnName("duration");
                entity.Property(e => e.IsCertified).HasColumnName("is_certified");
            });


            modelBuilder.Entity<EmployeeEducation>(entity => 
            {
                entity.ToTable("employee_educations");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
                entity.Property(e => e.Grade).HasColumnName("grade");
                entity.Property(e => e.InstitutionName).HasColumnName("institution_name");
                entity.Property(e => e.Majors).HasColumnName("majors");
                entity.Property(e => e.StartYear).HasColumnName("start_year");
                entity.Property(e => e.EndYear).HasColumnName("end_year");
            });


            modelBuilder.Entity<EmployeeFamily>(entity => 
            {
                entity.ToTable("employee_families");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
                entity.Property(e => e.FamilyName).HasColumnName("family_name");
                entity.Property(e => e.Relationship).HasColumnName("relationship");
                entity.Property(e => e.MaritalStatus).HasColumnName("marital_status");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.IsEmergencyContact).HasColumnName("is_emergency_contact");
            });

            modelBuilder.Entity<EmployeeSalary>(entity => 
            {
                entity.ToTable("employee_salaries");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
                entity.Property(e => e.SalaryComponentId).HasColumnName("salary_component_id");
                entity.Property(e => e.Amount).HasColumnName("amount");
            });


            modelBuilder.Entity<Event>(entity => 
            {
                entity.ToTable("events");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EventName).HasColumnName("event_name");
                entity.Property(e => e.Category).HasColumnName("category");
                entity.Property(e => e.StartTime).HasColumnName("start_time");
                entity.Property(e => e.EndTime).HasColumnName("end_time");
                entity.Property(e => e.Note).HasColumnName("note");
            });

            
            modelBuilder.Entity<File>(entity => 
            {
                entity.ToTable("files");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.FileName).HasColumnName("file_name");
                entity.Property(e => e.Type).HasColumnName("type");
                entity.Property(e => e.Size).HasColumnName("size");
                entity.Property(e => e.UploadedDate).HasColumnName("uploaded_date");
                entity.Property(e => e.UploaderId).HasColumnName("uploader_id");
            });


            modelBuilder.Entity<JobTitle>(entity => 
            {
                entity.ToTable("job_titles");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.JobTitleName).HasColumnName("job_title_name");
                entity.Property(e => e.Description).HasColumnName("description");
            });


            modelBuilder.Entity<Leave>(entity => 
            {
                entity.ToTable("leaves");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
                entity.Property(e => e.LeaveTypeId).HasColumnName("leave_type_id");
                entity.Property(e => e.StartDate).HasColumnName("start_date");
                entity.Property(e => e.EndDate).HasColumnName("end_date");
                entity.Property(e => e.Note).HasColumnName("note");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
                entity.Property(e => e.ApprovedDate).HasColumnName("approved_date");
                entity.Property(e => e.IsTaken).HasColumnName("is_taken");
            });


            modelBuilder.Entity<LeaveType>(entity => 
            {
                entity.ToTable("leave_types");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.LeaveTypeName).HasColumnName("leave_type_name");
                entity.Property(e => e.DaysGiven).HasColumnName("days_given");
                entity.Property(e => e.IsDeduction).HasColumnName("is_deduction");
                entity.Property(e => e.Note).HasColumnName("note");
            });

            
            
        }

    }


        

    
     

}