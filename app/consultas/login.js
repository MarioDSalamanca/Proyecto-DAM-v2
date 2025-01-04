import * as SQLite from 'expo-sqlite';

const consultas = {
  inicializarDB: async () => {
    const db = await SQLite.openDatabaseAsync('VitalPower');

    try {
      await db.execAsync(`PRAGMA journal_mode = WAL;`);
      await db.execAsync('PRAGMA foreign_keys = ON;');

      // Crear tabla usuarios si no existe
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY,
          usuario TEXT NOT NULL,
          clave TEXT NOT NULL,
          edad INTEGER,
          peso REAL,
          altura REAL,
          genero TEXT
        );
      `);
      
    } catch(err) {
      console.log("Error: ", err)
    }
  },
  login: async ( usuarioObj ) => {
    
    const { usuario, clave } = usuarioObj;
    
    const db = await SQLite.openDatabaseAsync('VitalPower');

    /* const queryString = `SELECT usuario, clave FROM usuarios WHERE usuario = '${usuario}' and clave = '${clave}'`;
    console.log('Consulta SQL:', queryString); */

    const query = await db.prepareAsync(`SELECT usuario, clave FROM usuarios WHERE usuario = ? and clave = ?`);
    const execQuery = await query.executeAsync([usuario, clave]);
    const resultado = await execQuery.getFirstAsync();
    await execQuery.resetAsync();

    let respuesta;
    resultado ? respuesta = resultado.usuario : respuesta = false;
    return respuesta;

  },


  registro: async ( usuarioObj ) => {

    const { usuario, clave } = usuarioObj;
    
    const db = await SQLite.openDatabaseAsync('VitalPower');

    /* const queryString = `SELECT usuario, clave FROM usuarios WHERE usuario = '${usuario}' and clave = '${clave}'`;
    console.log('Consulta SQL:', queryString); */

    const query = await db.runAsync(`INSERT INTO usuarios (usuario, clave) VALUES (?, ?)`, usuario, clave)

    let respuesta;
    query ? respuesta = true : respuesta = false;
    return respuesta;

  },

};

export default consultas;
