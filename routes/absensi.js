const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Mendapatkan semua data absensi
router.get('/', (req, res) => {
    db.query('SELECT * FROM siswa', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Menambahkan data absensi
router.post('/', (req, res) => {
    const { nama, kelas, status } = req.body;
    const query = 'INSERT INTO siswa (nama, kelas, status) VALUES (?, ?, ?)';
    
    db.query(query, [nama, kelas, status], (error, results) => {
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json({ id: results.insertId, nama, kelas, status });
    });
});

// Menghapus data absensi berdasarkan ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM siswa WHERE id = ?';
    
    db.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Data absensi siswa berhasil dihapus', id });
    });
});

module.exports = router;
