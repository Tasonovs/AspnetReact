using Microsoft.AspNetCore.Identity;
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
    }
}
