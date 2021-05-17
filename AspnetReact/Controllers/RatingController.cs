using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/campaign/[controller]")]
	public class RatingController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
