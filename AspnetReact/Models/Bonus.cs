using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetReact.Models
{
	public class Bonus
	{
		[Key]
		public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Decimal RequiredAmount { get; set; }

        [Required]
        public int CampaignId { get; set; }
        public Campaign Campaign { get; set; }

		public virtual List<ApplicationUser> UsersWhoWillReceive { get; set; }
	}
}
