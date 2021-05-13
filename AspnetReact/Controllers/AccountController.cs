using AspnetReact.Data;
using AspnetReact.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Controllers
{
	public class AccountController : Controller
	{
		private readonly UserManager<ApplicationUser> userManager;
		private readonly SignInManager<ApplicationUser> signInManager;
		private readonly ApplicationDbContext context;

		public AccountController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
		{
			this.context = context;
			this.userManager = userManager;
			this.signInManager = signInManager;

			InitTestData();
		}




		private async void InitTestData()
		{
			if (!context.Users.Any())
			{
				for (int i = 1; i < 10; i++)
				{
					string userEmail = $"User{i}@mail.com";
					await userManager.CreateAsync(new ApplicationUser()
					{
						Email = userEmail,
						UserName = userEmail,
						EmailConfirmed = true,
					}, userEmail);
				}
				context.SaveChanges();
			}
		}

	}
}
