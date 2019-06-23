
using System;

namespace TaskMaster.Models
{
    public class History
    {
        public Guid ID { get; set; }
        public Guid TaskId { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public string ActivityLog { get; set; }
        
    }
}

