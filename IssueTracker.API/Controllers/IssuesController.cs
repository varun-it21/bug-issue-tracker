using IssueTracker.API.Data;
using IssueTracker.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IssueTracker.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class IssuesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IssuesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetIssues()
        {
            var issues = await _context.issues.ToListAsync();
            return Ok(issues);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIssue(int id, [FromBody] Issue updated)
        {
            var issue = await _context.issues.FindAsync(id);
            if (issue == null)
                return NotFound("Issue not found");

            issue.Title = updated.Title;
            issue.Description = updated.Description;
            issue.Priority = updated.Priority;
            issue.Status = updated.Status;
            issue.AssignedTo = updated.AssignedTo;
            issue.Deadline = updated.Deadline;
            issue.UpdatedAt = DateTime.UtcNow;

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim != null)
                issue.UpdatedBy = int.Parse(userIdClaim.Value);

            await _context.SaveChangesAsync();
            return Ok(issue);
        }

        [Authorize(Roles = "Developer")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateIssueStatus(int id, [FromBody] string status)
        {
            if (string.IsNullOrWhiteSpace(status))
                return BadRequest("Status is required");

            var issue = await _context.issues.FindAsync(id);
            if (issue == null)
                return NotFound("Issue not found");

            issue.Status = status;
            issue.UpdatedAt = DateTime.UtcNow;

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim != null)
                issue.UpdatedBy = int.Parse(userIdClaim.Value);

            await _context.SaveChangesAsync();
            return Ok(issue);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssue(int id)
        {
            var issue = await _context.issues.FindAsync(id);

            if (issue == null)
                return NotFound("Issue not found");
            var comments = _context.IssueComments.Where(c => c.IssueId == id);
            _context.IssueComments.RemoveRange(comments);
            _context.issues.Remove(issue);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Issue deleted successfully" });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateIssue([FromBody] Issue issue)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            issue.CreatedOn = DateTime.UtcNow;
            issue.UpdatedAt = DateTime.UtcNow;

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim != null)
            {
                issue.CreatedBy = int.Parse(userIdClaim.Value);
            }

            _context.issues.Add(issue);
            await _context.SaveChangesAsync();

            return Ok(issue);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetIssueById(int id)
        {
            var issue = await _context.issues.FirstOrDefaultAsync(i => i.IssueId == id);

            if (issue == null)
                return NotFound("Issue not found");

            return Ok(issue);
        }

        [HttpGet("assigned/{userId}")]
        public async Task<IActionResult> GetIssuesByUser(int userId)
        {
            var issues = await _context.issues
                .Where(i => i.AssignedTo == userId)
                .ToListAsync();

            return Ok(issues);
        }

    }
}
