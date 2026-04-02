using System.Collections.Generic;

namespace webproject.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public ICollection<Enrollment> Enrollments { get; set; } = null!;
    }
}