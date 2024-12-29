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

  select: (filtros = {}) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM usuarios`;
      const params = [];

      if (filtros.nombre) {
        query += ` WHERE nombre = ?`;
        params.push(filtros.nombre);
        params.push(filtros.clave);
      }

      db.withTransactionAsync(async (tx) => {
        tx.runAsync(
          query,
          params,
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
  },

  insert: (usuario) => {
    return new Promise((resolve, reject) => {
      const { nombre, clave } = usuario;

      console.log("ey");
      db.withTransactionAsync(async (tx) => {
        tx.runAsync(
          `
          INSERT INTO usuarios (nombre, clave) VALUES (?, ?);
          `,
          [nombre, clave],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  },

};

export default consultas;
