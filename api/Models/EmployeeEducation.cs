using System;
using System.Collections.Generic;

namespace SynapseAPI.Models
{
    public class EmployeeEducation
    {
        public Guid ID { get; set; }
        public Guid EmployeeId { get; set; }
        public string Grade { get; set; }
        public string InstitutionName { get; set; }
        public string Majors { get; set; }
        public string StartYear { get; set; }
        public string EndYear { get; set; }

    }



}