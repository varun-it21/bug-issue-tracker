using IssueTracker.API.Data;
using IssueTracker.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IssueTracker.API.Controllers
{
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIssue(int id, [FromBody] Issue issue)
        {
            var existingIssue = await _context.issues.FindAsync(id);

            if (existingIssue == null)
                return NotFound("Issue not found");

            existingIssue.Title = issue.Title;
            existingIssue.Description = issue.Description;
            existingIssue.Priority = issue.Priority;
            existingIssue.Status = issue.Status;
            existingIssue.AssignedTo = issue.AssignedTo;
            existingIssue.Deadline = issue.Deadline;

            existingIssue.UpdatedAt = DateTime.Now;
            existingIssue.UpdatedBy = 1; 

            await _context.SaveChangesAsync();

            return Ok(existingIssue);
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


        [HttpPost]
        public async Task<IActionResult> CreateIssue([FromBody] Issue issue)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            issue.CreatedOn = DateTime.Now;
            issue.UpdatedAt = DateTime.Now;

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
