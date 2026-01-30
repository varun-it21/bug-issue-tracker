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

        // ✅ 1. GET ALL ISSUES
        [HttpGet]
        public async Task<IActionResult> GetIssues()
        {
            try
            {
                var issues = await _context.issues.ToListAsync();
                return Ok(issues);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        // ✅ 2. UPDATE ISSUE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIssue(int id, Issue newIssue)
        {
            var issue = await _context.issues.FirstOrDefaultAsync(i => i.IssueId == id);

            if (issue == null)
                return NotFound("Issue not found");

            issue.Title = newIssue.Title;
            issue.Description = newIssue.Description;
            issue.Priority = newIssue.Priority;
            issue.Status = newIssue.Status;
            issue.AssignedTo = newIssue.AssignedTo;
            issue.Deadline = newIssue.Deadline;
            issue.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(issue);
        }

        // ✅ 3. DELETE ISSUE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssue(int id)
        {
            var issue = await _context.issues.FirstOrDefaultAsync(i => i.IssueId == id);

            if (issue == null)
                return NotFound("Issue not found");

            _context.issues.Remove(issue);
            await _context.SaveChangesAsync();

            return Ok("Issue deleted successfully");
        }

        // ✅ CREATE ISSUE (POST)
        [HttpPost]
        public async Task<IActionResult> CreateIssue(Issue issue)
        {
            issue.CreatedOn = DateTime.Now;
            issue.UpdatedAt = DateTime.Now;

            _context.issues.Add(issue);
            await _context.SaveChangesAsync();

            return Ok(issue);
        }

        // ✅ GET ISSUE BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIssueById(int id)
        {
            var issue = await _context.issues.FirstOrDefaultAsync(i => i.IssueId == id);

            if (issue == null)
                return NotFound("Issue not found");

            return Ok(issue);
        }

    }
}
