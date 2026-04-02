using Microsoft.EntityFrameworkCore;
using webproject.Data;
using webproject.DTOs;
using webproject.Models;

namespace webproject.Services
{
    public class InstructorService
    {
        private readonly AppDbContext _context;

        public InstructorService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<InstructorReadDto>> GetAllAsync()
        {
            return await _context.Instructors
                .AsNoTracking()
                .Select(i => new InstructorReadDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    Bio = i.Profile != null ? i.Profile.Bio : string.Empty
                })
                .ToListAsync();
        }

        public async Task AddAsync(InstructorCreateDto dto)
        {
            var instructor = new Instructor
            {
                Name = dto.Name,
                Profile = new InstructorProfile { Bio = dto.Bio }
            };

            _context.Instructors.Add(instructor);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(int id, InstructorUpdateDto dto)
        {
            var instructor = await _context.Instructors
                .Include(i => i.Profile)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (instructor == null)
                return false;

            instructor.Name = dto.Name;
            if (instructor.Profile == null)
                instructor.Profile = new InstructorProfile { Bio = dto.Bio };
            else
                instructor.Profile.Bio = dto.Bio;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null)
                return false;

            _context.Instructors.Remove(instructor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
