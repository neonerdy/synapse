using System;

namespace SynapseAPI.Models
{
    public class LeaveType
    {
        public Guid ID { get; set; }
        public string LeaveTypeName { get; set; }
        public int DaysGiven { get; set; }
        public bool IsDeduction { get; set; }
        public string Note { get; set; }

    }


}