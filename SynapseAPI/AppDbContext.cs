
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using Synapse.Models;

namespace Synapse
{
    public class AppDbContext : DbContext
    {

        public DbSet<People> People { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Bug> Bugs { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<History> Histories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            optionBuilder.UseNpgsql("host=localhost;database=synapse;username=postgres;password=postgre");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<People>(entity => 
            {
                entity.ToTable("people");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.UserName).HasColumnName("user_name");
                entity.Property(e => e.Password).HasColumnName("password");
                entity.Property(e => e.FullName).HasColumnName("full_name");
                entity.Property(e => e.Role).HasColumnName("role");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.Email).HasColumnName("email");
             });

            modelBuilder.Entity<Project>(entity => 
            {
                entity.ToTable("projects");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.ProjectName).HasColumnName("project_name");
                entity.Property(e => e.Initial).HasColumnName("initial");
                entity.Property(e => e.ProjectManagerId).HasColumnName("project_manager_id");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Status).HasColumnName("status");
             });

             modelBuilder.Entity<Document>(entity => 
            {
                entity.ToTable("documents");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.ProjectId).HasColumnName("project_id");
                entity.Property(e => e.Title).HasColumnName("title");
                entity.Property(e => e.AuthorId).HasColumnName("author_id");
                entity.Property(e => e.Version).HasColumnName("version");
                entity.Property(e => e.FileName).HasColumnName("file_name");
                entity.Property(e => e.Type).HasColumnName("type");
                entity.Property(e => e.Size).HasColumnName("size");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                
            });

             
            modelBuilder.Entity<Bug>(entity => 
            {
                entity.ToTable("bugs");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.ProjectId).HasColumnName("project_id");
                entity.Property(e => e.Tracker).HasColumnName("tracker");
                entity.Property(e => e.Title).HasColumnName("title");
                entity.Property(e => e.Priority).HasColumnName("priority");
                entity.Property(e => e.ReporterId).HasColumnName("reporter_id");
                entity.Property(e => e.AssigneeId).HasColumnName("assignee_id");
                entity.Property(e => e.TesterId).HasColumnName("tester_id");
                entity.Property(e => e.Platform).HasColumnName("platform");
                entity.Property(e => e.Module).HasColumnName("module");
                entity.Property(e => e.Version).HasColumnName("version");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
                entity.Property(e => e.ClosedDate).HasColumnName("closed_date");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.Description).HasColumnName("description");
            });
            

            modelBuilder.Entity<Attachment>(entity => 
            {
                entity.ToTable("attachments");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.BugId).HasColumnName("bug_id");
                entity.Property(e => e.FileName).HasColumnName("file_name");
                entity.Property(e => e.Type).HasColumnName("type");
                entity.Property(e => e.Size).HasColumnName("size");
            });

            modelBuilder.Entity<Comment>(entity => 
            {
                entity.ToTable("comments");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.BugId).HasColumnName("bug_id");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.CommenterId).HasColumnName("commenter_id");
                entity.Property(e => e.Message).HasColumnName("message");
            });

            modelBuilder.Entity<History>(entity => 
            {
                entity.ToTable("histories");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.BugId).HasColumnName("bug_id");
                entity.Property(e => e.Date).HasColumnName("date");
                entity.Property(e => e.ActivityLog).HasColumnName("activity_log");
            });
            



        }
    }
}