using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineHomeLoan.Models;

namespace OnlineHomeLoan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;

        public readonly UserContext _context;
        public UserController(IConfiguration config,UserContext context)
        {
            _config= config; 
            _context= context;  
        }
        
        [AllowAnonymous]
        [HttpPost("CreateUser")]
        public IActionResult Create(User user)
        {
            if(_context.Users.Where(u=>u.Email==user.Email).FirstOrDefault()!=null)
            {
                return Ok("Already Exist");
            }
            user.DateRegistered = DateTime.Now;
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("Success");
        }

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public IActionResult Login(Login user)
        {
            var userAvailable=_context.Users.Where(u => u.Email==user.Email && u.Password==user.Password).FirstOrDefault();
            if(userAvailable!=null)
            {
                return Ok(new JWTService(_config).GenerateToken(
                    userAvailable.UsedID.ToString(),
                    userAvailable.FirstName,
                    userAvailable.LastName,
                    userAvailable.Email,
                    userAvailable.MobileNumber
                    ));
            }
            return Ok("Failure");
        }

        [AllowAnonymous]
        [HttpPost("AdminLogin")]
        public IActionResult AdminLogin(AdminForm admin)
        {
            var adminAvailable=_context.AdminLogin.Where(a=>a.AdminEmailID==admin.AdminEmailID && a.AdminPassword==admin.AdminPassword).FirstOrDefault();
           if(adminAvailable!=null)
            {
                return Ok(new JWTService(_config).GenerateAdminToken(
                    adminAvailable.AdminID.ToString(),
                    adminAvailable.AdminEmailID
                    ));
            }
            return Ok("Failure");
        }

        [HttpPost("CustomerApplication")]
        public IActionResult customerApplication(Customer cust)
        {
            if (_context.Customers.Where(c => c.Adhaar == cust.Adhaar).FirstOrDefault() != null)
            {
                return Ok("Already Exist");
            }
            _context.Customers.Add(cust);
            _context.SaveChanges();
            return Ok("Success");
        }
    }
}
