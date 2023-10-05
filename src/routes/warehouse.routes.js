import { Router } from "express";
import {getWarehouses, getWarehouse, createWarehouse, updateWarehouse,deleteWarehouse } from  "../controllers/warehouse.controller.js";

const router = Router();

router.get('/almacen', getWarehouses);


// Get specific sector.

router.get('/almacen/:id', getWarehouse);

router.post('/almacen', createWarehouse);

router.put('/almacen', updateWarehouse);

router.delete('/almacen/:id', deleteWarehouse);

export default router;
