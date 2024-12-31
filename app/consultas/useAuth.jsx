import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('VitalPower');

export const useAuth = {
  
  login: async (usuario, clave) => {
    return new Promise((exito, error) => {
      let query = `select * from usuarios
            where nombre like '${usuario}'
            and clave like '${clave}'`;

      console.log(query);

      db.withTransactionAsync(async () => {
        try {
          let result = await db.getFirstAsync(query);
          if (result.rows._array.length > 0 && result.rows._array[0].clave === clave) {
            AsyncStorage.setItem('usuario', usuario);
            const token = 'authToken';
            AsyncStorage.setItem('authToken', token)
              .then(() => exito(token))
              .catch((err) => error('Error al guardar el token: ', err));
          } else {
            error('Usuario o contraseña incorrectos');
          }
        } catch (err) {
          error('Error al verificar el usuario');
        }
      });
    });
  },

  registro: async (usuario, clave, clave2) => {
    return new Promise((exito, error) => {
      if (clave === clave2) {
        console.log(db);
        db.withTransactionAsync(async () => {
          try {
            let result = await db.runAsync(
              `insert into usuarios (nombre, clave) values 
              ('${usuario}', '${clave}')`
            );
            exito('Te has registrado correctamente');
          } catch (err) {
            error('No te has podido registrar: ', err);
          }
        });
      } else {
        error('Las contraseñas no coinciden');
      }
    });
  }
  
};

export default useAuth;
