import * as SQLite from 'expo-sqlite';

const consultasDatosUsuario = {
  select: async ( usuario ) => {
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
  update: async ( formDatos ) => {
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
};

export default consultasDatosUsuario;
