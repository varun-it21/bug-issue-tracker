using IssueTracker.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/developer")]
[ApiController]
public class DeveloperController : ControllerBase
{
    private readonly AppDbContext _context;

    public DeveloperController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("dashboard/{userId}")]
    public async Task<IActionResult> GetDashboard(int userId)
    {
        var totalIssues = await _context.issues
            .CountAsync(i => i.AssignedTo == userId);
        var priorityCounts = await _context.issues
            .Where(i => i.AssignedTo == userId)
            .GroupBy(i => i.Priority)
            .Select(g => new { Priority = g.Key, Count = g.Count() })
            .ToListAsync();
        var statusCounts = await _context.issues
            .Where(i => i.AssignedTo == userId)
            .GroupBy(i => i.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync();

        // High priority issues list
        var highPriorityIssues = await _context.issues
            .Where(i => i.AssignedTo == userId && i.Priority!.ToUpper() == "HIGH")
            .ToListAsync();

        return Ok(new
        {
            totalIssues,
            priority = priorityCounts,
            status = statusCounts,
            highPriorityIssues
        });
    }
}
