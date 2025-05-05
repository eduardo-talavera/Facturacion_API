import express from 'express';
import { crearFactura, obtenerPDF, listarFacturas } from '../controllers/factura.controller';
import { verificarToken } from '../middleware/auth';
import { permitirRoles } from '../middleware/roles';

const router = express.Router();

// Aplica a todas las rutas
router.use(verificarToken);

// Solo el admin puede crear facturas
router.post('/', permitirRoles('admin'), crearFactura);

router.get('/', listarFacturas);
router.get('/:uuid/pdf', obtenerPDF);

export default router;
