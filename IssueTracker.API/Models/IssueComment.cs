using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IssueTracker.API.Models
{
    [Table("issue_comments")]
    public class IssueComment
    {
        [Key]
        [Column("cmt_id")]
        public int CmtId { get; set; }

        [Column("issue_id")]
        public int IssueId { get; set; }

        [ForeignKey(nameof(IssueId))]
        public Issue? Issue { get; set; }

        [Required]
        [Column("comment_text")]
        public string CommentText { get; set; } = string.Empty;

        [Column("cmt_by")]
        public int CmtBy { get; set; }

        [ForeignKey(nameof(CmtBy))]
        public User? CommentedBy { get; set; }

        [Column("cmt_at")]
        public DateTime CmtAt { get; set; }
    }
}
