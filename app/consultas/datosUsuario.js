import * as SQLite from 'expo-sqlite';

const consultasDatosUsuario = {
  // Perfil
    selectPerfil: async ( usuario ) => {
      const db = await SQLite.openDatabaseAsync('VitalPower');

      const query = await db.getFirstAsync(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`);

      let respuesta;
      if (query != null) {
        respuesta = {
          usuario: query.usuario,
          clave: query.clave,
          edad: query.edad,
          peso: query.peso,
          altura: query.altura,
          genero: query.genero
        }
      } else {
        respuesta = false;
      }

      return respuesta;

    },
    updatePerfil: async ( formDatos ) => {
      const db = await SQLite.openDatabaseAsync('VitalPower');

      const { usuarioAntiguo, usuario, clave, edad, peso, altura, genero } = formDatos;

      console.log("Datos en el update: ", formDatos)

      if (usuarioAntiguo != usuario) {

        const select = await db.getFirstAsync(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`);
        if (select != null) return { estado: false, mensaje: `Ya existe un usuario "${usuario}"` };
        
      }

      const update = await db.runAsync(`UPDATE usuarios SET 
      usuario = ?, clave = ?, edad = ?, peso = ?, altura = ?, genero = ? WHERE usuario = ?`, 
      [usuario, clave, edad, peso, altura, genero, usuarioAntiguo]);

      if (update.changes == 1) return { estado: true, mensaje: 'Usuario actualizado' }
      else return { estado: false, mensaje: 'No se ha podido actualizar el usuario' }

    },
  // Datos
    selectDatos: async ( usuario ) => {
      const db = await SQLite.openDatabaseAsync('VitalPower');

      const user = await db.getFirstAsync(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`);

      const entrenamientos = await db.getAllAsync(`SELECT * FROM entrenamientos WHERE usuario_id = ${user.id} ORDER BY fecha DESC`);
      
      let ejercicios = [];

      for (const entrenamiento of entrenamientos) {
        const ejerciciosAsociados = await db.getAllAsync(`
          SELECT ejercicios.*, ejercicios_trabajados.* FROM ejercicios
            INNER JOIN ejercicios_trabajados ON ejercicios.id = ejercicios_trabajados.ejercicio_id
            WHERE ejercicios_trabajados.entrenamiento_id = ${entrenamiento.id}`);
        ejercicios = ejercicios.concat(ejerciciosAsociados);
      }

      let respuesta;

      if (entrenamientos != null) {
        respuesta = {
          usuario: user.usuario,
          edad: user.edad,
          altura: user.altura,
          peso: user.peso,
          entrenamientos: entrenamientos,
          ejercicios: ejercicios,
        }
      } else {
        respuesta = false;
      }

      return respuesta;

    },
    deleteDatos: async ( entrenamiento ) => {
      const db = await SQLite.openDatabaseAsync('VitalPower');

      const eliminar = await db.runAsync('DELETE FROM entrenamientos WHERE id = $id', { $id: entrenamiento.id });

      return eliminar;
    },
  // Entrenamientos
    selectEjercicios: async () => {
      const db = await SQLite.openDatabaseAsync('VitalPower');

      const ejercicios = await db.getAllAsync(`SELECT * FROM ejercicios ORDER BY grupo_muscular`);

      return ejercicios;
    },
    selectEjerciciosFiltrados: async (grupo_muscular) => {
      const db = await SQLite.openDatabaseAsync('VitalPower');

      let ejercicios;

      if (grupo_muscular == 'Todos') {
        ejercicios = await db.getAllAsync(`SELECT * FROM ejercicios ORDER BY grupo_muscular`);
      } else {
        ejercicios = await db.getAllAsync(`SELECT * FROM ejercicios WHERE grupo_muscular = '${grupo_muscular}'`);
      }

      return ejercicios;
    },
    insertEntrenamiento: async (formDatos) => {
      const db = await SQLite.openDatabaseAsync('VitalPower');

      const idUsuario = (await db.getFirstAsync(`SELECT id FROM usuarios WHERE usuario = '${formDatos.usuario}'`)).id;

      const fecha = formDatos.fechaFormateada;
      
      let duracion;
      if (formDatos.horas != '' && formDatos.minutos != '') {
        duracion = `${formDatos.horas} horas y ${formDatos.minutos} minutos`;
      } else if (formDatos.horas != '' && formDatos.minutos == '') {
        duracion = formDatos.horas == '1' ? `${formDatos.horas} hora` : `${formDatos.horas} horas`;
      } else if (formDatos.horas == '' && formDatos.minutos != '') {
        duracion = `${formDatos.minutos} minutos`;
      }

      let num_ejercicios = Object.entries(formDatos.ejerciciosSeleccionados)
        .filter(([id, datos]) => datos.seleccionado);

      num_ejercicios = num_ejercicios.length;

      await db.runAsync(`
        INSERT INTO entrenamientos (usuario_id, duracion, num_ejercicios, fecha) VALUES (?, ?, ?, ?)`,
         idUsuario, duracion, num_ejercicios, fecha);
         
      const idEntrenamiento = (await db.getFirstAsync(`SELECT last_insert_rowid() AS id`)).id;

      let registrosAInsertar = 0;
      const insertarEjerciciosTrabajados = Object.entries(formDatos.ejerciciosSeleccionados).map(([id, datos]) => {
        if (datos.seleccionado) {
          registrosAInsertar = registrosAInsertar + 1;
          return db.runAsync(`
            INSERT INTO ejercicios_trabajados (entrenamiento_id, ejercicio_id, series, repeticiones) VALUES (?, ?, ?, ?)`,
            idEntrenamiento, id, datos.series, datos.reps
          );
        }
      });
      
      await Promise.all(insertarEjerciciosTrabajados);

      const registrosInsertados = await db.getFirstAsync(`
        SELECT COUNT(*) as count FROM ejercicios_trabajados WHERE entrenamiento_id = ?`, idEntrenamiento);

      if (registrosAInsertar == registrosInsertados.count) {
        return { estado: true, mensaje: `Entrenamiento registrado` }
      } else {
        return { estado: true, mensaje: `No se ha podido guardar tu entrenamiento` }
      }
      
    }
};

export default consultasDatosUsuario;
