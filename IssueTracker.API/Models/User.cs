using System.ComponentModel.DataAnnotations;

namespace IssueTracker.API.Models
{
    public class User
    {
        [Key]

        public int UserId { get; set; }

        [Required]
        public string user_name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string user_email { get; set; } = string.Empty;

        [Required]
        public string password { get; set; } = string.Empty;

        public int role_id { get; set; }
        public bool is_active { get; set; }
        public DateTime created_on { get; set; } = DateTime.Now;

    }
}
