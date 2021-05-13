using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetReact.Models
{
	public class Announcement
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public DateTime CreatingDate { get; set; }

		[Required]
		public string Name { get; set; }

		public string Description { get; set; }

		[ForeignKey("CampaignId")]
		public Campaign Campaign { get; set; }
	}
}
