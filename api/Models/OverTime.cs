using System;
using System.Collections.Generic;

namespace SynapseAPI.Models
{
    public class OverTime
    {
        public Guid ID { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime OverTimeDate { get; set; }
        public Guid WorkScheduleId { get; set; }
        public string ClockIn { get; set; }
        public string ClockOut { get; set; }
        public int DurationHour { get; set; }
        public int DurationMinute { get; set; }
        public string Note { get; set; }
        public string Status { get; set; }

    }



}