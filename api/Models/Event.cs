using System;

namespace SynapseAPI.Models
{
    public class Event
    {
        public Guid ID { get; set; }
        public string EventName { get; set; }
        public string Category { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Note { get; set; }
        
    }


}