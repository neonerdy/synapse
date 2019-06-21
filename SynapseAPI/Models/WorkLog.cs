using System;

namespace TaskMaster.Models
{
    public class WorkLog
    {
        public Guid ID { get; set; }
        public Guid TaskId { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public People User { get; set; }
        public int Log { get; set; }
        public string Unit  { get; set; }
        public int LogInMinute { get; set; }
    }

}