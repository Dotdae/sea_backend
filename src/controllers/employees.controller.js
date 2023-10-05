import { pool } from '../database.js';


// Get data.

export const getEmployees = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM empleados');

    res.json(rows);

};

export const getEmployee = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM empleados WHERE id_Empleado = ?', [req.params.id]);

    if(rows.length <= 0 ) return res.status(404).json({
        message: "Employee not found"
    })

    res.json(rows[0]);

}

// Post data.

export const createEmployee = async (req, res) => {

    const {name, lastname, id_Puesto, status} = req.body;

    console.log(req.body)

    // Insert section.

    const [rows] = await pool.query('INSERT INTO empleados (Nombres, Apellido, id_Puesto, Activo) VALUES (?, ?, ?, ?)', [name, lastname, id_Puesto, status]);

    
    res.send({
        id: rows.insertId,
        name,
        lastname,
        id_Puesto,
        status
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