using Microsoft.AspNetCore.Mvc;
using IssueTracker.API.Data;
using Microsoft.EntityFrameworkCore;
using IssueTracker.API.Models;

namespace IssueTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.users.ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(User user)
        {
            user.is_active = true;
            user.created_on = DateTime.Now;
            _context.users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            ModelState.Remove("password");
            var user = await _context.users
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
                return NotFound($"User not found with id = {id}");
            user.user_name = updatedUser.user_name;
            user.user_email = updatedUser.user_email;
            user.role_id = updatedUser.role_id;
            user.is_active = updatedUser.is_active;
            await _context.SaveChangesAsync();
            return Ok(user);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.users.FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
                return NotFound($"User not found with id = {id}");

            _context.users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("User deleted successfully");
        }

    }
}
