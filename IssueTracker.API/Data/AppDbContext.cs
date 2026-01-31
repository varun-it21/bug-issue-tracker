using IssueTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace IssueTracker.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> users { get; set; }
        public DbSet<Role> roles { get; set; }
        public DbSet<Issue> issues { get; set; }
        public DbSet<IssueComment> IssueComments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.user_name).HasColumnName("user_name");
                entity.Property(e => e.user_email).HasColumnName("user_email");
                entity.Property(e => e.password).HasColumnName("password");
                entity.Property(e => e.role_id).HasColumnName("role_id");
                entity.Property(e => e.is_active).HasColumnName("is_active");
                entity.Property(e => e.created_on).HasColumnName("created_on");
            });

            modelBuilder.Entity<Issue>(entity =>
            {
                entity.ToTable("issues");
                entity.HasKey(e => e.IssueId);
                entity.Property(e => e.IssueId).HasColumnName("issue_id");
                entity.Property(e => e.Title).HasColumnName("title");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Priority).HasColumnName("priority");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.AssignedTo).HasColumnName("assigned_to");
                entity.Property(e => e.CreatedBy).HasColumnName("created_by");
                entity.Property(e => e.CreatedOn).HasColumnName("created_on");
                entity.Property(e => e.Deadline).HasColumnName("deadline");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
                entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");
                entity.HasKey(e => e.role_id);
                entity.Property(e => e.role_id).HasColumnName("role_id");
                entity.Property(e => e.role_name).HasColumnName("role_name");
            });

            modelBuilder.Entity<IssueComment>(entity =>
            {
                entity.ToTable("issue_comments");
                entity.HasKey(e => e.CmtId); 
                entity.Property(e => e.CmtId).HasColumnName("cmt_id");
                entity.Property(e => e.IssueId).HasColumnName("issue_id");
                entity.Property(e => e.CommentText).HasColumnName("comment_text");
                entity.Property(e => e.CmtBy).HasColumnName("cmt_by");
                entity.Property(e => e.CmtAt).HasColumnName("cmt_at");
            });
        }
    }
}
