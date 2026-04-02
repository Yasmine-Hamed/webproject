using System.Collections.Generic;

namespace webproject.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!; // Required
        public InstructorProfile Profile { get; set; } = null!; // One-to-one
        public ICollection<Course> Courses { get; set; } = new List<Course>(); // One-to-many
    }
}