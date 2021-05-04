using AspnetReact.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UploadController : Controller
	{
		[HttpPost]
		public async Task<IActionResult> Upload([FromForm] List<IFormFile> images)
		{
			long size = images.Sum(f => f.Length);
			foreach (var image in images)
			{
				await Upload(image);
				//if (img.Length > 0)
				//{
				//	var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads",
				//		Path.ChangeExtension(Path.GetRandomFileName(), Path.GetExtension(img.FileName)));
				//	using (var stream = System.IO.File.Create(filePath))
				//		await img.CopyToAsync(stream);
				//}
			}

			return Ok(new { count = images.Count, size });
		}

		public static async Task<string> Upload(IFormFile image)
		{
			if (image.Length == 0) return null;

			var newFilename = Path.GetRandomFileName() + Path.GetExtension(image.FileName);
			var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", newFilename);
			using (var stream = System.IO.File.Create(filePath))
				await image.CopyToAsync(stream);
			return newFilename;
		}




	}

	public class UploadViewModel
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public List<string> TagNames { get; set; }
	}
}
