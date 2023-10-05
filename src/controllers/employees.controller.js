import { pool } from '../database.js';
import cryptoRandomString from 'crypto-random-string';
import bcrypt from "bcrypt";

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

    // Get data from client.

    const {name, lastname, id_Puesto, status} = req.body;


    // Generate random access code.

    const randomCode = cryptoRandomString({length: 5});

    // Encrypt access code.

    const accessCode = await bcrypt.hash(randomCode, 10);

    console.log(accessCode.length);

    // Insert section.

    const [rows] = await pool.query('INSERT INTO empleados (Nombres, Apellido, id_Puesto, Activo, codigoAcceso) VALUES (?, ?, ?, ?, ?)', [name, lastname, id_Puesto, status, accessCode]);

    
    res.send({
        id: rows.insertId,
        name,
        lastname,
        id_Puesto,
        status,
        randomCode // Show accessCode
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

async function decryptPassword(password, id){

    const [rows] = await pool.query('SELECT codigoAcceso FROM empleados WHERE id_Empleado = ?', [id]);

    const passwordMatch = await bcrypt.compare(password, rows[0].codigoAcceso);

    if(passwordMatch){
        console.log("Match!")
    }

}