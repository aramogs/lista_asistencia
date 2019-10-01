const funcionE = {};
const dbE = require('../db/connEmpleados');




funcionE.empleadosNombre = (gafete, callback) => {
    dbE.query(`SELECT emp_nombre FROM del_empleados WHERE emp_id=${gafete}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result[0].emp_nombre);
        }
    })

}

funcionE.empleadosTodos = (callback) => {

    dbE.query(`SELECT * FROM del_empleados WHERE emp_activo = 1 ORDER BY emp_id ASC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcionE.empleadosDiferenteDeOrigininador = (emp_id, callback) => {

    dbE.query(`SELECT * FROM del_empleados WHERE emp_activo = 1 AND emp_id !=${emp_id} ORDER BY emp_id ASC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcionE.empleadosAccessAll = (acc_asistencia, sign, callback) => {

    dbE.query(`SELECT acc_id FROM del_accesos WHERE acc_asistencia ${sign}${acc_asistencia}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcionE.empleadosInsertAcceso = (acc_id, callback) => {

    dbE.query(`
    INSERT INTO del_accesos (acc_id, acc_asistencia)
    VALUES('${acc_id}',1)
    ON DUPLICATE KEY UPDATE 
    acc_asistencia = VALUES(acc_asistencia)`,
        function (err, result, fields) {
            if (err) {

                callback(err, null);

            } else {

                callback(null, result);
            }
        })
}


funcionE.supervisorBorrarAcceso = (acc_id, callback) => {

    dbE.query(`UPDATE del_accesos SET acc_asistencia = 0 WHERE acc_id = ${acc_id}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcionE.empleadosPorJefe = (acc_id, callback) => {
    dbE.query(`SELECT * FROM del_empleados WHERE emp_id_jefe = ${acc_id}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}
funcionE.empleadosJefe = (emp_id, callback) => {
    dbE.query(`SELECT emp_id_jefe FROM del_empleados WHERE emp_id = ${emp_id}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcionE.empleadosUpdateSubordinado = (emp_id,emp_id_jefe,callback)=>{
    dbE.query(`UPDATE del_empleados SET emp_id_jefe = ${emp_id_jefe} WHERE emp_id_jefe = 0 AND emp_id = ${emp_id} `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcionE.empleadosBorrarJefe = (emp_id,callback)=>{
    dbE.query(`UPDATE del_empleados SET emp_id_jefe = 0 WHERE emp_id = ${emp_id} `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcionE.empleadosBorrarAreaEmpleado = (emp_id,callback)=>{
    dbE.query(`DELETE FROM del_emparea WHERE  id_emp = ${emp_id}`, function(err,result,fields){
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcionE.empleadosInsertArea = (id_emp, emp_id_jefe,id_area,id_subarea,id_estacion, callback) => {

    dbE.query(`
    INSERT INTO del_emparea (id_emp, emp_id_jefe, id_area, id_subarea, id_estacion)
    VALUES(${id_emp}, ${emp_id_jefe}, ${id_area},${id_subarea},${id_estacion}) 
    ON DUPLICATE KEY UPDATE 
        emp_id_jefe = ${emp_id_jefe},
        id_area = ${id_area},
        id_subarea = ${id_subarea},
        id_estacion = ${id_estacion}
    `,
        function (err, result, fields) {
            if (err) {

                callback(err, null);

            } else {

                callback(null, result);
            }
        })
}

funcionE.SearchempleadoArea = (emp_id, callback) => {
    dbE.query(`SELECT * FROM del_emparea WHERE id_emp = ${emp_id}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcionE.empleadosInsertHistorial = (his_movimiento,emp_id_jefe, emp_id, id_turno,id_area,id_subarea,id_estacion, callback) => {

    dbE.query(`
    INSERT INTO del_historial_movimientos (his_movimiento, emp_id_jefe, emp_id, id_turno, id_area, id_subarea, id_estacion,fecha_captura)
    VALUES('${his_movimiento}', ${emp_id_jefe}, ${emp_id}, ${id_turno}, ${id_area},${id_subarea},${id_estacion},NOW()) 
    `,
        function (err, result, fields) {
            if (err) {

                callback(err, null);

            } else {

                callback(null, result);
            }
        })
}


funcionE.empleadosSearchArea = (id_emp, callback) => {

    dbE.query(`
    SELECT * FROM del_emparea WHERE emp_id_jefe = ${id_emp} 
    `,
        function (err, result, fields) {
            if (err) {

                callback(err, null);

            } else {

                callback(null, result);
            }
        })
}

module.exports = funcionE;