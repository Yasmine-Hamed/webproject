import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let items = [
  { id: 1, title: 'First item', description: 'This is the first item.' },
  { id: 2, title: 'Second item', description: 'This is the second item.' }
]
let nextId = 3

app.get('/api/items', (req, res) => {
  res.json(items)
})

app.get('/api/items/:id', (req, res) => {
  const item = items.find((entry) => entry.id === Number(req.params.id))
  if (!item) {
    return res.status(404).json({ error: 'Item not found' })
  }
  res.json(item)
})

app.post('/api/items', (req, res) => {
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' })
  }
  const newItem = { id: nextId++, title, description }
  items.push(newItem)
  res.status(201).json(newItem)
})

app.put('/api/items/:id', (req, res) => {
  const item = items.find((entry) => entry.id === Number(req.params.id))
  if (!item) {
    return res.status(404).json({ error: 'Item not found' })
  }
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' })
  }
  item.title = title
  item.description = description
  res.json(item)
})

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = items.findIndex((entry) => entry.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' })
  }
  items.splice(index, 1)
  res.json({ message: 'Item deleted' })
})

const port = 4000
app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}/api`)
})
