using System;

namespace SynapseAPI.Models
{
    public class Attendance
    {
        public Guid ID { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public Guid WorkScheduleId { get; set; }
        public WorkSchedule WorkSchedule { get; set; }
        public DateTime AttendanceDate { get; set; }
        public string ClockIn { get; set; }
        public string ClockOut { get; set; }
        public string Status { get; set; }
        public string LateDuration { get; set; }
        public string Note { get; set; }
       
    }
}
