using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetReact.Models
{
    public class Campaign
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime CreatingDate { get; set; }
        [Required]
        public DateTime UpdatingDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public float RequiredAmount { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        //public string CreatorId { get; set; } //?why it starts to add two same FK?
        public ApplicationUser Creator { get; set; }

		public List<Image> Images { get; set; } = new List<Image>();
        public List<Video> Videos { get; set; } = new List<Video>();
        public List<Tag> Tags { get; set; } = new List<Tag>();

        public List<Bonus> Bonuses { get; set; } = new List<Bonus>();
        public List<UserBonus> UserBonuses { get; set; } = new List<UserBonus>(); //Need for count money

        public List<Comment> Comments { get; set; } = new List<Comment>();
		public List<Rating> Ratings { get; set; } = new List<Rating>();

        [NotMapped]
        public bool IsUserHasRatedThis { get; set; }
        [NotMapped]
        public float UserBonusesMoneySum { get; set; }
    }
}
