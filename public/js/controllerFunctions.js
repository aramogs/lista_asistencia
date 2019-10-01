const funcion = {};
const express = require('express');
const app = express();





const db = require('../db/conn');


funcion.empleadosInsertCaptura = (cap_id,emp_id, emp_id_jefe,cap_año,cap_mes,cap_dia,cap_captura,callback)=>{
    db.query(`
    INSERT INTO captura (cap_id, emp_id, emp_id_jefe, cap_año, cap_mes, cap_dia, cap_captura)
    VALUES ('${cap_id}' , ${emp_id} , ${emp_id_jefe}, ${cap_año} , ${cap_mes} , ${cap_dia} , '${cap_captura}')
     ON DUPLICATE KEY UPDATE 
        cap_captura = '${cap_captura}'
    `,
    function (err, result, fields) {
        if (err) {
            
            callback(err, null);

        } else {

            callback(null, result);
        }
    })
}
funcion.empleadosActualizarJefeCambiar = (emp_id_jefe,callback)=>{
    db.query(`UPDATE captura SET emp_id_jefe = ${emp_id_jefe} WHERE emp_id = ${emp_id} `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.empleadosActualizarJefeBorrar = (emp_id,callback)=>{
    db.query(`UPDATE captura SET emp_id_jefe = 0 WHERE emp_id = ${emp_id} `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}



funcion.capturaHistorial = (emp_id_jefe,cap_año,cap_mes,callback)=>{
    db.query(`
    SELECT * FROM captura WHERE emp_id_jefe = ${emp_id_jefe}
    AND cap_año = ${cap_año}
    AND cap_mes = ${cap_mes}
     `,
    function (err, result, fields) {
        if (err) {
            console.log(err);
            
            callback(err, null);

        } else {

            callback(null, result);
        }
    })
}


funcion.verificarMotivoFalta = (emp_id_jefe,cap_año,cap_mes,callback)=>{
    db.query(`
    SELECT * FROM captura WHERE emp_id_jefe = ${emp_id_jefe}
    AND cap_captura = "F"
    AND motivo_falta IS NULL
     `,
    function (err, result, fields) {
        if (err) {

            
            callback(err, null);

        } else {

            callback(null, result);
        }
    })
}

funcion.InsertarMotivoFalta = (motivo_falta, cap_id,callback)=>{
    db.query(`UPDATE captura SET motivo_falta = "${motivo_falta}" WHERE cap_id = ${cap_id} `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

module.exports = funcion;