using System.ComponentModel.DataAnnotations;

namespace webproject.DTOs
{
    public class EnrollmentCreateDto
    {
        [Required(ErrorMessage = "StudentId is required.")]
        public int StudentId { get; set; }

        [Required(ErrorMessage = "CourseId is required.")]
        public int CourseId { get; set; }
    }
}