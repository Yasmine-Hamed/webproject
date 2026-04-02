using System.ComponentModel.DataAnnotations;

namespace webproject.DTOs
{
    public class StudentCreateDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Name { get; set; } = null!;
    }
}