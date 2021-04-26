using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Models
{
    public class Campaign
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime CreatingDate { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int CreatorId { get; set; } //TODO можно ли хранить обект?

        [Required]
        public string Name { get; set; }

        [Required]
        public string Body { get; set; }

        [Required]
        public float NeededSum { get; set; }


        public int Tags { get; set; } //TODO многие ко многим???

        public int Comments { get; set; } //TODO можно ли хранить обект?

        public int Images { get; set; } //TODO можно ли хранить обект?

        public int Videos { get; set; }
    }
}
