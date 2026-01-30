using Microsoft.AspNetCore.Mvc;
using IssueTracker.API.Data;
using Microsoft.EntityFrameworkCore;

namespace IssueTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = (from u in _context.users
                        join r in _context.roles on u.role_id equals r.role_id
                        where u.user_email == request.email
                              && u.password == request.password
                              && u.is_active == true
                        select new
                        {
                            u.UserId,
                            u.user_name,
                            u.user_email,
                            r.role_name
                        }).FirstOrDefault();

            if (user == null)
                return Unauthorized("Invalid email or password");

            return Ok(user);
        }
    }

    public class LoginRequest
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}
