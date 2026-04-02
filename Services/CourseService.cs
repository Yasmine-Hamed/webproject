// filepath: c:\Users\My Lab\webproject\Services\CourseService.cs
#pragma warning disable CS0105
using Microsoft.EntityFrameworkCore;
using webproject.Data;
using webproject.DTOs;
using webproject.Models;
#pragma warning restore CS0105
// ...existing code...

namespace webproject.Services
{
    public class CourseService
    {
        private readonly AppDbContext _context;

        public CourseService(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Read (optimized)
        public async Task<List<CourseReadDto>> GetAllAsync()
        {
            return await _context.Courses
                .AsNoTracking()
                .Select(c => new CourseReadDto
                {
                    Id = c.Id,
                    Title = c.Title
                })
                .ToListAsync();
        }

        // ➕ Create
        public async Task AddAsync(CourseCreateDto dto)
        {
            var course = new Course
            {
                Title = dto.Title
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
        }

        // 🔄 Update
        public async Task<bool> UpdateAsync(int id, CourseUpdateDto dto)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                return false;

            course.Title = dto.Title;

            await _context.SaveChangesAsync();
            return true;
        }

        // ❌ Delete
        public async Task<bool> DeleteAsync(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                return false;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}