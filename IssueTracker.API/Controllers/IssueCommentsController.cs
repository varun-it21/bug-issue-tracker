using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using IssueTracker.API.Models;
using IssueTracker.API.Data;

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
            return Ok(await _context.IssueComments
                .Where(c => c.IssueId == issueId)
                .OrderByDescending(c => c.CmtAt)
                .ToListAsync());
        }

        [HttpPost("comments")]
        public async Task<IActionResult> AddComment([FromBody] IssueComment comment)
        {
            comment.CmtAt = DateTime.Now;
            _context.IssueComments.Add(comment);
            await _context.SaveChangesAsync();
            return Ok(comment);
        }

    }
}
