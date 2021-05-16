using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetReact.Models
{
	public class Rating
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int CampaignId { get; set; }
		public Campaign Campaign { get; set; }

		[Required]
		public string UserId { get; set; }

		[Required]
		public int Grade { get; set; }
	}
}
