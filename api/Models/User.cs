using System;
using System.Collections.Generic;

namespace SynapseAPI.Models
{
    public class User
    {
        public Guid ID { get; set; }
        public Guid EmployeeId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Guid RoleId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

    }


}