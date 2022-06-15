namespace OnlineHomeLoan.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string ? Employement { get; set; }

        public string ? Organization { get; set; }

        public long MonthlyIncome { get; set; }

        public long LoanAmount { get; set; }

        public int Tenure { get; set; }

        public string ? FirstName { get; set; }

        public string ? LastName { get; set; }
        public string ? Gender { get; set; }

        public string ? DateOfBirth { get; set; }

        public long MobileNumber  { get; set; }

        public long Adhaar { get; set; }

        public string ? Pan { get; set; }

        public string ? Status { get; set; }
    }
}
