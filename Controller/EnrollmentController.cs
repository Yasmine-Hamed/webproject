using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using webproject.DTOs;
using webproject.Services;

namespace webproject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : ControllerBase
    {
        private readonly EnrollmentService _service;

        public EnrollmentController(EnrollmentService service)
        {
            _service = service;
        }

        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetStudentCourses(int studentId)
        {
            var enrollments = await _service.GetStudentCoursesAsync(studentId);
            return Ok(enrollments);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Instructor")]
        public async Task<IActionResult> EnrollStudent(EnrollmentCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _service.EnrollStudentAsync(dto);
            if (!result) return BadRequest("Enrollment already exists");
            return Ok("Student enrolled");
        }

        [HttpDelete("{studentId}/{courseId}")]
        [Authorize(Roles = "Admin,Instructor")]
        public async Task<IActionResult> RemoveEnrollment(int studentId, int courseId)
        {
            var result = await _service.RemoveEnrollmentAsync(studentId, courseId);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}