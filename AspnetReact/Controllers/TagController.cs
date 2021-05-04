using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspnetReact.Data;
using AspnetReact.Models;
using Microsoft.EntityFrameworkCore;

namespace AspnetReact.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TagController : Controller
	{
		ApplicationDbContext db;
		public TagController(ApplicationDbContext context)
		{
			db = context;
		}

		[HttpGet]
		public IEnumerable<Tag> ReadAll()
		{
			return db.CampaignTags.ToList();
		}
	}
}
