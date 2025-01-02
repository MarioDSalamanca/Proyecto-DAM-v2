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
  login: async ({usuario}) => {
    
    const db = await SQLite.openDatabaseAsync('VitalPower');

    console.log(usuario)

    try {

      const resultado = await db.getFirstAsync('SELECT * FROM usuarios');

      /* const query = await db.prepareAsync(`SELECT nombre, clave FROM usuarios WHERE nombre = ? and clave = ?`);
      let execQuery = await query.executeAsync([usuario.usuario, usuario.clave])
      resultado = await execQuery.getFirstAsync() */
  
      console.log(resultado)

    } catch (err) {
      console.log('Error: ', err)
    } finally {
      await execQuery.resetAsync();
    }

    /* return new Promise( async (resolve, reject) => {
      const query = await db.getFirstAsync(`SELECT nombre, clave FROM usuario WHERE nombre = ? AND clave = ?`,
      [usuario.nombre, usuario.clave],
      (query) => {
        const rows = query.rows;
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
    }); */

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
