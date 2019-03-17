
using System;

namespace Synapse.Models
{
    public class History
    {
        public Guid ID { get; set; }
        public Guid BugId { get; set; }
        public DateTime Date { get; set; }
        public string ActivityLog { get; set; }
        
    }
}

