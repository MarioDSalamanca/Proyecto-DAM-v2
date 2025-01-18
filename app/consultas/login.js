import * as SQLite from 'expo-sqlite';

const consultasIndex = {
  inicializarDB: async () => {
    const db = await SQLite.openDatabaseAsync('VitalPower');

    try {
      
      /*await db.execAsync(`DROP TABLE IF EXISTS usuarios`);
      await db.execAsync(`DROP TABLE IF EXISTS entrenamientos`);
      await db.execAsync(`DROP TABLE IF EXISTS ejercicios`);*/

      // Comprobar que no existen las tablas
      const tablasNecesarias = ['usuarios', 'entrenamientos', 'ejercicios'];
      const tablasExistentes = [];

      for (tabla of tablasNecesarias) {
        const resultado = await db.getFirstAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tabla}';`);
        if (resultado) tablasExistentes.push(tabla);
      }
      
      if (tablasExistentes.length != 3) {

        await db.execAsync(`PRAGMA journal_mode = WAL;`);
        await db.execAsync(`PRAGMA foreign_keys = ON;`);

        // Crear tabla usuarios si no existe
        if (!tablasExistentes.includes('usuarios')) {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS usuarios (
              id INTEGER PRIMARY KEY,
              usuario TEXT NOT NULL UNIQUE,
              clave TEXT NOT NULL,
              edad INTEGER,
              peso REAL,
              altura REAL,
              genero TEXT);`);

          await db.execAsync(`
            INSERT INTO usuarios (usuario, clave, edad, peso, altura, genero) VALUES
              ('Mario', 'Mario123', 23, 66, 1.73, 'Masculino');`);
          
          console.log(`Se ha creado la tabla usuarios`);
        }

        // Crear tabla entrenamientos si no existe
        if (!tablasExistentes.includes('entrenamientos')) {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS entrenamientos (
              id INTEGER PRIMARY KEY,
              usuario_id INTEGER NOT NULL,
              duracion TEXT,
              num_ejercicios INTEGER NOT NULL,
              fecha TEXT NOT NULL,
              FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE);`);

          // Datos de relleno para tabla entrenamientos
          await db.execAsync(`
            INSERT INTO entrenamientos (usuario_id, duracion, num_ejercicios, fecha) VALUES
              (1, '45 minutos', 3, '01/01/2025'),
              (1, '50 minutos', 3, '03/01/2025'),
              (1, '60 minutos', 4, '05/01/2025'),
              (1, '40 minutos', 3, '07/01/2025'),
              (1, '30 minutos', 2, '09/01/2025'),
              (1, '35 minutos', 2, '11/01/2025'),
              (1, '45 minutos', 3, '13/01/2025'),
              (1, '55 minutos', 4, '15/01/2025'),
              (1, '30 minutos', 3, '17/01/2025'),
              (1, '50 minutos', 3, '19/01/2025');`);
              
          console.log(`Se ha creado la tabla entrenamientos`);
        }

        // Crear tabla ejercicios si no existe
        if (!tablasExistentes.includes('ejercicios')) {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ejercicios (
              id INTEGER PRIMARY KEY,
              entrenamiento_id INTEGER NOT NULL,
              nombre TEXT NOT NULL,
              grupo_muscular TEXT NOT NULL,
              descripcion TEXT NOT NULL,
              series INTEGER NOT NULL,
              repeticiones INTEGER NOT NULL,
              FOREIGN KEY (entrenamiento_id) REFERENCES entrenamientos (id) ON DELETE CASCADE);`);

          // Datos de relleno para tabla ejercicios
          await db.execAsync(`
            INSERT INTO ejercicios (entrenamiento_id, nombre, grupo_muscular, descripcion, series, repeticiones) VALUES
              (1, 'Press de banca', 'Pectorales', 'Este ejercicio clásico trabaja principalmente los músculos pectorales mayores, pero también activa hombros y tríceps. Es clave para el desarrollo de fuerza en el tren superior.', 4, 12),
              (1, 'Fondos en paralelas', 'Tríceps', 'Fortalece el tríceps y pecho, ayudando a mejorar la estabilidad de los hombros. Ideal para ganar fuerza funcional en movimientos empuje.', 3, 15),
              (1, 'Press inclinado', 'Pectorales', 'Enfocado en la parte superior del pecho. Este movimiento también activa los deltoides frontales y contribuye al equilibrio muscular del torso.', 4, 10),
              (2, 'Dominadas', 'Dorsales', 'Un movimiento compuesto que fortalece los dorsales, bíceps y músculos del core. Es esencial para construir una espalda ancha y mejorar la fuerza de tracción.', 4, 10),
              (2, 'Remo con barra', 'Espalda', 'Desarrolla la musculatura media de la espalda mientras mejora la postura y la estabilidad del core. Es ideal para ganar densidad en la espalda.', 4, 12),
              (2, 'Jalones al pecho', 'Dorsales', 'Alternativa a las dominadas que permite ajustar la carga para un desarrollo progresivo de la fuerza en los dorsales.', 4, 12),
              (3, 'Sentadilla', 'Piernas', 'Fortalece los cuádriceps, glúteos y músculos estabilizadores. Este ejercicio básico mejora la potencia y la movilidad del tren inferior.', 5, 12),
              (3, 'Peso muerto', 'Espalda baja', 'Trabaja espalda baja, glúteos y isquiotibiales. Es un ejercicio integral para mejorar la fuerza total del cuerpo.', 5, 10),
              (3, 'Zancadas', 'Piernas', 'Mejora el equilibrio y la fuerza en las piernas. También activa los glúteos y fortalece los estabilizadores de las rodillas.', 4, 12),
              (3, 'Hip thrust', 'Glúteos', 'Este movimiento específico maximiza la activación del glúteo mayor, siendo clave para mejorar el rendimiento deportivo y la postura.', 4, 15),
              (4, 'Press militar', 'Hombros', 'Fortalece los deltoides y los músculos estabilizadores del core. Ayuda a ganar fuerza y mejorar el equilibrio en los movimientos de empuje.', 4, 10),
              (4, 'Curl de bíceps', 'Bíceps', 'Aísla los músculos del bíceps, permitiendo un desarrollo equilibrado de los brazos. Mejora la estética y la fuerza funcional.', 4, 12),
              (4, 'Elevaciones laterales', 'Hombros', 'Aísla los deltoides laterales para ensanchar visualmente los hombros. Mejora el equilibrio muscular en el tren superior.', 3, 15),
              (5, 'Planchas', 'Core', 'Este ejercicio isométrico fortalece el core, incluyendo los músculos abdominales y lumbares. Mejora la estabilidad y la postura general.', 3, 30),
              (5, 'Russian twists', 'Core', 'Trabaja los oblicuos y el recto abdominal mientras mejora la resistencia a la rotación. Ideal para desarrollar un core fuerte y funcional.', 3, 20),
              (6, 'Burpees', 'Full body', 'Ejercicio funcional que trabaja todos los grupos musculares. Mejora la resistencia cardiovascular y la fuerza general.', 3, 15),
              (6, 'Mountain climbers', 'Core', 'Este ejercicio dinámico fortalece el core y mejora la resistencia. También es ideal para quemar calorías rápidamente.', 3, 25),
              (7, 'Remo Pendlay', 'Espalda', 'Mejora la fuerza en la parte superior de la espalda y en los estabilizadores del core. También optimiza la postura y la técnica.', 4, 12),
              (7, 'Peso muerto sumo', 'Piernas', 'Enfocado en aductores y glúteos, esta variante reduce la carga en la espalda baja mientras trabaja la fuerza en el tren inferior.', 4, 10),
              (7, 'Face pulls', 'Hombros', 'Fortalece los deltoides posteriores y mejora la salud de los hombros al equilibrar los músculos de empuje y tracción.', 3, 12),
              (8, 'Step-ups', 'Piernas', 'Fortalece glúteos y cuádriceps mientras mejora el equilibrio y la coordinación. Perfecto para un trabajo funcional del tren inferior.', 4, 12),
              (8, 'Overhead squat', 'Piernas', 'Desafío para la fuerza, estabilidad y movilidad. Este ejercicio activa todo el cuerpo, pero se centra en piernas y core.', 4, 10),
              (8, 'Thrusters', 'Full body', 'Combinación de sentadilla y press, este ejercicio trabaja tanto el tren inferior como el superior, mejorando la resistencia y la potencia.', 4, 12),
              (8, 'Kettlebell swings', 'Glúteos', 'Fortalece glúteos, espalda baja y core mientras mejora la potencia explosiva y la resistencia cardiovascular.', 4, 15),
              (9, 'Snatch', 'Full body', 'Ejercicio olímpico que mejora la potencia y la coordinación. Activa todo el cuerpo, con un enfoque en la fuerza explosiva.', 4, 10),
              (9, 'Push-ups', 'Pectorales', 'Fortalece el pecho, tríceps y hombros. Es un movimiento básico pero efectivo para el tren superior.', 4, 20),
              (9, 'Abdominales bicicleta', 'Core', 'Trabaja los oblicuos y el recto abdominal de manera dinámica. Mejora la estabilidad y el control del tronco.', 3, 25),
              (10, 'Extensiones de pierna', 'Cuádriceps', 'Aísla el cuádriceps y permite un control preciso del esfuerzo en cada repetición. Mejora la fuerza y la definición.', 4, 15),
              (10, 'Curls femorales', 'Isquiotibiales', 'Aísla los músculos posteriores del muslo. Es ideal para fortalecer y prevenir desequilibrios musculares.', 4, 15),
              (10, 'Farmer’s carry', 'Core', 'Fortalece el core, la fuerza de agarre y la resistencia general. También mejora la postura y la estabilidad.', 3, 30);`);
    
          console.log(`Se ha creado la tabla ejercicios`);
        }
      }

      // Mostrar datos de las tablas
      /*console.log('Mostrando datos de las tablas...');

      const usuarios = await db.getAllAsync('SELECT * FROM usuarios;');
      const entrenamientos = await db.getAllAsync('SELECT * FROM entrenamientos;');
      const ejercicios = await db.getAllAsync('SELECT * FROM ejercicios;');

      console.log('Usuarios:', usuarios);
      console.log('Entrenamientos:', entrenamientos);
      console.log('Ejercicios:', ejercicios);*/

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
