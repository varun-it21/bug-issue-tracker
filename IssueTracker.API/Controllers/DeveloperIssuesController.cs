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

    [HttpGet("dashboard/{username}")]
    public async Task<IActionResult> GetDashboard(string username)
    {
        var totalIssues = await _context.Issues
            .CountAsync(i => i.AssignedTo == username);
        var priorityCounts = await _context.Issues
            .Where(i => i.AssignedTo == username)
            .GroupBy(i => i.Priority)
            .Select(g => new { Priority = g.Key, Count = g.Count() })
            .ToListAsync();
        var statusCounts = await _context.Issues
            .Where(i => i.AssignedTo == username)
            .GroupBy(i => i.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync();

        // High priority issues list
        var highPriorityIssues = await _context.Issues
            .Where(i => i.AssignedTo == username && i.Priority == "HIGH")
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
