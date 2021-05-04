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
	[ApiController]
	[Route("api/uploads")]
	public class UploadController : Controller
	{
		[HttpPost]
		public async Task<IActionResult> Upload([FromForm] List<IFormFile> images)
		{
			long size = images.Sum(f => f.Length);
			foreach (var image in images)
				await Upload(image);

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

		[HttpGet("{filename}")]
		public IActionResult DownloadFile([FromRoute]string filename)
		{
			var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", filename);
			if (!System.IO.File.Exists(filePath)) return NotFound();
			
			return PhysicalFile(filePath, "image/"+ Path.GetExtension(filename).Remove(1,1), filename);
		}


	}
}
