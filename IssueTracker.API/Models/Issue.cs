//using System.ComponentModel.DataAnnotations;

//namespace IssueTracker.API.Models
//{
//    public class Issue
//    {
//        public int IssueId { get; set; }

//        [Required]

//        public string Title { get; set; } = string.Empty;

//        [Required]

//        public string Description { get; set; } = string.Empty;
//        public string Priority { get; set; } = string.Empty;

//        [Required]

//        public string Status { get; set; } = "Open";

//        public int AssignedTo { get; set; }
//        public int CreatedBy { get; set; }
//        public DateTime CreatedOn { get; set; }
//        public DateTime? Deadline { get; set; }
//        public DateTime? UpdatedAt { get; set; }
//        public int? UpdatedBy { get; set; }

//    }
//}


using System.ComponentModel.DataAnnotations;

namespace IssueTracker.API.Models
{
    public class Issue
    {
        public int IssueId { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string? Priority { get; set; }   // ✅ nullable

        [Required]
        public string Status { get; set; } = "Open";

        public int? AssignedTo { get; set; }     // ✅ nullable
        public int? CreatedBy { get; set; }      // ✅ nullable
        public DateTime? CreatedOn { get; set; } // ✅ nullable
        public DateTime? Deadline { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
    }
}

