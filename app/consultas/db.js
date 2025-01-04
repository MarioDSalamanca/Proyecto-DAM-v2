import * as SQLite from 'expo-sqlite';

const consultas = {
  inicializarDB: async () => {
    const db = await SQLite.openDatabaseAsync('VitalPower');

    try {
      await db.execAsync(`PRAGMA journal_mode = WAL;`);
      await db.execAsync('PRAGMA foreign_keys = ON;');
      
      await db.execAsync(`DROP TABLE IF EXISTS usuarios`);

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

      await db.runAsync(`INSERT INTO usuarios (usuario, clave) VALUES ('Mario', 'Mario.rlv')`)
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
    resultado ? respuesta = resultado.usuario : respuesta = null;
    return respuesta;

  },


  insert: (usuario) => {
    return new Promise((resolve, reject) => {

      db.withTransactionAsync(async () => {

        console.log("oy");
        try {
          const query = await db.runAsync(
            `insert into usuarios values 
            ('${usuario.nombre}', '${usuario.clave}')`
          );
          resolve(query);
        } catch (error) {
          reject(error);
        }
      });
    });
  },


};

export default consultas;
