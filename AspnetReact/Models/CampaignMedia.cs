using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class CampaignMedia
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
		//[Required]
		//public int CampaignId { get; set; }
		[ForeignKey("FK_CampaignMedia_Campaign_Id")]
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
