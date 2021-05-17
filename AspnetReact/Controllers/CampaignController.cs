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
		[HttpGet("page/{pageNum}")]
		public IActionResult ReadByPageNum(int pageNum)
		{
			int itemsPerPage = 12;
			int campaignsCount = db.Campaigns.Count();
			int maxPageNum = (int)Math.Ceiling((double)(campaignsCount / itemsPerPage));
			if (pageNum < 1) return NotFound();
			if (pageNum > maxPageNum) return NotFound();

			var campaigns = db.Campaigns
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.Include(x => x.Images)
				.Include(x => x.Videos)
				.Include(x => x.Creator)
				.Include(x => x.Ratings)
				.OrderByDescending(x => x.CreatingDate)
				.Skip(itemsPerPage * (pageNum - 1))
				.Take(itemsPerPage)
				.ToList();

			return new JsonResult(new { campaigns, campaignsCount, maxPageNum }) { StatusCode = StatusCodes.Status200OK };
		}

		[AllowAnonymous]
		[HttpGet("{id}")]
		public Campaign Read(int id)
		{
			Campaign campaign = db.Campaigns
				.Where(x => x.Id == id)
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.Include(x => x.Images)
				.Include(x => x.Videos)
				.Include(x => x.Creator)
				.Include(x => x.Comments).ThenInclude(x => x.Creator)
				.Include(x => x.Ratings)
				.FirstOrDefault();

			return campaign;
		}

		[AllowAnonymous]
		[HttpGet("user/{userId}")]
		public List<Campaign> ReadByUserId(string userId)
		{
			return db.Campaigns
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.Include(x => x.Creator)
				.Where(x => x.Creator.Id == userId)
				.ToList();
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromForm]CampaignViewModel campaignVM)
		{
			if (!ModelState.IsValid)
				return BadRequest(new JsonResult(new { viewmodel = campaignVM, message = ModelState.Values }));

			var campaign = await campaignVM.ConvertAndSaveToDb(db);

			return new JsonResult(campaign) { StatusCode = StatusCodes.Status200OK };
		}

		[HttpPut] //TODO Read UserId and compare to Campaign.OwnerId
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
				.First();

			campaign = await campaignVM.ConvertAndSaveToDb(db, campaign);

			return new JsonResult(campaign) { StatusCode = StatusCodes.Status200OK };
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			Campaign campaign = db.Campaigns.FirstOrDefault(x => x.Id == id);
			if (campaign == null) return NotFound();

			db.Campaigns.Remove(campaign);
			db.SaveChanges();
			return new JsonResult(new { message = $"'{campaign.Name}' {campaign.GetType()} was deleted" }) { StatusCode = StatusCodes.Status200OK };
		}
	}
}
