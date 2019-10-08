//Conexion a base de datos
const db = require('../public/db/conn');
const controller = {};

//Require Funciones
const funcion = require('../public/js/controllerFunctions');
const funcionE = require('../public/js/empleadosFunctions');
const funcionA = require('../public/js/areasFunctions');

// Index GET
controller.index_GET = (req, res) => {
    res.render('index.ejs');

};

//GET Crear andon
controller.crear_andon_GET = (req, res) => {
    res.render('login.ejs');
};

//Login
controller.login = (req, res) => {
    loginId = req.params.id

    if (loginId == "alta_supervisores") {
        //Busca si el empleado tiene acceso tipo 2 que es admin y puede dar de alta supervisores
        funcionE.empleadosAccessAll(2, '=', (err, result) => {
            res.render('login.ejs', {
                data: loginId,
                data2: result
            });
        })
    } else if (loginId == "alta_empleados") {
        //Busca si el empleado tiene acceso tipo 1 que es supervisor y puede dar de alta empleados igual los empleados con mayor acceso 
        funcionE.empleadosAccessAll(1, '>=', (err, result) => {
            res.render('login.ejs', {
                data: loginId,
                data2: result
            });
        })
    } else if (loginId == "captura") {
        //Busca si el empleado tiene acceso tipo 2 que es admin y puede dar de alta supervisores
        funcionE.empleadosAccessAll(1, '>=', (err, result) => {
            res.render('login.ejs', {
                data: loginId,
                data2: result
            });
        })
    } else if (loginId == "captura_diaria") {
        //Busca si el empleado tiene acceso tipo 2 que es admin y puede dar de alta supervisores
        funcionE.empleadosAccessAll(1, '>=', (err, result) => {
            res.render('login.ejs', {
                data: loginId,
                data2: result
            });
        })
    } else if (loginId == "motivo_falta") {
        //Busca si el empleado tiene acceso tipo 2 que es admin y puede dar de alta supervisores
        funcionE.empleadosAccessAll(1, '>=', (err, result) => {
            res.render('login.ejs', {
                data: loginId,
                data2: result
            });
        })
    }
}

controller.alta_supervisores_POST = (req, res) => {
    emp_id = req.body.user
    funcionE.empleadosDiferenteDeOrigininador(emp_id, (err, result) => {
        funcionE.empleadosAccessAll(1, '=', (err, result2) => {
            res.render('alta_supervisores.ejs', {
                data: emp_id,
                data2: result,
                data3: result2
            })
        })
    })
}

controller.alta_supervisor_POST = (req, res) => {
    emp_id = req.body.emp_id
    funcionE.empleadosInsertAcceso(emp_id, (err, result) => {
        if (err) throw err;
        funcionE.empleadosTodos((err, result) => {
            if (err) throw err;
            funcionE.empleadosAccessAll(1, '=', (err, result2) => {
                if (err) throw err;
                res.render('alta_supervisores.ejs', {
                    data: req.body.user,
                    data2: result,
                    data3: result2
                })
            })
        })
    })

}

controller.borrar_supervisor_POST = (req, res) => {
    gafete = req.body.gafete
    funcionE.supervisorBorrarAcceso(gafete, (err, result) => {
        if (err) throw err;
        funcionE.empleadosTodos((err, empleados) => {
            if (err) throw err;
            funcionE.empleadosAccessAll(1, '=', (err, result2) => {
                if (err) throw err;
                res.render('alta_supervisores.ejs', {
                    data: req.body.user,
                    data2: empleados,
                    data3: result2
                })
            })
        })

    })
}

