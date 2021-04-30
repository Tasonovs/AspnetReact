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
	public class CampaignController : Controller
	{
		ApplicationDbContext db;
		public CampaignController(ApplicationDbContext context)
		{
			db = context;
		}

		[HttpGet]
		public IEnumerable<Campaign> ReadAll()
		{
			return db.Campaigns
				.Include(x => x.Category)
				.Include(x => x.Tags)
				.ToList();
		}

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
		public IActionResult Create(Campaign obj)
		{
			if (ModelState.IsValid)
			{
				db.Campaigns.Add(obj);
				db.SaveChanges();
				return Ok(obj);
			}
			return BadRequest(ModelState);
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
