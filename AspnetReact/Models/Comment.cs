using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class Comment
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime CreatingDate { get; set; }
        [Required]
        public string Body { get; set; }

        [Required]
        public int CampaignId { get; set; }
        public Campaign Campaign { get; set; }
        [Required]
        public int CreatorId { get; set; }
        public ApplicationUser Creator { get; set; }
    }
}
