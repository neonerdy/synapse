using System;

namespace SynapseAPI.Models
{
    public class LoanInstallment
    {
        public Guid ID { get; set; }
        public Guid LoanId { get; set; }
        public int Installment { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal AmountPaid { get; set; }

    }


}