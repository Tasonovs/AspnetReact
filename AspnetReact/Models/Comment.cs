using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetReact.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime CreatingDate { get; set; }
        [Required]
        public string Body { get; set; }

		[Required]
        public int CampaignId { get; set; }
        public Campaign Campaign { get; set; }
        [Required]
        public string CreatorId { get; set; }

        public List<CommentLike> Likes { get; set; } = new List<CommentLike>();
    }
}
