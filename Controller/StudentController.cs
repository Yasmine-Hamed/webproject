using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using webproject.DTOs;
using webproject.Services;

namespace webproject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly StudentService _service;

        public StudentController(StudentService service)
        {
            _service = service;
        }

        // ✅ GET: any logged-in user
        [HttpGet]
        public async Task<ActionResult<List<StudentReadDto>>> Get()
        {
            var students = await _service.GetAllAsync();
            return Ok(students);
        }

        // ✅ GET by id: any logged-in user
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var students = await _service.GetAllAsync();
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
                return NotFound();

            return Ok(student);
        }

        // 🔒 POST: Admin only
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(StudentCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _service.AddAsync(dto);
            return Ok("Student created successfully");
        }

        // 🔒 PUT: Admin + Instructor
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Instructor")]
        public async Task<IActionResult> Update(int id, StudentUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.UpdateAsync(id, dto);

            if (!result)
                return NotFound("Student not found");

            return NoContent(); // ✅ better than Ok()
        }
    }
}