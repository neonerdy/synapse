
using System;

namespace Synapse.Models
{
    public class Comment
    {
        public Guid ID { get; set; }
        public Guid BugId { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid CommenterId { get; set; }
        public People Commenter { get; set; }
        public string Message { get; set; }        
    }

}