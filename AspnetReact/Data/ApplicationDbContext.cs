using AspnetReact.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AspnetReact.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Image> CampaignImages { get; set; }
        public DbSet<Video> CampaignVideos { get; set; }
        public DbSet<Tag> CampaignTags { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<CampaignReward> Bonuses { get; set; }
        public DbSet<Comment> Comments { get; set; }

		public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) 
            : base(options, operationalStoreOptions)
		{
			Database.EnsureCreated();
			InitTestData();
		}




		private void InitTestData()
		{
			if (!Users.Any()) return;
			if (!Categories.Any())
			{
				Categories.Add(new Category() { Name = "Games" });
				Categories.Add(new Category() { Name = "Films" });
				Categories.Add(new Category() { Name = "Music" });
				Categories.Add(new Category() { Name = "Books" });
				Categories.Add(new Category() { Name = "Arts" });
				Categories.Add(new Category() { Name = "Devices" });

				SaveChanges();
			}
			if (!CampaignTags.Any())
			{
				CampaignTags.Add(new Tag() { Name = "shooter" });
				CampaignTags.Add(new Tag() { Name = "rpg" });
				CampaignTags.Add(new Tag() { Name = "comedy" });
				CampaignTags.Add(new Tag() { Name = "history" });
				CampaignTags.Add(new Tag() { Name = "3d" });
				CampaignTags.Add(new Tag() { Name = "2d" });

				SaveChanges();
			}
			if (!Campaigns.Any())
			{
				var _c1 = new Campaign()
				{
					Name = "Shooter Campaign",
					Description = "Lorem ipsum .... description",
					CreatingDate = DateTime.Now.AddDays(-1.5f),
					RequiredAmount = 1500.0M,

					Creator = Users.FirstOrDefault(x => x.Email == "User1@mail.com"),
					Category = Categories.FirstOrDefault(x => x.Name == "Games"),
					Tags = new List<Tag>()
					{
						CampaignTags.FirstOrDefault(x => x.Name == "Shooter"),
						CampaignTags.FirstOrDefault(x => x.Name == "3D")
					}
				};
				var _c2 = new Campaign()
				{
					Name = "RPG Campaign",
					Description = "Lorem ipsum ... description",
					CreatingDate = DateTime.Now.AddDays(-0.5f),
					RequiredAmount = 2000.0M,

					Creator = Users.FirstOrDefault(x => x.Email == "User1@mail.com"),
					Category = Categories.FirstOrDefault(x => x.Name == "Games"),
					Tags = new List<Tag>()
					{
						CampaignTags.FirstOrDefault(x => x.Name == "RPG"),
						CampaignTags.FirstOrDefault(x => x.Name == "2D")
					}
				};

				Campaigns.Add(_c1);
				Campaigns.Add(_c2);

				SaveChanges();
			}
			if (!Comments.Any())
			{
				Comments.Add(new Comment()
				{
					Campaign = Campaigns.FirstOrDefault(x => x.Name == "Shooter Campaign"),
					CreatorId = Users.FirstOrDefault(x => x.Email == "User1@mail.com").Id,
					CreatingDate = DateTime.Now,
					Body = "It's amazing. My comment)))"
				});
				Comments.Add(new Comment()
				{
					Campaign = Campaigns.FirstOrDefault(x => x.Name == "Shooter Campaign"),
					CreatorId = Users.FirstOrDefault(x => x.Email == "User1@mail.com").Id,
					CreatingDate = DateTime.Now,
					Body = "My second comment!!!"
				});

				SaveChanges();
			}
		}

	}
}
