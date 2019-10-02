const express = require('express');
const router = express.Router();
const routesController = require('./routesController')

//Routes

router.get('/', routesController.index_GET);
router.get('/login/:id', routesController.login);
router.post('/alta_supervisores', routesController.alta_supervisores_POST);
router.post('/alta_supervisor', routesController.alta_supervisor_POST);
router.post('/borrar_supervisor', routesController.borrar_supervisor_POST);
router.post('/alta_empleados', routesController.alta_empleados_POST);
router.post('/borrar_empleado/:id', routesController.borrar_empleado_POST);
router.post('/captura', routesController.captura_POST);
router.post('/captura2', routesController.captura2_POST);
router.post('/guardar_captura', routesController.guardar_captura_POST);
router.post('/verificar_jefe/:id', routesController.verificar_jefe_POST);
router.post('/alta_empleado_turno', routesController.alta_empleado_turno_POST);
router.post('/alta_empleado_subarea', routesController.alta_empleado_subarea_POST);
router.post('/alta_empleado_verificarEstacion', routesController.alta_empleado_verificarEstacion_POST);
router.post('/alta_empleado_verificacion', routesController.alta_empleado_verificacion_POST);
router.post('/alta_empleado', routesController.alta_empleado_POST);
router.post('/captura_diaria', routesController.captura_diaria_POST);
router.post('/guardar_captura_diaria', routesController.guardar_captura_diaria_POST);
router.post('/captura_motivo_faltas', routesController.captura_motivo_faltas_POST);
router.post('/motivo_falta', routesController.motivo_falta_POST);
router.get('/seleccionar_semana', routesController.seleccionar_semana_GET);
router.get('*', (req, res) => {
  res.send('404 Page not found');
});
module.exports = router;