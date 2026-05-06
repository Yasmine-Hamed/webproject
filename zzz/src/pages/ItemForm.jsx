import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'

function ItemForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      await api.post('/Student', { firstName, lastName, email })
      setMessage('Student added successfully.')
      setFirstName('')
      setLastName('')
      setEmail('')
      navigate('/items')
    } catch (err) {
      setError('Could not add student. Please check the fields and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-content">
      <h2>Add New Student</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter first name"
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter last name"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email address"
          />
        </label>

        <div className="form-actions">
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Student'}
          </button>
        </div>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </section>
  )
}

export default ItemForm
