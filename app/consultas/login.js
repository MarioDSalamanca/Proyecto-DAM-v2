import * as SQLite from 'expo-sqlite';

const consultasIndex = {
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
          usuario TEXT NOT NULL UNIQUE,
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

    const db = await SQLite.openDatabaseAsync('VitalPower');
    
    const { usuario, clave } = usuarioObj;

    const query = await db.getFirstAsync(`SELECT * FROM usuarios WHERE usuario = '${usuario}' and clave = '${clave}'`);

    let respuesta;
    query != null ? respuesta = query.usuario : respuesta = false;
    return respuesta;

  },
  registro: async ( usuarioObj ) => {
    const db = await SQLite.openDatabaseAsync('VitalPower');

    const { usuario, clave } = usuarioObj;    

    const existe = await db.getFirstAsync(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`);
    if (existe) return { estado: false, mensaje: `Ya existe un usuario "${usuario}"` };

    const query = await db.runAsync(`INSERT INTO usuarios (usuario, clave) VALUES (?, ?)`, usuario, clave)
    if (query) return { estado: true, mensaje: `Usuario registrado con éxito` };

  },
};

export default consultasIndex;
