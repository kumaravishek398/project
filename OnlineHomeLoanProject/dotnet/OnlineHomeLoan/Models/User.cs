using System.ComponentModel.DataAnnotations;

namespace OnlineHomeLoan.Models
{
    public class User
    {
        [Key]
        public int UsedID { get; set; }
        public String ? FirstName { get; set; }
        public String ? LastName { get; set; }
        public String ? Email { get; set; }
        public String ? MobileNumber { get; set; }
        public String ? Password { get; set; }

        public DateTime DateRegistered { get; set; }
    }
}
