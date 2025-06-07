// routes/packageRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../dbconfig');

// GET all packages
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM packages');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET package by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM packages WHERE id = ?', [id]);
    console.log('id :', id);
    // console.log('rows :', [rows]);

    rows.length ? res.json(rows[0]) : res.status(404).json({ message: 'Package not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a new package
router.post('/', async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO packages (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, image, category]
    );
    res.status(201).json({ id: result.insertId, message: 'Package created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update package
router.put('/:id', async (req, res) => {
  const { name, description, price, image, category } = req.body;
  const id = req.params.id;
  try {
    const [result] = await pool.query(
      'UPDATE packages SET name = ?, description = ?, price = ?, image = ?, category = ? WHERE id = ?',
      [name, description, price, image, category, id]
    );
    result.affectedRows
      ? res.json({ message: 'Package updated' })
      : res.status(404).json({ message: 'Package not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE package
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM packages WHERE id = ?', [id]);
    result.affectedRows
      ? res.json({ message: 'Package deleted' })
      : res.status(404).json({ message: 'Package not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
