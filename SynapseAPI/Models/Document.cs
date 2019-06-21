

using System;

namespace TaskMaster.Models
{
    public class Document
    {
        public Guid ID { get; set; }
        public Guid ProjectId { get; set; }
        public string Title { get; set; }
        public Guid AuthorId { get; set; }
        public People Author { get; set; }
        public string Version { get; set; }
        public string FileName { get; set; }
        public string Type { get; set; }
        public double Size { get; set; }
        public DateTime CreatedDate { get; set; }

    }

}