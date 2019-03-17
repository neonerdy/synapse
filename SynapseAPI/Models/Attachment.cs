
using System;

namespace Synapse.Models
{
    public class  Attachment
    {
        public Guid ID { get; set; }
        public Guid BugId { get; set; }
        public string FileName { get; set; }
        public string Type { get; set; }
        public double Size { get; set; }
        
    }
}