using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class Campaign
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime CreatingDate { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public float NeededSum { get; set; }

		[Required]
        public int CategoryId { get; set; }
		public Category Category { get; set; }

        [Required]
        public string CreatorId { get; set; }
        [JsonIgnore]
        public ApplicationUser Creator { get; set; }

        public List<CampaignImage> Images { get; set; }
        public List<CampaignVideo> Videos { get; set; }
        public List<CampaignTag> Tags { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
