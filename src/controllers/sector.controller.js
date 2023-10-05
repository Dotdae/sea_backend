import { pool } from '../database.js';

// Get data.

export const getSectors = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM sectores');

    res.json(rows);

};

export const getSector = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM sectores WHERE id = ?', [req.params.id]);

    if(rows.length <= 0) return res.status(404).json({
        message: "Sector not found"
    })

    res.json(rows[0]);

}

// Post Data.

export const createSector = async (req, res) => {

    const {description, quota, status} = req.body;

    // Insert section.

    const [rows] = await pool.query('INSERT INTO sector (description, quota, status)  VALUES (?,?,?)', [description, quota, status]);

    console.log(description, quota, status);

    res.send({
        id: rows.insertId,
        description,
        quato,
        satus
    });
    
};

// Update data.

export const updateSector = (req, res) => res.json ({
    data: "This Exito pa"
});

// Delete data.

export const deleteSector = async (req, res) => {
    
    const [rows] = await pool.query('DELETE FROM sector WHERE id = ?', [req.params.id]);

    if(rows.length <= 0 ) return res.status(404).json({
        message: "Employee not found"
    })

    res.json(rows[0]);
}