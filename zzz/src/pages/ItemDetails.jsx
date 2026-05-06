import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api.js'

function ItemDetails() {
  const { id } = useParams()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await api.get(`/Student/${id}`)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setError('')
      } catch (err) {
        setError('Student not found or failed to load.')
      } finally {
        setLoading(false)
      }
    }
    loadItem()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      await api.put(`/Student/${id}`, { firstName, lastName, email })
      setMessage('Student updated successfully.')
    } catch (err) {
      setError('Failed to update student. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <section className="page-content">
        <p>Loading item...</p>
      </section>
    )
  }

  return (
    <section className="page-content">
      <h2>Edit Student</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <div className="form-actions">
          <button className="button" type="submit" disabled={saving}>
            {saving ? 'Updating...' : 'Update Student'}
          </button>
          <button className="button secondary" type="button" onClick={() => navigate('/items')}>
            Back to List
          </button>
        </div>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </section>
  )
}

export default ItemDetails
