using System;
using System.Collections.Generic;

namespace SynapseAPI.Models
{
    public class SalaryComponent
    {
        public Guid ID { get; set; }
        public string ComponentName { get; set; }
        public string Type { get; set; }
        public string Occurance { get; set; }
        public decimal Amount { get; set; }

    }


}