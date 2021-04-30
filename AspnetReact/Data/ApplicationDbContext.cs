using AspnetReact.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using AspnetReact.Controllers;
using Microsoft.AspNetCore.Owin;
using AspnetReact;
using Microsoft.Extensions.DependencyInjection;

namespace AspnetReact.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<CampaignImage> CampaignImages { get; set; }
        public DbSet<CampaignVideo> CampaignVideos { get; set; }
        public DbSet<CampaignTag> CampaignTags { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }

		//private readonly UserManager<ApplicationUser> userManager;
		//private readonly SignInManager<ApplicationUser> signInManager;
		public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) 
            : base(options, operationalStoreOptions)
		{
			//Database.EnsureDeleted();
			//Database.EnsureCreated();
			InitTestData();
		}




        private void InitTestData()
        {
            //if (!Users.Any())
            //{
            //    for (int i = 1; i < 10; i++)
            //    {
            //        string userEmail = $"User{i}@mail.com";
            //        await userManager.CreateAsync(new ApplicationUser()
            //        {
            //            Email = userEmail,
            //            UserName = userEmail,
            //            EmailConfirmed = true,
            //        }, userEmail);
            //    }
            //    SaveChanges();
            //}
            if (!Categories.Any())
            {
                Categories.Add(new Category() { Name = "Games" });
                Categories.Add(new Category() { Name = "Films" });
                Categories.Add(new Category() { Name = "Music" });
                Categories.Add(new Category() { Name = "Books" });

                SaveChanges();
            }
            if (!CampaignTags.Any())
            {
                CampaignTags.Add(new CampaignTag() { Name = "Shooter" });
                CampaignTags.Add(new CampaignTag() { Name = "RPG" });
                CampaignTags.Add(new CampaignTag() { Name = "Comedy" });
                CampaignTags.Add(new CampaignTag() { Name = "History" });
                CampaignTags.Add(new CampaignTag() { Name = "3D" });
                CampaignTags.Add(new CampaignTag() { Name = "2D" });

                SaveChanges();
            }
            if (!Campaigns.Any())
            {
                var _c1 = new Campaign()
                {
                    Name = "Shooter Campaign",
                    Body = "Lorem ipsum .... description",
                    CreatingDate = DateTime.Now.AddDays(-1.5f),
                    NeededSum = 1500.0f,

                    CreatorId = Users.FirstOrDefault(x => x.Email == "User1@mail.com").Id,
                    Category = Categories.FirstOrDefault(x => x.Name == "Games"),
                    Tags = new List<CampaignTag>()
                    {
                        CampaignTags.FirstOrDefault(x => x.Name == "Shooter"),
                        CampaignTags.FirstOrDefault(x => x.Name == "3D")
                    }
                };
                var _c2 = new Campaign()
                {
                    Name = "RPG Campaign",
                    Body = "Lorem ipsum ... description",
                    CreatingDate = DateTime.Now.AddDays(-0.5f),
                    NeededSum = 2000.0f,

                    CreatorId = Users.FirstOrDefault(x => x.Email == "User1@mail.com").Id,
                    Category = Categories.FirstOrDefault(x => x.Name == "Games"),
                    Tags = new List<CampaignTag>()
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

                SaveChanges();
            }
        }
    }
}
