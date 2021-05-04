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
        [Required] //TODO Add UpdatingDate
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
        public virtual ApplicationUser Creator { get; set; }

        public virtual List<Image> Images { get; set; } = new List<Image>();
        public virtual List<Video> Videos { get; set; } = new List<Video>();
        public virtual List<Tag> Tags { get; set; } = new List<Tag>();
        public virtual List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
