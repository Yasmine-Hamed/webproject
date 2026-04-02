// filepath: c:\Users\My Lab\webproject\Models\Student.cs
using System.Collections.Generic;

namespace webproject.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;  // Fix
        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();  // Fix
    }
}