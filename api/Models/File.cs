using System;

namespace SynapseAPI.Models
{
    public class File
    {
        public Guid ID { get; set; }
        public string FileName { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public DateTime UploadedDate { get; set; }
        public Guid UploaderId { get; set; }

    }

}