import { pool } from '../database.js';

// Get data.

export const getWarehouses= async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM almacen');

    res.json(rows);

};

export const getWarehouse = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM almacen WHERE id = ?', [req.params.id]);

    if(rows.length <= 0) return res.status(404).json({
        message: "Warehouse not found"
    })

    res.json(rows[0]);

}

// Post Data.

export const createWarehouse= async (req, res) => {

    const {article, request, name, quantity, status} = req.body;

    // Insert section.

    const [rows] = await pool.query('INSERT INTO almacen (description, quota, status)  VALUES (?,?,?)', [article, request, name, quantity, status]);

    console.log(article, request, name, quantity, status);

    res.send({
        id: rows.insertId,
        article,
        request,
        name,
        quantity,
        status
    });
    
};

// Update data.

export const updateWarehouse = (req, res) => res.json ({
    data: "This Exito pa"
});

// Delete data.

export const deleteWarehouse= async (req, res) => {
    
    const [rows] = await pool.query('DELETE FROM almacen WHERE id = ?', [req.params.id]);

    if(rows.length <= 0 ) return res.status(404).json({
        message: "Warehouse not found"
    })

    res.json(rows[0]);
}