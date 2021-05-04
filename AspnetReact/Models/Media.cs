using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class Media
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }

		[ForeignKey("CampaignId")]
		public Campaign Campaign { get; set; }

        public int DisplayPriority { get; set; }
    }


    public class Image : Media
    {
    }


    public class Video : Media
    {
    }
}
