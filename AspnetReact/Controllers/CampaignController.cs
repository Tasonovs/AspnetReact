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
using System.ComponentModel.DataAnnotations;

namespace AspnetReact.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class CampaignController : Controller
	{
		ApplicationDbContext db;
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
				.FirstOrDefault(x => x.Id == id);

			return foundedItem;
		}

		[HttpPost]
		public async Task<JsonResult> Create([FromForm]CampaignViewModel campaignVM, [FromForm]List<IFormFile> images)
		{
			if (!ModelState.IsValid)
				return new JsonResult(campaignVM) { StatusCode = StatusCodes.Status400BadRequest };

			//TODO REFACTOR!!!
			var campaign = new Campaign()
			{
				CreatingDate = campaignVM.CreatingDate,
				Name = campaignVM.Name,
				Description = campaignVM.Description,
				NeededSum = campaignVM.NeededSum,
				CategoryId = campaignVM.CategoryId,
				CreatorId = campaignVM.CreatorId,
			};

			//Adding tags
			for (int i = 0; i < campaignVM.TagNames.Count; i++)
			{
				var foundTag = db.CampaignTags.FirstOrDefault(x => x.Name == campaignVM.TagNames[i]);
				if (foundTag == null) foundTag = db.CampaignTags.Add(new Tag() { Name = campaignVM.TagNames[i] }).Entity;
				campaign.Tags.Add(foundTag);
			}

			//Adding images and videoUrls
			foreach (var videoUrl in campaignVM.VideoUrls)
				campaign.Videos.Add(new Video() { Url = videoUrl });
			foreach (var image in images)
				campaign.Images.Add(new Image() { Url = await UploadController.Upload(image) });


			db.Campaigns.Add(campaign);
			db.SaveChanges();
			return new JsonResult(campaign) { StatusCode = StatusCodes.Status200OK };
		}

		[HttpPut]
		public IActionResult Update(Campaign obj)
		{
			if (!ModelState.IsValid)
				return new JsonResult(obj) { StatusCode = StatusCodes.Status400BadRequest };

			obj.Category = null;
			var selectedTags = new List<Tag>(obj.Tags);

			db.Entry(obj).State = EntityState.Modified;
			db.Entry(obj).Collection(x => x.Tags).Load();
			obj.Tags = selectedTags;
			for (int i = 0; i < obj.Tags.Count; i++)
			{
				var foundTag = db.CampaignTags.FirstOrDefault(x => x.Name == obj.Tags[i].Name);
				if (foundTag == null) foundTag = db.CampaignTags.Add(new Tag() { Name = obj.Tags[i].Name }).Entity;
				obj.Tags[i] = foundTag;
			}

			db.Campaigns.Update(obj);
			db.SaveChanges();
			return new JsonResult(obj) { StatusCode = StatusCodes.Status200OK };
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



	public class CampaignViewModel
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public DateTime CreatingDate { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Description { get; set; }
		[Required]
		public float NeededSum { get; set; }

		[Required]
		public int CategoryId { get; set; }
		[Required]
		public string CreatorId { get; set; }

		public List<string> ImageUrls { get; set; } = new List<string>();
		public List<string> VideoUrls { get; set; } = new List<string>();
		public List<string> TagNames { get; set; } = new List<string>();
	}
}
