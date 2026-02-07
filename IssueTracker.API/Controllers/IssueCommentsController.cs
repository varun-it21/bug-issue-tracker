    using IssueTracker.API.Data;
    using IssueTracker.API.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System; 
    using System.Linq;
    using System.Threading.Tasks;

    namespace IssueTracker.API.Controllers
    {
        [Route("api/issues")]
        public class IssueCommentsController : ControllerBase
        {
            private readonly AppDbContext _context;
            public IssueCommentsController(AppDbContext context)
            {
                _context = context;
            }

            [HttpGet("{issueId}/comments")]
            public async Task<IActionResult> GetComments(int issueId)
            {
                var comments = await _context.IssueComments
        .Where(c => c.IssueId == issueId)
        .OrderByDescending(c => c.CmtAt)
        .ToListAsync();
                return Ok(comments);
            }

        [HttpPost("comments")]
        public async Task<IActionResult> AddComment([FromBody] IssueComment comment)
        {
            if (comment == null)
                return BadRequest("Invalid payload");

            if (string.IsNullOrWhiteSpace(comment.CommentText))
                return BadRequest("Comment text required");

            comment.CmtAt = DateTime.UtcNow;

            // prevent FK tracking issues
            comment.Issue = null;
            comment.CommentedBy = null;

            _context.IssueComments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }

    }
    }
