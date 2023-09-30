import { pool } from '../database.js';


// Get data.

export const getEmployees = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM empleados');

    res.json(rows);

};

export const getEmployee = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [req.params.id]);

    if(rows.length <= 0 ) return res.status(404).json({
        message: "Employee not found"
    })

    res.json(rows[0]);

}

// Post data.

export const createEmployee = async (req, res) => {

    const {name, age} = req.body;

    // Insert section.

    const [rows] = await pool.query('INSERT INTO empleados (name, age) VALUES (?, ?)', [name, age]);

    console.log(name, age);
    
    res.send({
        id: rows.insertId,
        name,
        age
    });

};

// Update data.

export const updateEmployee = (req, res) => res.json({
    data: "This is a update sample"
});

// Delete data.

export const deleteEmployee = async (req, res) => {

    const [rows] = await pool.query('DELETE FROM empleados WHERE id = ?', [req.params.id]);

    if(rows.length <= 0 ) return res.status(404).json({
        message: "Employee not found"
    })

    res.json(rows[0]);


}