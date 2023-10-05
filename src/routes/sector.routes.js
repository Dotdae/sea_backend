import { Router } from "express";
import {getSectors, getSector, createSector, updateSector,deleteSector } from  "../controllers/sector.controller.js";

const router = Router();

router.get('/sector', getSectors);


// Get specific sector.

router.get('/sector/:id', getSector);

router.post('/sector', createSector);

router.put('/sector', updateSector);

router.delete('/sector/:id', deleteSector);

export default router;
