import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('VitalPower');

const consultas = {
  create: async () => {
    db.withTransactionAsync(async (tx) => {
      tx.runAsync('PRAGMA journal_mode = WAL;');
      tx.runAsync('PRAGMA foreign_keys = ON;');

      // Crear tabla usuarios si no existe
      tx.runAsync(`
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

      // Verificar si la bbdd ya tiene datos
      tx.runAsync(`
        SELECT COUNT(*) as count FROM usuarios;
      `, [], (_, result) => {
        const count = result.rows._array[0].count;

        if (count === 0) {
          console.log('No hay usuarios en la base de datos.');
        }
      });
    });
  },

  select: (usuario) => {
    return new Promise((resolve, reject) => {
      
      let query = `select * from usuarios
            where nombre like '${usuario.nombre}'
            and clave like '${usuario.clave}'`;
      
      console.log(query);

      db.withTransactionAsync(async () => {
        
        try {
          let result = await db.getFirstAsync(query);
          resolve(result.rows._array);
        } catch (error) {
          reject(error);
        }
      });
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