controller.alta_empleados_POST = (req, res) => {

    emp_id_jefe = req.body.user
    funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {

        funcion.verificarMotivoFalta(emp_id_jefe, (err, motivoFalta) => {
            if (motivoFalta.length > 0) {
                message = "null"

                funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
                    funcionE.empleadosNombre(emp_id_jefe, (err, nombreJefe) => {
                        funcionA.areas((err, areas) => {

                            funcionA.subareas((err, subareas) => {
                                funcionA.estaciones((err, estaciones) => {
                                    funcionE.empleadosSearchArea(emp_id_jefe, (err, areaPorEmpleado) => {

                                        jefe = emp_id_jefe
                                        res.render('alta_empleados.ejs', {
                                            jefe,
                                            empleados,
                                            empleadosPorJefe,
                                            data4: nombreJefe,
                                            data5: "hidden",
                                            areas,
                                            subareas,
                                            estaciones,
                                            areaPorEmpleado,
                                            message
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            } else {
                message = "hidden"
                funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
                    funcionE.empleadosNombre(emp_id_jefe, (err, nombreJefe) => {
                        funcionA.areas((err, areas) => {

                            funcionA.subareas((err, subareas) => {
                                funcionA.estaciones((err, estaciones) => {
                                    funcionE.empleadosSearchArea(emp_id_jefe, (err, areaPorEmpleado) => {

                                        jefe = emp_id_jefe
                                        res.render('alta_empleados.ejs', {
                                            jefe,
                                            empleados,
                                            empleadosPorJefe,
                                            data4: nombreJefe,
                                            data5: "hidden",
                                            areas,
                                            subareas,
                                            estaciones,
                                            areaPorEmpleado,
                                            message
                                        })
                                    })
                                })
                            })
                        })
                    })
                })

            }
        })
    })
}

controller.verificar_jefe_POST = (req, res) => {
    emp_id = req.params.id
    emp_id_jefe = req.body.emp_id_jefe
    funcionE.empleadosJefe(emp_id, (err, jefeId) => {
        jefe = jefeId[0].emp_id_jefe
        if (jefe == 0) {
            funcionA.areas((err, areas) => {
                res.render('alta_empleado_area.ejs', {
                    emp_id,
                    emp_id_jefe,
                    areas
                })
            })
        } else {
            funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {
                funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
                    funcionE.empleadosNombre(jefe, (err, nombreJefe) => {
                        funcionA.areas((err, areas) => {
                            funcionA.subareas((err, subareas) => {
                                funcionA.estaciones((err, estaciones) => {
                                    funcionE.empleadosSearchArea(emp_id_jefe, (err, areaPorEmpleado) => {

                                        jefe = emp_id_jefe


                                        res.render('alta_empleados.ejs', {
                                            jefe,
                                            empleados,
                                            empleadosPorJefe,
                                            data4: nombreJefe,
                                            data5: "null",
                                            areas,
                                            subareas,
                                            estaciones,
                                            areaPorEmpleado
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    })

}

controller.alta_empleado_turno_POST = (req, res) => {
    emp_id = req.body.emp_id
    emp_id_jefe = req.body.emp_id_jefe
    id_area = req.body.id_area
    funcionA.turnos((err, turnos) => {

        res.render('alta_empleado_turno.ejs', {
            emp_id,
            emp_id_jefe,
            id_area,
            turnos
        })
    })

}

controller.alta_empleado_subarea_POST = (req, res) => {
    emp_id = req.body.emp_id
    emp_id_jefe = req.body.emp_id_jefe
    id_area = req.body.id_area
    id_turno = req.body.id_turno



    funcionA.subareasPorArea(id_area, (err, subareas) => {
        res.render('alta_empleado_subarea.ejs', {
            emp_id,
            emp_id_jefe,
            id_area,
            id_turno,
            subareas
        })
    })

}



controller.alta_empleado_verificarEstacion_POST = (req, res) => {
    emp_id = req.body.emp_id
    emp_id_jefe = req.body.emp_id_jefe
    id_area = req.body.id_area
    id_subarea = req.body.id_subarea
    id_turno = req.body.id_turno




    funcionA.estacionesPorSubarea(id_subarea, (req, estaciones) => {
        if (estaciones.length > 1) {
            res.render('alta_empleado_estacion.ejs', {
                emp_id,
                emp_id_jefe,
                id_area,
                id_subarea,
                id_turno,
                estaciones
            })
        } else {
            funcionE.empleadosNombre(emp_id, (err, nombreEmpleado) => {
                funcionA.areas((err, areas) => {
                    funcionA.subareas((err, subareas) => {
                        funcionA.estaciones((err, estaciones) => {
                            funcionA.turnos((err, turnos) => {




                                id_estacion = null
                                res.render('alta_empleado_verificacion.ejs', {
                                    emp_id,
                                    emp_id_jefe,
                                    id_area,
                                    id_subarea,
                                    id_estacion,
                                    id_turno,
                                    turnos,
                                    areas,
                                    subareas,
                                    estaciones,
                                    nombreEmpleado
                                })
                            })
                        })
                    })
                })
            })
        }
    })
}

controller.alta_empleado_verificacion_POST = (req, res) => {
    emp_id = req.body.emp_id
    emp_id_jefe = req.body.emp_id_jefe
    id_area = req.body.id_area
    id_subarea = req.body.id_subarea
    id_estacion = req.body.id_estacion
    id_turno = req.body.id_turno




    funcionE.empleadosNombre(emp_id, (err, nombreEmpleado) => {
        funcionA.areas((err, areas) => {
            funcionA.subareas((err, subareas) => {
                funcionA.estaciones((err, estaciones) => {
                    funcionA.turnos((err, turnos) => {
                        res.render('alta_empleado_verificacion.ejs', {
                            emp_id,
                            emp_id_jefe,
                            id_area,
                            id_subarea,
                            id_estacion,
                            id_turno,
                            areas,
                            subareas,
                            estaciones,
                            turnos,
                            nombreEmpleado
                        })
                    })
                })
            })
        })
    })
}


controller.alta_empleado_POST = (req, res) => {
    emp_id = req.body.emp_id
    emp_id_jefe = req.body.emp_id_jefe
    id_area = req.body.id_area
    id_subarea = req.body.id_subarea
    id_estacion = req.body.id_estacion

    // Si al dar de alta la estacion es nula entonces, se asigna valor 0 a la estacion
    if (id_estacion == '') {
        id_estacion = 0;

        funcionE.empleadosUpdateSubordinado(emp_id, emp_id_jefe, (err, updated) => {
            funcion.empleadosActualizarJefeCambiar(emp_id_jefe, (err, result00) => {


                affectedRowTrue = updated.affectedRows

                if (affectedRowTrue == 1) {

                    funcionE.empleadosInsertArea(emp_id, emp_id_jefe, id_area, id_subarea, id_estacion, (err, result) => {
                        funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {
                            funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
                                funcionE.empleadosNombre(emp_id_jefe, (err, nombreJefe) => {
                                    funcionA.areas((err, areas) => {
                                        funcionA.subareas((err, subareas) => {
                                            funcionE.empleadosSearchArea(emp_id_jefe, (err, areaPorEmpleado) => {
                                                jefe = emp_id_jefe
                                                funcionA.estaciones((err, estaciones) => {


                                                    funcionE.SearchempleadoArea(emp_id, (err, areaEmpleado) => {
                                                        id_turno = areaEmpleado[0].turno
                                                        id_area = areaEmpleado[0].id_area
                                                        id_subarea = areaEmpleado[0].id_subarea
                                                        id_estacion = areaEmpleado[0].id_estacion
                                                        his_movimiento = "Alta"

                                                        funcionE.empleadosInsertHistorial(his_movimiento, emp_id_jefe, emp_id, id_turno, id_area, id_subarea, id_estacion, (err, result) => {

                                                            res.render('alta_empleados.ejs', {
                                                                jefe,
                                                                empleados,
                                                                empleadosPorJefe,
                                                                data4: nombreJefe,
                                                                data5: "hidden",
                                                                areas,
                                                                subareas,
                                                                estaciones,
                                                                areaPorEmpleado
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                } else {
                    funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {
                        funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
                            funcionE.empleadosJefe(emp_id, (err, result4) => {
                                funcionE.empleadosNombre(result4[0].emp_id_jefe, (err, nombreJefe) => {

                                    funcionA.areas((err, areas) => {
                                        funcionA.subareas((err, subareas) => {
                                            funcionA.estaciones((err, estaciones) => {
                                                funcionE.empleadosSearchArea(emp_id_jefe, (err, areaPorEmpleado) => {
                                                    jefe = emp_id_jefe


                                                    funcionE.SearchempleadoArea(emp_id, (err, areaEmpleado) => {
                                                        id_turno = areaEmpleado[0].turno
                                                        id_area = areaEmpleado[0].id_area
                                                        id_subarea = areaEmpleado[0].id_subarea
                                                        id_estacion = areaEmpleado[0].id_estacion
                                                        his_movimiento = "Alta"

                                                        funcionE.empleadosInsertHistorial(his_movimiento, emp_id_jefe, emp_id, id_turno, id_area, id_subarea, id_estacion, (err, result) => {

                                                            res.render('alta_empleados.ejs', {
                                                                jefe,
                                                                empleados,
                                                                empleadosPorJefe,
                                                                data4: nombreJefe,
                                                                data5: "null",
                                                                areas,
                                                                subareas,
                                                                estaciones,
                                                                areaPorEmpleado
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            })
        })
    } else {
        funcionE.empleadosUpdateSubordinado(emp_id, emp_id_jefe, (err, result) => {
            funcion.empleadosActualizarJefeCambiar(emp_id_jefe, (err, result00) => {
                if (err) throw err;

                affectedRowTrue = result.affectedRows

                if (affectedRowTrue == 1) {

                    funcionE.empleadosInsertArea(emp_id, emp_id_jefe, id_area, id_subarea, id_estacion, (err, result) => {


                        funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {
                            funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
                                funcionE.empleadosNombre(emp_id_jefe, (err, nombreJefe) => {
                                    funcionA.areas((err, areas) => {
                                        funcionA.subareas((err, subareas) => {
                                            funcionE.empleadosSearchArea(emp_id_jefe, (err, areaPorEmpleado) => {
                                                jefe = emp_id_jefe

                                                funcionA.estaciones((err, estaciones) => {


                                                    funcionE.SearchempleadoArea(emp_id, (err, areaEmpleado) => {
                                                        id_turno = areaEmpleado[0].turno
                                                        id_area = areaEmpleado[0].id_area
                                                        id_subarea = areaEmpleado[0].id_subarea
                                                        id_estacion = areaEmpleado[0].id_estacion
                                                        his_movimiento = "Alta"

                                                        funcionE.empleadosInsertHistorial(his_movimiento, emp_id_jefe, emp_id, id_turno, id_area, id_subarea, id_estacion, (err, result) => {

                                                            res.render('alta_empleados.ejs', {
                                                                jefe,
                                                                empleados,
                                                                empleadosPorJefe,
                                                                data4: nombreJefe,
                                                                data5: "hidden",
                                                                areas,
                                                                subareas,
                                                                estaciones,
                                                                areaPorEmpleado
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                } else {
                    funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {
                        funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
                            funcionE.empleadosJefe(emp_id, (err, result4) => {
                                funcionE.empleadosNombre(emp_id_jefe, (err, nombreJefe) => {
                                    funcionA.areas((err, areas) => {
                                        funcionA.subareas((err, subareas) => {
                                            funcionA.estaciones((err, estaciones) => {
                                                funcionE.empleadosSearchArea(emp_id_jefe, (err, areaPorEmpleado) => {
                                                    jefe = emp_id_jefe



                                                    funcionE.SearchempleadoArea(emp_id, (err, areaEmpleado) => {
                                                        id_turno = areaEmpleado[0].turno
                                                        id_area = areaEmpleado[0].id_area
                                                        id_subarea = areaEmpleado[0].id_subarea
                                                        id_estacion = areaEmpleado[0].id_estacion
                                                        his_movimiento = "Alta"

                                                        funcionE.empleadosInsertHistorial(his_movimiento, emp_id_jefe, emp_id, id_turno, id_area, id_subarea, id_estacion, (err, result) => {

                                                            res.render('alta_empleados.ejs', {
                                                                jefe,
                                                                empleados,
                                                                empleadosPorJefe,
                                                                data4: nombreJefe,
                                                                data5: "null",
                                                                areas,
                                                                subareas,
                                                                estaciones,
                                                                areaPorEmpleado
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            })
        })
    }
}

controller.borrar_empleado_POST = (req, res) => {

    emp_id = req.params.id

    emp_id_jefe = req.body.emp_id_jefe

    funcionE.SearchempleadoArea(emp_id, (err, areaEmpleado) => {
        id_turno = areaEmpleado[0].turno
        id_area = areaEmpleado[0].id_area
        id_subarea = areaEmpleado[0].id_subarea
        id_estacion = areaEmpleado[0].id_estacion
        his_movimiento = "Baja"
        funcionE.empleadosBorrarJefe(emp_id, (err, result) => {
            funcion.empleadosActualizarJefeBorrar(emp_id, (err, result) => {

                funcionE.empleadosInsertHistorial(his_movimiento, emp_id_jefe, emp_id, id_turno, id_area, id_subarea, id_estacion, (err, result) => {

                    funcionE.empleadosBorrarAreaEmpleado(emp_id, (err, result) => {



                        if (err) throw err;
                        funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {
                            funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
                                funcionE.empleadosJefe(emp_id_jefe, (err, result4) => {
                                    funcionE.empleadosNombre(emp_id_jefe, (err, nombreJefe) => {
                                        funcionA.areas((err, areas) => {
                                            funcionA.subareas((err, subareas) => {
                                                funcionA.estaciones((err, estaciones) => {
                                                    funcionE.empleadosSearchArea(emp_id_jefe, (err, areaPorEmpleado) => {
                                                        jefe = emp_id_jefe

                                                        res.render('alta_empleados.ejs', {
                                                            jefe,
                                                            empleados,
                                                            empleadosPorJefe,
                                                            data4: nombreJefe,
                                                            data5: "hidden",
                                                            areas,
                                                            subareas,
                                                            estaciones,
                                                            areaPorEmpleado
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })

}

controller.captura_POST = (req, res) => {
    emp_id_jefe = req.body.user

    res.render('captura.ejs', {
        data: emp_id_jefe
    })
}



controller.captura2_POST = (req, res) => {
    let emp_id_jefe = req.body.user
    let cap_mes = req.body.cap_mes
    let cap_año = req.body.cap_año


    funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
        funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {


            funcion.capturaHistorial(emp_id_jefe, cap_año, cap_mes, (err, capturas) => {

                res.render('captura2.ejs', {
                    data: empleadosPorJefe,
                    cap_año: cap_año,
                    cap_mes: cap_mes,
                    emp_id_jefe,
                    capturas: capturas
                })
            })
        })
    })
}




controller.captura_motivo_faltas_POST = (req, res) => {
    emp_id_jefe = req.body.emp_id_jefe
    cap_mes = req.body.cap_mes
    cap_año = req.body.cap_año

    cap_id = req.body.cap_id
    motivo_falta = req.body.motivo_falta


    if (!Array.isArray(cap_id)) {
        funcion.InsertarMotivoFalta(motivo_falta, cap_id, (err, result) => {
            if (err) console.log(err);
        })
    } else {

        for (let i = 0; i < cap_id.length; i++) {
            funcion.InsertarMotivoFalta(motivo_falta[i], cap_id[i], (err, result) => {

            })

        }
    }
    res.render('guardar_captura.ejs')
}

controller.motivo_falta_POST = (req, res) => {
    let emp_id_jefe = req.body.user
    let cap_mes = req.body.cap_mes
    let cap_año = req.body.cap_año



    funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {
        funcionE.empleadosDiferenteDeOrigininador(emp_id_jefe, (err, empleados) => {
            funcion.SearchMotivoFaltas((err, motivos) => {
                funcion.verificarMotivoFalta(emp_id_jefe, (err, motivoFalta) => {
                    if (motivoFalta.length > 0) {
                        res.render('captura_motivo_faltas.ejs', {
                            emp_id_jefe,
                            cap_mes,
                            cap_año,
                            motivoFalta,
                            empleados,
                            motivos

                        })
                    } else {
                        res.render('guardar_captura.ejs')
                    }

                })
            })
        })
    })

}

controller.guardar_captura_POST = (req, res) => {
    let select = req.body.select
    let days = req.body.days
    let cap_mes = req.body.cap_mes
    let cap_año = req.body.cap_año
    let emp_id_jefe = req.body.emp_id_jefe
    for (let i = 0; i < select.length; i++) {
        if (select[i] !== '') {


            let posicion = (i / days)
            let cap_dia = i - ((Math.floor(posicion)) * days) + 1;
            let cap_captura = select[i]



            if (req.body.gafete[(Math.floor(posicion))].length == 1) {
                let emp_id = req.body.gafete
                let cap_id = emp_id.concat(cap_año, cap_mes, cap_dia)
                funcion.empleadosInsertCaptura(cap_id, emp_id, emp_id_jefe, cap_año, cap_mes, cap_dia, cap_captura, (err, result) => {
                    if (err) throw err;

                })
            } else {
                let emp_id = req.body.gafete[(Math.floor(posicion))]
                let cap_id = emp_id.concat(cap_año, cap_mes, cap_dia)
                funcion.empleadosInsertCaptura(cap_id, emp_id, emp_id_jefe, cap_año, cap_mes, cap_dia, cap_captura, (err, result) => {
                    if (err) throw err;

                })
            }
        }
    }

    res.render('guardar_captura.ejs');
}

controller.captura_diaria_POST = (req, res) => {

    emp_id_jefe = req.body.user

    funcionE.empleadosPorJefe(emp_id_jefe, (err, empleadosPorJefe) => {

        res.render('captura_diaria.ejs', {
            emp_id_jefe,
            empleadosPorJefe
        })
    })
}

controller.guardar_captura_diaria_POST = (req, res) => {


    let cap_dia = req.body.cap_dia
    let cap_mes = req.body.cap_mes
    let cap_año = req.body.cap_año
    let emp_id_jefe = req.body.emp_id_jefe
    let gafete = req.body.gafete
    let select = req.body.select


    for (let i = 0; i < select.length; i++) {

        let cap_captura = select[i]
        if (gafete[i].length == 1) {
            let emp_id = gafete
            let cap_id = emp_id.concat(cap_año, cap_mes, cap_dia)
            funcion.empleadosInsertCaptura(cap_id, emp_id, emp_id_jefe, cap_año, cap_mes, cap_dia, cap_captura, (err, result) => {
                if (err) throw err;

            })
        } else {
            let emp_id = gafete[i]
            let cap_id = emp_id.concat(cap_año, cap_mes, cap_dia)
            funcion.empleadosInsertCaptura(cap_id, emp_id, emp_id_jefe, cap_año, cap_mes, cap_dia, cap_captura, (err, result) => {
                if (err) throw err;

            })
        }



    }

    res.render('guardar_captura.ejs');

}

///////////////////////////////////////////////////


controller.seleccionar_semana_GET = (req, res) => {
    funcionE.empleadosAccessAll(1, '=', (err, accesos) => {
        funcionE.empleadosTodos((err, empleados) => {

            res.render("seleccionar_semana.ejs", {
                empleados,
                accesos
            })
        })
    })
}

controller.reporte_semanal_POST = (req, res) => {
    emp_id_jefe = req.body.supervisor
    startDate = req.body.startDate
    endDate = req.body.endDate

    cap_dia_inicio = new Date(startDate).getDate()
    cap_dia_final = new Date(endDate).getDate()
    cap_mes_inicial = new Date(startDate).getMonth() + 1
    cap_mes_final = new Date(endDate).getMonth() + 1
    cap_año = new Date(startDate).getFullYear()



    funcion.SearchJustificado_MesInicial(emp_id_jefe, cap_año, cap_mes_inicial, cap_dia_inicio, (err, justified1) => {

        funcion.SearchJustificado_MesFinal(emp_id_jefe, cap_año, cap_mes_final, cap_dia_final, (err, justified2) => {

            funcion.SearchInjustificado_MesInicial(emp_id_jefe, cap_año, cap_mes_inicial, cap_dia_inicio, (err, unjustified1) => {

                funcion.SearchInjustificado_MesFinal(emp_id_jefe, cap_año, cap_mes_final, cap_dia_final, (err, unjustified2) => {


                    faltas_justificadas = justified1.length + justified2.length
                    faltas_injustificadas = unjustified1.length + unjustified2.length
          


                    res.render('reporte_semanal.ejs',
                        {
                            faltas_justificadas,
                            faltas_injustificadas
                        })
                })
            })
        })
    })

}


///////////////////////////////////////////////////

controller.seleccionar_mes_GET = (req, res) => {
    res.render("seleccionar_mes.ejs")
}

controller.reporte_mensual_POST = (req, res) => {

    res.render('reporte_mensual.ejs')

}

controller.select_year_GET = (req, res) => {
    res.render("select_year.ejs")
}

controller.reporte_anual_POST = (req, res) => {

    res.render('reporte_anual.ejs')

}

module.exports = controller;