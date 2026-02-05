using Microsoft.AspNetCore.Mvc;
using IssueTracker.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IssueTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = (from u in _context.users
                        join r in _context.roles on u.role_id equals r.role_id
                        where u.user_email == request.email
                        select new
                        {
                            u.UserId,
                            u.user_name,
                            u.user_email,
                            u.password,
                            u.is_active,
                            role = r.role_name
                        }).FirstOrDefault();

            if (user == null)
                return Unauthorized("Invalid email or password");

            if (!user.is_active)
                return Unauthorized("Your account is inactive. Contact admin.");

            if (user.password != request.password)
                return Unauthorized("Invalid email or password or user in_active");

            var token = GenerateJwtToken(user.UserId, user.user_email, user.role);

            return Ok(new
            {
                token = token,
                user = new
                {
                    user.UserId,
                    user.user_name,
                    user.user_email,
                    user.is_active,
                    role = user.role
                }
            });
        }

        private string GenerateJwtToken(int userId, string email, string role)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
            );

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    int.Parse(_config["Jwt:ExpireMinutes"])
                ),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginRequest
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}
