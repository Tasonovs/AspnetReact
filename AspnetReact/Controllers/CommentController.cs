using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspnetReact.Data;
using AspnetReact.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using AspnetReact.ViewModels;

namespace AspnetReact.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class CommentController : Controller
	{
		private readonly ApplicationDbContext db;
		public CommentController(ApplicationDbContext context)
		{
			this.db = context;
		}

		[AllowAnonymous]
		[HttpGet("{campaignId}")]
		public IEnumerable<Comment> ReadByCampaignId(int campaignId)
		{
			//TODO Likes count

			List<Comment> comments = db.Comments
				.Include(x => x.Creator)
				.Where(x => x.CampaignId == campaignId).ToList();

			return comments;
		}

		[HttpPost]
		public IActionResult Create([FromBody] Comment comment)
		{
			if (string.IsNullOrEmpty(comment.Body))
				return BadRequest(new JsonResult(new { comment, message = "Comment is empty" }));

			comment.CreatingDate = DateTime.Now;
			comment.Creator = db.Users.FirstOrDefault(x => x.UserName == User.Identity.Name);

			db.Comments.Add(comment);
			db.SaveChanges();

			return new JsonResult(comment) { StatusCode = StatusCodes.Status200OK };
		}
	}
}
