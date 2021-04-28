using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class CampaignMedia
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public int CampaignId { get; set; }
        public Campaign Campaign { get; set; }

        public int DisplayPriority { get; set; }
    }


    public class CampaignImage : CampaignMedia
    {
    }


    public class CampaignVideo : CampaignMedia
    {
    }
}
