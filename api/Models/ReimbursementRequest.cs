using System;
using System.Collections.Generic;

namespace SynapseAPI.Models
{
    public class ReimbursementRequest
    {
        public Guid ID { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid ReimbursementId { get; set; }
        public DateTime ReimbursementDate { get; set; }
        public string Note { get; set; }
        public bool IsApproved { get; set; }
        public Guid ApprovalLineId { get; set; }

    }


}