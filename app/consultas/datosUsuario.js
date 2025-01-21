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

      const ejercicios = await db.getAllAsync(`SELECT * FROM ejercicios`);

      return ejercicios;
    },
    selectEjerciciosFiltrados: async (grupo_muscular) => {
      const db = await SQLite.openDatabaseAsync('VitalPower');

      let ejercicios;

      if (grupo_muscular == 'Todos') {
        ejercicios = await db.getAllAsync(`SELECT * FROM ejercicios`);
      } else {
        ejercicios = await db.getAllAsync(`SELECT * FROM ejercicios WHERE grupo_muscular = '${grupo_muscular}'`);
      }

      return ejercicios;
    },
    insertEjercicios: async (formDatos) => {
      console.log(formDatos)
    }
};

export default consultasDatosUsuario;
