using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetReact.Models
{
    public class Campaign
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime CreatingDate { get; set; }
        [Required]
        public DateTime UpdatingDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Decimal RequiredAmount { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        public string CreatorId { get; set; }
        public virtual ApplicationUser Creator { get; set; }

		public List<Rating> Ratings { get; set; }

		public virtual List<Image> Images { get; set; } = new List<Image>();
        public virtual List<Video> Videos { get; set; } = new List<Video>();
        public virtual List<Tag> Tags { get; set; } = new List<Tag>();
        public virtual List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
