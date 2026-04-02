using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using webproject.DTOs;
using webproject.Services;

namespace webproject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // 🔐 all endpoints require login
    public class CourseController : ControllerBase
    {
        private readonly CourseService _service;

        public CourseController(CourseService service)
        {
            _service = service;
        }

        // ✅ GET → any logged-in user
        [HttpGet]
        public async Task<ActionResult<List<CourseReadDto>>> Get()
        {
            var courses = await _service.GetAllAsync();
            return Ok(courses);
        }

        // ✅ GET by id → any logged-in user
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var courses = await _service.GetAllAsync();
            var course = courses.FirstOrDefault(c => c.Id == id);
            if (course == null)
                return NotFound();

            return Ok(course);
        }

        // 🔒 POST → Admin only
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CourseCreateDto dto)
        {
            await _service.AddAsync(dto);
            return Ok("Course created successfully");
        }

        // 🔒 PUT → Admin only
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, CourseUpdateDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            if (!result) return NotFound("Course not found");

            return NoContent();
        }

        // 🔒 DELETE → Admin only
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            if (!result) return NotFound("Course not found");

            return NoContent();
        }
    }
}