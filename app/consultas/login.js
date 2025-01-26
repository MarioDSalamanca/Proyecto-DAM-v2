import * as SQLite from 'expo-sqlite';

const consultasIndex = {
  inicializarDB: async () => {
    const db = await SQLite.openDatabaseAsync('VitalPower');

    try {
      
      /*await db.execAsync(`DROP TABLE IF EXISTS usuarios`);
      await db.execAsync(`DROP TABLE IF EXISTS entrenamientos`);
      await db.execAsync(`DROP TABLE IF EXISTS ejercicios`);
      await db.execAsync(`DROP TABLE IF EXISTS ejercicios_trabajados`);*/

      // Comprobar que no existen las tablas
      const tablasNecesarias = ['usuarios', 'entrenamientos', 'ejercicios', 'ejercicios_trabajados'];
      const tablasExistentes = [];

      for (tabla of tablasNecesarias) {
        const resultado = await db.getFirstAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tabla}';`);
        if (resultado != null) tablasExistentes.push(tabla);
      }
      
      if (tablasExistentes.length != 4) {

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

          await db.runAsync(`
            INSERT INTO usuarios (usuario, clave, edad, peso, altura, genero) VALUES
              ('Mario', 'Mario123', 23, 66, 1.73, 'Masculino');`);
          
          /*const usuarios = await db.getAllAsync('SELECT * FROM usuarios;');
          console.log('Usuarios:', usuarios);*/
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
          await db.runAsync(`
            INSERT INTO entrenamientos (usuario_id, duracion, num_ejercicios, fecha) VALUES
              (1, '1 hora y 45 minutos', 4, '1/1/2025'),
              (1, '30 minutos', 3, '3/1/2025'),
              (1, '50 minutos', 5, '5/1/2025'),
              (1, '1 hora', 5, '7/1/2025'),
              (1, '40 minutos', 4, '9/1/2025'),
              (1, '1 hora y35 minutos', 3, '11/1/2025'),
              (1, '55 minutos', 4, '13/1/2025'),
              (1, '45 minutos', 3, '15/1/2025'),
              (1, '30 minutos', 4, '17/1/2025'),
              (1, '50 minutos', 5, '18/1/2025'),
              (1, '60 minutos', 5, '19/1/2025'),
              (1, '40 minutos', 4, '20/1/2025'),
              (1, '35 minutos', 3, '21/1/2025'),
              (1, '45 minutos', 4, '22/1/2025'),
              (1, '50 minutos', 5, '23/1/2025');`);
              
          /*const entrenamientos = await db.getAllAsync('SELECT * FROM entrenamientos;');
          console.log('Entrenamientos:', entrenamientos);*/
        }

        // Crear tabla ejercicios si no existe
        if (!tablasExistentes.includes('ejercicios')) {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ejercicios (
              id INTEGER PRIMARY KEY,
              nombre TEXT NOT NULL,
              grupo_muscular TEXT NOT NULL,
              descripcion TEXT NOT NULL);`);

          // Datos de relleno para tabla ejercicios
          await db.runAsync(`
            INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
              ('Press de banca', 'Tren superior', 'El press de banca trabaja los músculos del pecho, tríceps y hombros. Se realiza acostado mientras se empuja una barra hacia arriba.'),
              ('Sentadilla', 'Tren inferior', 'Ejercicio fundamental que fortalece muslos, glúteos y caderas. Involucra descender doblando las rodillas con el peso en los talones.'),
              ('Dominadas', 'Tren superior', 'Las dominadas son un ejercicio de peso corporal que fortalece la espalda y bíceps tirando del cuerpo hacia una barra.'),
              ('Peso muerto', 'Tren inferior', 'Ejercicio compuesto que trabaja glúteos, isquiotibiales, y zona lumbar levantando una barra desde el suelo.'),
              ('Flexiones', 'Tren superior', 'Las flexiones desarrollan fuerza en el pecho, hombros y tríceps empujando el cuerpo hacia arriba desde el suelo.'),
              ('Zancadas', 'Tren inferior', 'Movimiento unilateral que mejora equilibrio y fuerza en piernas al avanzar y bajar con control.'),
              ('Press militar', 'Tren superior', 'Ejercicio que desarrolla fuerza en los deltoides al empujar una barra o mancuernas sobre la cabeza.'),
              ('Planchas', 'Core', 'Ejercicio isométrico que fortalece el abdomen, manteniendo una posición estable y recta desde los hombros hasta los pies.'),
              ('Curl de bíceps', 'Tren superior', 'El curl de bíceps se realiza doblando los codos con mancuernas o barra para desarrollar los músculos de los brazos.'),
              ('Remo con barra', 'Tren superior', 'Fortalece la espalda alta y media al inclinar el torso y tirar de una barra hacia el abdomen.'),
              ('Press inclinado', 'Tren superior', 'Variante del press de banca que se realiza en un banco inclinado para trabajar el pecho superior.'),
              ('Abdominales', 'Core', 'Ejercicio clásico que fortalece los músculos abdominales al levantar el torso desde el suelo.'),
              ('Elevaciones laterales', 'Tren superior', 'Trabaja los deltoides laterales levantando mancuernas hacia los lados con los brazos extendidos.'),
              ('Hip thrust', 'Tren inferior', 'Ejercicio de aislamiento que fortalece glúteos empujando las caderas hacia arriba desde una posición sentada.'),
              ('Extension de tríceps', 'Tren superior', 'Fortalece el tríceps estirando los codos con pesas, mancuernas o cuerda en polea.'),
              ('Press con mancuernas', 'Tren superior', 'Variante del press que se realiza con mancuernas para un rango de movimiento más amplio y estabilidad.'),
              ('Remo con mancuerna', 'Tren superior', 'Fortalece un lado de la espalda a la vez, tirando de una mancuerna hacia el torso desde una posición inclinada.'),
              ('Elevaciones de talones', 'Tren inferior', 'Fortalece los músculos de la pantorrilla levantando los talones desde el suelo con control.'),
              ('Press Arnold', 'Tren superior', 'Variante del press de hombros que combina un giro para trabajar los deltoides de manera completa.'),
              ('Jalón al pecho', 'Tren superior', 'Se realiza con polea para trabajar la espalda alta y bíceps jalando la barra hacia el pecho.'),
              ('Burpees', 'Core', 'Ejercicio de alta intensidad que combina salto, plancha y flexión, trabajando todo el cuerpo en un solo movimiento.'),
              ('Mountain climbers', 'Core', 'Fortalece el abdomen y mejora la resistencia llevando las rodillas hacia el pecho en posición de plancha.'),
              ('Curl de piernas', 'Tren inferior', 'Ejercicio en máquina que fortalece los músculos de la parte posterior de las piernas doblando las rodillas.'),
              ('Press de pierna', 'Tren inferior', 'Fortalece los muslos empujando una plataforma con los pies desde una posición reclinada.'),
              ('Pull over', 'Tren superior', 'Ejercicio que expande el pecho y trabaja dorsal ancho al mover una mancuerna desde detrás de la cabeza hasta el pecho.'),
              ('Facepull', 'Tren superior', 'Trabaja los deltoides posteriores y la estabilidad escapular tirando de una cuerda hacia el rostro.'),
              ('Fondos en paralelas', 'Tren superior', 'Ejercicio de peso corporal que fortalece tríceps y pecho al descender y elevar el cuerpo entre barras paralelas.'),
              ('Plancha lateral', 'Core', 'Variante de plancha que trabaja oblicuos y estabilidad manteniendo el cuerpo recto apoyado en un lado.'),
              ('Press de hombros', 'Tren superior', 'Fortalece los hombros al empujar mancuernas o barra por encima de la cabeza desde posición sentada o de pie.'),
              ('Sentadilla sumo', 'Tren inferior', 'Variante de sentadilla con postura amplia para trabajar aductores, glúteos y cuádriceps.'),
              ('Remo invertido', 'Tren superior', 'Ejercicio con peso corporal que trabaja la espalda tirando del torso hacia una barra desde posición supina.'),
              ('Jalón tras nuca', 'Tren superior', 'Variante de jalón que trabaja el dorsal ancho y trapecios al tirar la barra hacia la nuca.'),
              ('Push press', 'Tren superior', 'Ejercicio dinámico que combina fuerza y potencia al empujar una barra por encima de la cabeza con ayuda de las piernas.'),
              ('Russian twists', 'Core', 'Fortalece los oblicuos al rotar el torso de lado a lado en posición sentada, con o sin peso.'),
              ('Elevación de piernas', 'Core', 'Fortalece el abdomen bajo al levantar las piernas rectas desde posición acostada.'),
              ('Sentadilla frontal', 'Tren inferior', 'Variante de sentadilla que enfatiza cuádriceps al sostener la barra al frente de los hombros.'),
              ('Remo pendlay', 'Tren superior', 'Remo con barra que enfatiza la fuerza en la parte alta de la espalda desde una posición paralela al suelo.'),
              ('Ab Wheel Rollout', 'Core', 'Ejercicio avanzado que fortalece el abdomen al extender el torso usando una rueda con control y estabilidad.');`)

          /*const ejercicios = await db.getAllAsync('SELECT * FROM ejercicios;');
          console.log('Ejercicios:', ejercicios);*/
        }

        if (!tablasExistentes.includes('ejercicios_trabajados')) {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ejercicios_trabajados (
              id INTEGER PRIMARY KEY,
              entrenamiento_id INTEGER NOT NULL,
              ejercicio_id INTEGER NOT NULL,
              series INTEGER NOT NULL,
              repeticiones INTEGER NOT NULL,
              FOREIGN KEY (entrenamiento_id) REFERENCES entrenamientos (id) ON DELETE CASCADE,
              FOREIGN KEY (ejercicio_id) REFERENCES ejercicios (id) ON DELETE CASCADE);`);

          // Datos de relleno para tabla ejercicios
          await db.runAsync(`
            INSERT INTO ejercicios_trabajados (entrenamiento_id, ejercicio_id, series, repeticiones) VALUES
              (1, 1, 4, 12), (1, 2, 3, 10), (1, 3, 4, 8), (1, 4, 3, 12), (2, 5, 4, 15), (2, 6, 3, 10), (2, 7, 4, 12),
              (3, 8, 3, 12), (3, 9, 4, 10), (3, 10, 3, 12), (3, 11, 4, 8), (4, 13, 4, 15), (4, 14, 3, 12), (4, 15, 4, 10), 
              (4, 16, 4, 12), (4, 17, 3, 8), (5, 18, 3, 10), (5, 19, 4, 15), (5, 20, 4, 12), (5, 21, 3, 10), 
              (6, 22, 3, 12), (6, 23, 4, 15), (6, 24, 4, 12), (7, 25, 3, 10), (7, 26, 4, 12), (7, 27, 4, 10), (7, 28, 3, 8),
              (8, 29, 3, 12), (8, 30, 4, 15), (8, 31, 4, 10), (9, 32, 3, 12), (9, 33, 4, 15), (9, 34, 4, 8), (9, 35, 3, 10),
              (10, 36, 3, 15), (10, 37, 4, 12), (10, 38, 4, 10), (10, 38, 3, 8), (10, 37, 4, 12), (11, 1, 4, 12), (11, 2, 3, 10), 
              (11, 3, 4, 8), (11, 4, 3, 12), (12, 5, 4, 15), (12, 6, 3, 10), (12, 7, 4, 12), (13, 8, 3, 12), (13, 9, 4, 10), 
              (13, 10, 3, 12), (13, 11, 4, 8), (14, 13, 4, 15), (14, 14, 3, 12), (14, 15, 4, 10), (14, 16, 4, 12),
              (14, 17, 3, 8), (15, 18, 3, 10), (15, 19, 4, 15), (15, 20, 4, 12);`);

          /*const ejercicios_trabajados = await db.getAllAsync('SELECT * FROM ejercicios_trabajados;');
          console.log('Ejercicios_trabajados:', ejercicios_trabajados);*/
        }
      }
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
