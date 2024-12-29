import AsyncStorage from '@react-native-async-storage/async-storage';
import consultas from './db'; // Asegúrate de importar las consultas

export const useAuth = {
  login: async (usuario, clave) => {
    return new Promise((exito, error) => {
      // Usamos el método select para verificar si el usuario existe
      consultas.select({ nombre: usuario, clave: clave })
        .then((result) => {
          if (result.length > 0 && result[0].clave === clave) {
            AsyncStorage.setItem('usuario', usuario);
            const token = 'authToken';
            AsyncStorage.setItem('authToken', token)
              .then(() => exito(token))
              .catch((err) => error('Error al guardar el token'));
          } else {
            error('Usuario o contraseña incorrectos');
          }
        })
        .catch((err) => {
          error('Error al verificar el usuario');
        });
    });
  },

  registro: async (usuario, clave, clave2) => {
    return new Promise((exito, error) => {
      if (clave === clave2) {
        // Insertar el nuevo usuario en la base de datos
        consultas.insert({ nombre: usuario, clave: clave })
          .then(() => {
            exito('Te has registrado correctamente');
          })
          .catch(() => {
            error('No te has podido registrar');
          });
      } else {
        error('Las contraseñas no coinciden');
      }
    });
  },
};

export default useAuth;
