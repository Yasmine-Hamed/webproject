using System.ComponentModel.DataAnnotations;

namespace webproject.DTOs
{
    public class StudentUpdateDto
    {
        [Required]
        [MinLength(3)]
        public string Name { get; set; } = null!;
    }
}