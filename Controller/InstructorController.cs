using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webproject.DTOs;
using webproject.Services;

namespace webproject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InstructorController : ControllerBase
    {
        private readonly InstructorService _service;

        public InstructorController(InstructorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<InstructorReadDto>>> Get()
        {
            var instructors = await _service.GetAllAsync();
            return Ok(instructors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var instructors = await _service.GetAllAsync();
            var instructor = instructors.FirstOrDefault(i => i.Id == id);
            if (instructor == null)
                return NotFound();

            return Ok(instructor);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(InstructorCreateDto dto)
        {
            await _service.AddAsync(dto);
            return Ok("Instructor created successfully");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, InstructorUpdateDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            if (!result) return NotFound("Instructor not found");
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            if (!result) return NotFound("Instructor not found");
            return NoContent();
        }
    }
}
