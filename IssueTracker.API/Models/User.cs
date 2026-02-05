using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IssueTracker.API.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string user_name { get; set; } = string.Empty;

        [Required]
        [StringLength(150)]
        [EmailAddress]
        public string user_email { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string password { get; set; } = string.Empty;

        [Column("role_id")]
        public int role_id { get; set; }

        [ForeignKey(nameof(role_id))]
        public Role? Role { get; set; }

        public bool is_active { get; set; }

        [Column("created_on")]
        public DateTime created_on { get; set; }
    }
}
