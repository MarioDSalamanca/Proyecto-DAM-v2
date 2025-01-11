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
  update: async ( usuarioObj ) => {
    const db = await SQLite.openDatabaseAsync('VitalPower');

    const { usuarioAntiguo, usuario, clave, edad, peso, altura, genero } = usuarioObj;
    
    if (usuarioAntiguo != usuario) {

      const select = await db.getFirstAsync(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`);
      if (select != null) return false;
      
    }

    const query = await db.runAsync(`UPDATE usuarios SET 
     usuario = ? and clave = ? and edad = ? and peso = ? and altura = ? and genero = ? WHERE usuario = ?`, 
     usuario, clave, edad, peso, altura, genero, usuarioAntiguo);

    let respuesta;
    query ? respuesta = true : respuesta = false;
    return respuesta;

  },
};

export default consultasDatosUsuario;
