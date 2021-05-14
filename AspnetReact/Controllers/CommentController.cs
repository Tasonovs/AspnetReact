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
				.Where(x => x.CampaignId == campaignId).ToList();

			return comments;
		}

		[HttpPost]
		public IActionResult Create([FromForm] Comment comment)
		{
			if (!ModelState.IsValid)
				return BadRequest(new JsonResult(new { comment, message = ModelState.Values }));

			db.Comments.Add(comment);
			db.SaveChanges();

			return new JsonResult(comment) { StatusCode = StatusCodes.Status200OK };
		}

	}
}
