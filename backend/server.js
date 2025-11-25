require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fullstack_crud_apps';
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ========== SCHEMAS ==========

// 1. Todo Schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// 2. Student Schema
const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  course: String,
  year: Number,
  createdAt: { type: Date, default: Date.now }
});

// 3. Employee Schema
const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  department: String,
  position: String,
  salary: Number,
  joinDate: Date,
  createdAt: { type: Date, default: Date.now }
});

// 4. Library Schema
const librarySchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: String,
  isbn: String,
  category: String,
  copies: { type: Number, default: 1 },
  available: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

// 5. Inventory Schema
const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: String,
  quantity: { type: Number, default: 0 },
  price: Number,
  supplier: String,
  createdAt: { type: Date, default: Date.now }
});

// 6. E-commerce Product Schema
const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

// 7. Expense Schema
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: String,
  date: { type: Date, default: Date.now },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

// 8. Attendance Schema
const attendanceSchema = new mongoose.Schema({
  studentRoll: { type: String, required: true },
  studentName: String,
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true },
  subject: String,
  createdAt: { type: Date, default: Date.now }
});

// 9. Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

// Models
const Todo = mongoose.model('Todo', todoSchema);
const Student = mongoose.model('Student', studentSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Library = mongoose.model('Library', librarySchema);
const Inventory = mongoose.model('Inventory', inventorySchema);
const Product = mongoose.model('Product', productSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

// ========== GENERIC CRUD FUNCTIONS ==========

const createCRUD = (Model) => ({
  // Create
  create: async (req, res) => {
    try {
      const item = new Model(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ error: 'Item already exists' });
      } else {
        res.status(400).json({ error: err.message });
      }
    }
  },

  // Read all
  getAll: async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Read one
  getOne: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update
  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete
  delete: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

// ========== ROUTES ==========

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Full-Stack CRUD Applications API',
    endpoints: {
      todos: '/api/todos',
      students: '/api/students',
      employees: '/api/employees',
      library: '/api/library',
      inventory: '/api/inventory',
      products: '/api/products',
      expenses: '/api/expenses',
      attendance: '/api/attendance',
      feedback: '/api/feedback'
    }
  });
});

// 1. TODO ROUTES
const todoCRUD = createCRUD(Todo);
app.post('/api/todos', todoCRUD.create);
app.get('/api/todos', todoCRUD.getAll);
app.get('/api/todos/:id', todoCRUD.getOne);
app.put('/api/todos/:id', todoCRUD.update);
app.delete('/api/todos/:id', todoCRUD.delete);

// 2. STUDENT ROUTES
const studentCRUD = createCRUD(Student);
app.post('/api/students', studentCRUD.create);
app.get('/api/students', studentCRUD.getAll);
app.get('/api/students/:id', studentCRUD.getOne);
app.put('/api/students/:id', studentCRUD.update);
app.delete('/api/students/:id', studentCRUD.delete);

// 3. EMPLOYEE ROUTES
const employeeCRUD = createCRUD(Employee);
app.post('/api/employees', employeeCRUD.create);
app.get('/api/employees', employeeCRUD.getAll);
app.get('/api/employees/:id', employeeCRUD.getOne);
app.put('/api/employees/:id', employeeCRUD.update);
app.delete('/api/employees/:id', employeeCRUD.delete);

// 4. LIBRARY ROUTES
const libraryCRUD = createCRUD(Library);
app.post('/api/library', libraryCRUD.create);
app.get('/api/library', libraryCRUD.getAll);
app.get('/api/library/:id', libraryCRUD.getOne);
app.put('/api/library/:id', libraryCRUD.update);
app.delete('/api/library/:id', libraryCRUD.delete);

// 5. INVENTORY ROUTES
const inventoryCRUD = createCRUD(Inventory);
app.post('/api/inventory', inventoryCRUD.create);
app.get('/api/inventory', inventoryCRUD.getAll);
app.get('/api/inventory/:id', inventoryCRUD.getOne);
app.put('/api/inventory/:id', inventoryCRUD.update);
app.delete('/api/inventory/:id', inventoryCRUD.delete);

// 6. PRODUCT ROUTES (E-commerce)
const productCRUD = createCRUD(Product);
app.post('/api/products', productCRUD.create);
app.get('/api/products', productCRUD.getAll);
app.get('/api/products/:id', productCRUD.getOne);
app.put('/api/products/:id', productCRUD.update);
app.delete('/api/products/:id', productCRUD.delete);

// 7. EXPENSE ROUTES
const expenseCRUD = createCRUD(Expense);
app.post('/api/expenses', expenseCRUD.create);
app.get('/api/expenses', expenseCRUD.getAll);
app.get('/api/expenses/:id', expenseCRUD.getOne);
app.put('/api/expenses/:id', expenseCRUD.update);
app.delete('/api/expenses/:id', expenseCRUD.delete);

// 8. ATTENDANCE ROUTES
const attendanceCRUD = createCRUD(Attendance);
app.post('/api/attendance', attendanceCRUD.create);
app.get('/api/attendance', attendanceCRUD.getAll);
app.get('/api/attendance/:id', attendanceCRUD.getOne);
app.put('/api/attendance/:id', attendanceCRUD.update);
app.delete('/api/attendance/:id', attendanceCRUD.delete);

// 9. FEEDBACK ROUTES
const feedbackCRUD = createCRUD(Feedback);
app.post('/api/feedback', feedbackCRUD.create);
app.get('/api/feedback', feedbackCRUD.getAll);
app.get('/api/feedback/:id', feedbackCRUD.getOne);
app.put('/api/feedback/:id', feedbackCRUD.update);
app.delete('/api/feedback/:id', feedbackCRUD.delete);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
