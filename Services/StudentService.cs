using Microsoft.EntityFrameworkCore;
using webproject.Data;
using webproject.DTOs;
using webproject.Models;

namespace webproject.Services
{
    public class StudentService
    {
        private readonly AppDbContext _context;

        public StudentService(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Read (optimized)
        public async Task<List<StudentReadDto>> GetAllAsync()
        {
            return await _context.Students
                .AsNoTracking()
                .Select(s => new StudentReadDto
                {
                    Id = s.Id,
                    Name = s.Name
                })
                .ToListAsync();
        }

        // ➕ Create
        public async Task AddAsync(StudentCreateDto dto)
        {
            var student = new Student
            {
                Name = dto.Name
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();
        }

        // 🔄 Update (FIXED → now returns bool)
        public async Task<bool> UpdateAsync(int id, StudentUpdateDto dto)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return false;

            student.Name = dto.Name;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}