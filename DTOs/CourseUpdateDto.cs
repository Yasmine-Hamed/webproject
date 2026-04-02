using System.ComponentModel.DataAnnotations;

namespace webproject.DTOs
{
    public class CourseUpdateDto
    {
        [Required(ErrorMessage = "Course title is required.")]
        [MinLength(3, ErrorMessage = "Title must be at least 3 characters.")]
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string Title { get; set; } = null!;
    }
}