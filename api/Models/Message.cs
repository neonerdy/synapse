using System;
using System.Collections.Generic;

namespace SynapseAPI.Models
{
    public class Message
    {
        public Guid ID { get; set; }
        public Guid SenderId { get; set; }
        public Guid DestinationId { get; set; }
        public string Subject { get; set; }
        public DateTime SentDate { get; set; }
        public string Body { get; set; }
        public string Tag { get; set; }
        public string Status { get; set; }
    }


}