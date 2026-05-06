import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/Auth/login', { username, password })
      const { token } = response.data

      // Store token in localStorage
      localStorage.setItem('token', token)

      // Redirect to items list
      navigate('/items')
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-content">
      <h2>Login</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </label>

        <div className="form-actions">
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Demo Credentials:</strong></p>
        <p>Username: admin</p>
        <p>Password: password</p>
      </div>
    </section>
  )
}

export default Login