import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#303030",
  },

  // Login

    viewLogin: {
      alignItems: "center",
      marginTop: 120,
    },
    h1Login: {
      color: "red",
      fontSize: 45,
      marginBottom: 60,
      fontWeight: "700",
      letterSpacing: 2,
      fontStyle: "italic",
    },
    login: {
      width: 320,
      height: 'auto',
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "red",
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 20,
    },
    h2Login: {
      fontSize: 20,
      fontStyle: "italic",
      color: "red",
      fontWeight: "500",
      marginTop: 20,
    },
    inputsLogin: {
      borderBottomWidth: 1,
      borderBottomColor: "grey",
      paddingTop: 5,
      paddingLeft: 5,
      fontSize: 18,
      fontStyle: "italic",
    },
    botonIniciarSesion: {
      backgroundColor: "red",
      marginTop: 40,
      padding: 5,
      textAlign: "center",
      borderRadius: 3,
    },
    textoIniciarSesion: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "500",
      fontStyle: "italic",
      color: "white",
    },
    botonRegistrarse: {
      width: 200,
      backgroundColor: "white",
      padding: 5,
      textAlign: "center",
      borderRadius: 3,
      borderWidth: 1,
      borderColor: "red",
      marginBottom: 20,
    },
    textoRegistrarse: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "500",
      fontStyle: "italic",
      color: "red",
    },

  // Menú

    menu: {
      position: "absolute",
      width: "80%",
      height: "120%",
      backgroundColor: "black",
      zIndex: 10,
      paddingVertical: 60,
      paddingHorizontal: 25,
      flexDirection: "column",
    },
    cabeceraMenu: {
      flexDirection: "row",
      alignItems: "center",
    },
    cabeceraIcono: {
      backgroundColor: "white",
      borderRadius: 50,
      padding: 2,
    },
    cabeceraUsuario: {
      color: "white",
      margin: "auto",
      fontWeight: "500",
      fontSize: 22,
    },
    cerrarMenu: {},
    linksMenu: {
      flexDirection: "column",
      paddingVertical: 40,
    },
    cajaLinksMenu: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "white",
    },
    linkMenu: {
      padding: 20,
      color: "white",
      fontSize: 15,
    },

  // Home

    homeLayout: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: 10,
    },
    homeLayouts: {
      width: "45%",
      height: "20%",
      backgroundColor: "red",
      padding: 15,
      marginVertical: 15,
      borderWidth: 1.5,
      borderColor: "black",
      borderRadius: 5,
    },
    textoHome: {
      fontWeight: "500",
      fontSize: 15,
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,      
    }
});

export { styles };