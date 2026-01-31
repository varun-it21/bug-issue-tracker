using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IssueTracker.API.Models
{
    public class IssueComment
    {
        [Key] 
        [Column("cmt_id")]
        public int CmtId { get; set; }
        public int IssueId { get; set; }
        public string CommentText { get; set; }
        public int CmtBy { get; set; }
        public DateTime CmtAt { get; set; }
    }
}
