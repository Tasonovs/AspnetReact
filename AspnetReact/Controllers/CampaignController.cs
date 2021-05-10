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
				return BadRequest(new { message = ModelState, campaignVM });

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
			foreach (var image in campaignVM.Images)
				campaign.Images.Add(new Image() { Url = await UploadController.Upload(image) });


			db.Campaigns.Add(campaign);
			db.SaveChanges();
			return new JsonResult(campaign) { StatusCode = StatusCodes.Status200OK };
		}

		[HttpPut]
		public async Task<IActionResult> Update([FromForm] CampaignViewModel campaignVM)
		{
			if (!ModelState.IsValid)
				return new JsonResult(campaignVM) { StatusCode = StatusCodes.Status400BadRequest };

			//Adding tags
			List<Tag> requestTags = new List<Tag>();
			foreach (var tagName in campaignVM.TagNames)
			{
				var tagEntity = db.CampaignTags.FirstOrDefault(x => x.Name == tagName);
				if (tagEntity == null)
				{
					tagEntity = db.CampaignTags.Add(new Tag() { Name = tagName }).Entity;
					db.SaveChanges();
				}
				requestTags.Add(tagEntity);
			}

			//Adding images and videoUrls
			List<Image> requestImages = new List<Image>();
			foreach (var image in campaignVM.Images)
			{
				var imageEntity = db.CampaignImages.FirstOrDefault(x => x.Url == image.FileName);
				if (imageEntity == null)
				{
					imageEntity = db.CampaignImages.Add(new Image() { Url = await UploadController.Upload(image) }).Entity;
					db.SaveChanges();
				}
				requestImages.Add(imageEntity);
			}

			var campaign = db.Campaigns
				.Where(p => p.Id == campaignVM.Id)
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.Include(x => x.Images)
				.Include(x => x.Videos)
				.FirstOrDefault();
			db.Entry(campaign).State = EntityState.Modified;

			campaign.Id = campaignVM.Id;
			campaign.CreatingDate = campaignVM.CreatingDate;
			campaign.Name = campaignVM.Name;
			campaign.Description = campaignVM.Description;
			campaign.NeededSum = campaignVM.NeededSum;
			campaign.CategoryId = campaignVM.CategoryId;
			campaign.CreatorId = campaignVM.CreatorId;

			campaign.Tags = requestTags;
			campaign.Images = requestImages;

			db.SaveChanges();
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

		public List<IFormFile> Images { get; set; } = new List<IFormFile>();
		public List<string> VideoUrls { get; set; } = new List<string>();
		public List<string> TagNames { get; set; } = new List<string>();
	}
}
