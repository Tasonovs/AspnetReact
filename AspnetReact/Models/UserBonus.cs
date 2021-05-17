using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetReact.Models
{
	public class UserBonus
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public DateTime TransferDate { get; set; }

		[Required]
		public Bonus Bonus { get; set; }

		[Required]
		public ApplicationUser User { get; set; }

		[Required]
		public float AmountOfMoney { get; set; }
	}
}
