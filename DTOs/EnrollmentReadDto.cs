namespace webproject.DTOs
{
    public class EnrollmentReadDto
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; } = null!;
        public int CourseId { get; set; }
        public string CourseTitle { get; set; } = null!;
    }
}