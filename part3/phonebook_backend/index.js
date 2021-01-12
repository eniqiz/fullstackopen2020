const express = require('express')
const app = express()

app.use(express.json())

let persons = [{
  "name": "Arto Hellas",
  "number": "040-123456",
  "id": 1
},
{
  "name": "Ada Lovelace",
  "number": "39-44-5323523",
  "id": 2
},
{
  "name": "Dan Abramov",
  "number": "12-43-234345",
  "id": 3
},
{
  "name": "Mary Poppendieck",
  "number": "39-23-6423122",
  "id": 4
}]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  let content = `<p>Phonebook has info for ${persons.length} people</p>` + Date().toString()
  res.send(content)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'info missing'
    })
  } else if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(500))
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})