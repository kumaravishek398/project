using System.ComponentModel.DataAnnotations;

namespace OnlineHomeLoan.Models
{
    public class Admin
    {
        [Key]
        public int AdminID { get; set; }
        public string ? AdminEmailID { get; set; }
        public string? AdminPassword { get; set; }
    }
}
