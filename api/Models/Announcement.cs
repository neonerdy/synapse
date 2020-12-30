using System;

namespace SynapseAPI.Models
{
    public class Announcement
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Message { get; set; }
    }


}