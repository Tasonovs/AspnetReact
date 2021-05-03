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

namespace AspnetReact.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class CampaignController : Controller
	{
		ApplicationDbContext db;
		private readonly UserManager<ApplicationUser> userManager;
		public CampaignController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
		{
			this.userManager = userManager;
			this.db = context;
		}

		[AllowAnonymous]
		[HttpGet]
		public IEnumerable<Campaign> ReadAll()
		{
			return db.Campaigns
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.ToList();
		}

		[AllowAnonymous]
		[HttpGet("{id}")]
		public Campaign Read(int id)
		{
			Campaign foundedItem = db.Campaigns
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.FirstOrDefault(x => x.Id == id);
;
			return foundedItem;
		}

		[HttpPost]
		public JsonResult Create(Campaign obj)
		{
			if (!ModelState.IsValid)
				return new JsonResult(obj) { StatusCode = StatusCodes.Status400BadRequest };

			for (int i = 0; i < obj.Tags.Count; i++)
			{
				var foundTag = db.CampaignTags.FirstOrDefault(x => x.Name == obj.Tags[i].Name);
				if (foundTag == null) foundTag = db.CampaignTags.Add(new CampaignTag() { Name = obj.Tags[i].Name }).Entity;
				obj.Tags[i] = foundTag;
				//obj.Tags[i] = db.CampaignTags.FindAndAddIfNotExists(obj.Tags[i], x => x.Name);
			}

			db.Campaigns.Add(obj);
			db.SaveChanges();
			return new JsonResult(obj) { StatusCode = StatusCodes.Status200OK };
		}

		[HttpPut]
		public IActionResult Update(Campaign obj)
		{
			if (ModelState.IsValid)
			{
				db.Campaigns.Update(obj);
				db.SaveChanges();
				return Ok(obj);
			}
			return BadRequest(ModelState);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			Campaign foundedItem = db.Campaigns.FirstOrDefault(x => x.Id == id);
			if (foundedItem != null)
			{
				db.Campaigns.Remove(foundedItem);
				db.SaveChanges();
				return Ok($"'{foundedItem.Name}' {foundedItem.GetType().ToString()} was deleted");
			}
			else
			{
				return NotFound();
			}
		}
	}
}
