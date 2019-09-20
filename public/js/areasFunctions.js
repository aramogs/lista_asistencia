const funcionA = {};
const dbA = require('../db/connAreas');
const db = require('../db/conn');

funcionA.areas = (callback) => {
    dbA.query(`SELECT * from areas WHERE area != 'N/A'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcionA.turnos = (callback) => {
    dbA.query(`SELECT * FROM turnos `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcionA.subareas = (callback) => {
    dbA.query(`SELECT * from areas_subarea WHERE subarea != 'N/A'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcionA.subareasPorArea = (id_area,callback) => {
    dbA.query(`SELECT * from areas_subarea WHERE subarea != 'N/A' AND id_area = ${id_area}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}



funcionA.estaciones = (callback) => {
    dbA.query(`SELECT * from areas_estaciones WHERE estacion != 'N/A'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcionA.estacionesPorSubarea = (id_subarea,callback) => {
    dbA.query(`SELECT * from areas_estaciones WHERE estacion != 'N/A' AND id_subarea = ${id_subarea} `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcionA


module.exports = funcionA;