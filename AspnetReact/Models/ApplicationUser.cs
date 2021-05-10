using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        public Uri Photo { get; set; }
        [PersonalData]
        public DateTime RegistrationDate { get; set; }
        [PersonalData]
        public DateTime LastActivityDate { get; set; }

		[JsonIgnore]
		public override string PasswordHash { get => base.PasswordHash; set => base.PasswordHash = value; }
		[JsonIgnore]
		public override bool EmailConfirmed { get => base.EmailConfirmed; set => base.EmailConfirmed = value; }
		[JsonIgnore]
		public override bool PhoneNumberConfirmed { get => base.PhoneNumberConfirmed; set => base.PhoneNumberConfirmed = value; }
		[JsonIgnore]
		public override bool TwoFactorEnabled { get => base.TwoFactorEnabled; set => base.TwoFactorEnabled = value; }
		[JsonIgnore]
		public override string ConcurrencyStamp { get => base.ConcurrencyStamp; set => base.ConcurrencyStamp = value; }
		[JsonIgnore]
		public override string SecurityStamp { get => base.SecurityStamp; set => base.SecurityStamp = value; }
		[JsonIgnore]
		public override bool LockoutEnabled { get => base.LockoutEnabled; set => base.LockoutEnabled = value; }
		[JsonIgnore]
		public override DateTimeOffset? LockoutEnd { get => base.LockoutEnd; set => base.LockoutEnd = value; }
		[JsonIgnore]
		public override int AccessFailedCount { get => base.AccessFailedCount; set => base.AccessFailedCount = value; }

	}
}
