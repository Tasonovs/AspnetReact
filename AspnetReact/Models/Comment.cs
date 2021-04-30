using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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

		//[Required]
		//public int CampaignId { get; set; }
		[ForeignKey("FK_Comment_Campaign_Id")]
		public Campaign Campaign { get; set; }
        [Required]
        public string CreatorId { get; set; }
    }
}
