using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspnetReact.Data;
using AspnetReact.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using AspnetReact.Controllers;

namespace AspnetReact.ViewModels
{
	public class CampaignViewModel
	{
		public int? Id { get; set; }
		[Required]
		public DateTime CreatingDate { get; set; }
		[Required]
		public DateTime UpdatingDate { get; set; }
		[Required]
		public DateTime EndDate { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Description { get; set; }
		[Required]
		public float RequiredAmount { get; set; }

		[Required]
		public int CategoryId { get; set; }
		[Required]
		public string CreatorId { get; set; }

		public List<IFormFile> ImageFiles { get; set; } = new List<IFormFile>();
		public List<Image> Images { get; set; } = new List<Image>();

		public List<string> VideoUrls { get; set; } = new List<string>();
		public List<Video> Videos { get; set; } = new List<Video>();

		public List<string> TagNames { get; set; } = new List<string>();
		public List<Tag> Tags { get; set; } = new List<Tag>();


		//TODO Refactor and optimize it
		public async Task<Campaign> ConvertAndSaveToDb(ApplicationDbContext db, Campaign campaign = null)
		{
			this.Tags = FindTagsAndAddIfNotExists(db);
			this.Images = await FindImagesAndAddIfNotExistsAsync(db);
			this.Videos = FindVideosAndAddIfNotExists(db);

			if (campaign == null)
			{
				campaign = new Campaign();
				db.Entry(campaign).State = EntityState.Added;
				campaign.CreatingDate = DateTime.Now;
			}
			else
			{
				db.Entry(campaign).State = EntityState.Modified;
				campaign.Id = (int)this.Id;
			}

			campaign.UpdatingDate = DateTime.Now;
			campaign.EndDate = this.EndDate;
			campaign.Name = this.Name;
			campaign.Description = this.Description;
			campaign.RequiredAmount = this.RequiredAmount;
			campaign.Category = db.Categories.First(x => x.Id == this.CategoryId);
			campaign.Creator = db.Users.First(x => x.Id == this.CreatorId);
			campaign.Tags = this.Tags;
			campaign.Images = this.Images;
			campaign.Videos = this.Videos;

			db.SaveChanges();

			return campaign;
		}

		private List<Tag> FindTagsAndAddIfNotExists(ApplicationDbContext db)
		{
			var collection = new List<Tag>();
			foreach (var tagName in this.TagNames)
			{
				var tagNameLowercase = tagName.ToLower();
				var tagEntity = db.CampaignTags.FirstOrDefault(x => x.Name == tagNameLowercase);
				if (tagEntity == null)
				{
					tagEntity = db.CampaignTags.Add(new Tag() { Name = tagNameLowercase }).Entity;
					db.SaveChanges();
				}
				collection.Add(tagEntity);
			}
			return collection;
		}

		private async Task<List<Image>> FindImagesAndAddIfNotExistsAsync(ApplicationDbContext db)
		{
			var collection = new List<Image>();
			foreach (var image in this.ImageFiles)
			{
				var imageEntity = db.CampaignImages.FirstOrDefault(x => x.Url == image.FileName);
				if (imageEntity == null)
				{
					imageEntity = db.CampaignImages.Add(new Image() { Url = await UploadController.Upload(image) }).Entity;
					db.SaveChanges();
				}
				collection.Add(imageEntity);
			}
			return collection;
		}

		private List<Video> FindVideosAndAddIfNotExists(ApplicationDbContext db)
		{
			var collection = new List<Video>();
			foreach (var videoUrl in this.VideoUrls)
			{
				var videoEntity = db.CampaignVideos.FirstOrDefault(x => x.Url == videoUrl);
				if (videoEntity == null)
				{
					videoEntity = db.CampaignVideos.Add(new Video() { Url = videoUrl }).Entity;
					db.SaveChanges();
				}
				collection.Add(videoEntity);
			}
			return collection;
		}
	}
}
