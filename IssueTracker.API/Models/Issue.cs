using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IssueTracker.API.Models
{
    [Table("issues")]
    public class Issue
    {
        [Key]
        [Column("issue_id")]
        public int IssueId { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Priority { get; set; } = "Medium";

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Open";

        [Column("assigned_to")]
        public int AssignedTo { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(AssignedTo))]
        public User? AssignedUser { get; set; }

        [Column("created_by")]
        public int CreatedBy { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(CreatedBy))]
        public User? CreatedByUser { get; set; }

        [Column("created_on")]
        public DateTime CreatedOn { get; set; }

        public DateTime? Deadline { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        [Column("updated_by")]
        public int? UpdatedBy { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(UpdatedBy))]
        public User? UpdatedByUser { get; set; }
    }
}
