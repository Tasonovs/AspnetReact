using AspnetReact.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        DbSet<Campaign> Campaigns { get; set; }
        DbSet<CampaignImage> CampaignImages { get; set; }
        DbSet<CampaignVideo> CampaignVideos { get; set; }
        DbSet<CampaignTag> CampaignTags { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Comment> Comments { get; set; }


        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) 
            : base(options, operationalStoreOptions)
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();

            InitTestData();
        }





        private void InitTestData()
        {
            
        }
    }
}
