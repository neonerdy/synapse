using System;

namespace SynapseAPI.Models
{
    public class Loan
    {
        public Guid ID { get; set; }
        public Guid EmployeeId { get; set; }
        public decimal Amount { get; set; }
        public int Installment { get; set; }
        public int InterestPct { get; set; }
        public DateTime TotalAmount { get; set; }
        public DateTime EffectiveDate { get; set; }


    }


}