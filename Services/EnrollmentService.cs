using Microsoft.EntityFrameworkCore;
using webproject.Data;
using webproject.DTOs;
using webproject.Models;

namespace webproject.Services
{
    public class EnrollmentService
    {
        private readonly AppDbContext _context;

        public EnrollmentService(AppDbContext context)
        {
            _context = context;
        }

        // 🔒 Enroll a student in a course
        public async Task<bool> EnrollStudentAsync(EnrollmentCreateDto dto)
        {
            // Optional: prevent duplicate enrollment
            var exists = await _context.Enrollments
                .AnyAsync(e => e.StudentId == dto.StudentId && e.CourseId == dto.CourseId);

            if (exists)
                return false;

            var enrollment = new Enrollment
            {
                StudentId = dto.StudentId,
                CourseId = dto.CourseId
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return true;
        }

        // 🔒 Remove enrollment
        public async Task<bool> RemoveEnrollmentAsync(int studentId, int courseId)
        {
            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);

            if (enrollment == null)
                return false;

            _context.Enrollments.Remove(enrollment);
            await _context.SaveChangesAsync();

            return true;
        }

        // ✅ Read (AsNoTracking + Select ✔)
        public async Task<List<EnrollmentReadDto>> GetStudentCoursesAsync(int studentId)
        {
            return await _context.Enrollments
                .Where(e => e.StudentId == studentId)
                .AsNoTracking()
                .Select(e => new EnrollmentReadDto
                {
                    StudentId = e.StudentId,
                    StudentName = e.Student.Name,
                    CourseId = e.CourseId,
                    CourseTitle = e.Course.Title
                })
                .ToListAsync();
        }
    }
}