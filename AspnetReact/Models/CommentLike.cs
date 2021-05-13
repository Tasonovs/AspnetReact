using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetReact.Models
{
	public class CommentLike
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int CommentId { get; set; }
		public Comment Comment { get; set; }

		[Required]
		public Guid UserId { get; set; }

		[Required]
		public bool IsLike { get; set; }
	}
}
