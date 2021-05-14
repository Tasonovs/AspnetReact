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
	public class CategoryController : Controller
	{
		ApplicationDbContext db;
		public CategoryController(ApplicationDbContext context)
		{
			db = context;
		}

		[HttpGet] //TODO Get Campaigns with Limit, Offset, SortType
		public IEnumerable<Category> ReadAll()
		{
			return db.Categories.ToList();
		}
	}
}
