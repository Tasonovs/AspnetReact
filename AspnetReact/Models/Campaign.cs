using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class Campaign
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime CreatingDate { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public float NeededSum { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        [Required]
        public int CreatorId { get; set; }
        public ApplicationUser Creator { get; set; }

        public List<CampaignImage> Images { get; set; }
        public List<CampaignVideo> Videos { get; set; }
        public List<CampaignTag> Tags { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
