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
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
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
  login: async (usuario) => {
    
    const db = await SQLite.openDatabaseAsync('VitalPower');

    let result = await db.getFirstAsync(`SELECT nombre, clave FROM usuario WHERE nombre like '${usuario.nombre}' and clave like '${usuario.clave}';`);
    
    return new Promise((resolve, reject => {
      let result = await db.getFirstAsync(`SELECT nombre, clave FROM usuario WHERE nombre = ? AND clave = ?`,
      [usuario.nombre, usuario.clave],
      (result) => {
        const rows = result.rows;
        if (rows.length > 0) {
          resolve(rows._array[0]); // Devuelve el primer usuario encontrado
        } else {
          resolve(null); // No se encontró ningún usuario
        }
      },
      (error) => {
        reject('Error en la consulta SQL: ' + error.message);
      }
    );
    });

  },


  insert: (usuario) => {
    return new Promise((resolve, reject) => {

      db.withTransactionAsync(async () => {

        console.log("oy");
        try {
          let result = await db.runAsync(
            `insert into usuarios values 
            ('${usuario.nombre}', '${usuario.clave}')`
          );
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  },


};

export default consultas;
