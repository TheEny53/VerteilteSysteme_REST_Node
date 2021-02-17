const express = require('express');
const logger = require('morgan');
const {insertTodo, getTodoById, getAllTodos, deleteTodoById} = require('./db');

const PORT = 3000;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get all items
app.get('/todos', (req,res) => {
  const todos = getAllTodos();
  return res.json({
    ...todos,
    ...{
      _links: {
        self: {
          href: '/todos'
        },
        create: {
          href: '/todos',
          method: 'POST'
        }
      }
    }
  }).status(200)
})

// Get a single item by ID
app.get('/todos/:id', (req,res) => {
  // Use JavaScript's Object Destructuring to directly access properties of 'req.params'
  const {id} = req.params;
  // Get task by id from DB
  const todo = getTodoById(id);
  // Check if task was successfully retrieved
  if(!todo) return res.json({message: `Todo with ID ${id} not found.`}).status(404);
  // Return task with additional HATEOAS links
  res.json({
    ...todo,
    ...{
      _links: {
        self: {
          href: `/todos/${id}`,
          method: 'GET'
        },
        all: {
          href: '/todos',
          method: 'GET'
        }
      }
    }
  }).status(200);
});

// Create a new Item
app.post('/todos', (req,res) => {
  // Use JavaScript's Object Destructuring to directly access properties of 'req.body'
  const {name, description} = req.body;
  // Check for null values to prevent DB constraint error
  if(!name || !description) return res.json({message: 'Missing required parameters'}).status(400);
  // Insert retrieved data into DB
  insertTodo(name, description);
  // Notify user about successful insertion (HTTP Code 201 'Created') and return created data
  res.json({name, description}).status(201);
})

app.delete('/todos/:id', (req,res) => {
  const result = deleteTodoById(req.params.id);
  res.json(result).status(200);
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

module.exports = app;
