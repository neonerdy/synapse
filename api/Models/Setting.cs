using System;
using System.Collections.Generic;

namespace SynapseAPI.Models
{
    public class Setting
    {
        public Guid ID { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Email { get; set;  }
        public string NPWP { get; set; }
        public decimal UMR { get; set; }

    }

}