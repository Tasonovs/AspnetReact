﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class CampaignTag
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public List<Campaign> Campaigns { get; set; }
    }
}
