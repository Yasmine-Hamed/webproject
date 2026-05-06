function Home() {
  return (
    <section className="page-content">
      <h1>Welcome to Student Management System</h1>
      <p>
        This application allows you to manage students, courses, enrollments, and instructors
        through a modern web interface connected to an ASP.NET Core backend API.
      </p>
      <p>
        Please login to access the student management features.
      </p>
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Features:</strong></p>
        <ul>
          <li>View all students</li>
          <li>Add new students</li>
          <li>Edit student information</li>
          <li>JWT-based authentication</li>
        </ul>
      </div>
    </section>
  )
}

export default Home
