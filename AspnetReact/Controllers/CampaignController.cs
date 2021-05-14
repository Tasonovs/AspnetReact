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
	public class CampaignController : Controller
	{
		private readonly ApplicationDbContext db;
		public CampaignController(ApplicationDbContext context)
		{
			this.db = context;
		}

		[AllowAnonymous]
		[HttpGet]
		public IEnumerable<Campaign> ReadAll()
		{
			return db.Campaigns
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.Include(x => x.Images)
				.Include(x => x.Videos)
				.Include(x => x.Creator)
				.ToList();
		}

		[AllowAnonymous]
		[HttpGet("{id}")]
		public Campaign Read(int id)
		{
			Campaign foundedItem = db.Campaigns
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.Include(x => x.Images)
				.Include(x => x.Videos)
				.Include(x => x.Creator)
				.FirstOrDefault(x => x.Id == id);

			return foundedItem;
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromForm]CampaignViewModel campaignVM)
		{
			if (!ModelState.IsValid)
				return BadRequest(new JsonResult(new { viewmodel = campaignVM, message = ModelState.Values }));

			var campaign = await campaignVM.ConvertAndSaveToDb(db);

			return new JsonResult(campaign) { StatusCode = StatusCodes.Status200OK };
		}

		[HttpPut] //TODO Read UserId and compare to Campaign.CreatorId
		public async Task<IActionResult> Update([FromForm] CampaignViewModel campaignVM)
		{
			if (!ModelState.IsValid)
				return BadRequest(new JsonResult(new { viewmodel = campaignVM, message = ModelState.Values }));

			var campaign = db.Campaigns
				.Where(p => p.Id == campaignVM.Id)
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.Include(x => x.Images)
				.Include(x => x.Videos)
				.FirstOrDefault();

			campaign = await campaignVM.ConvertAndSaveToDb(db, campaign);

			return new JsonResult(campaign) { StatusCode = StatusCodes.Status200OK };
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			Campaign foundedItem = db.Campaigns.FirstOrDefault(x => x.Id == id);
			if (foundedItem != null)
			{
				db.Campaigns.Remove(foundedItem);
				db.SaveChanges();
				return Ok($"'{foundedItem.Name}' {foundedItem.GetType()} was deleted");
			}
			else
			{
				return NotFound();
			}
		}
	}
}
