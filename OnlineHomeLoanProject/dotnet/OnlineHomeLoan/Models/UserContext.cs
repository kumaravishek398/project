using Microsoft.EntityFrameworkCore;

namespace OnlineHomeLoan.Models
{
    public class UserContext : DbContext
    {
        public UserContext (DbContextOptions options):base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }

        public DbSet<Admin> AdminLogin { get; set; }
    }
}
