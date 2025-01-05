import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#303030",
  },

  // Login

    loginLayout: {
      alignItems: "center",
      marginTop: 120,
    },
    h1Login: {
      color: "#f8ad2a",
      fontSize: 45,
      marginBottom: 60,
      fontWeight: "700",
      letterSpacing: 2,
      fontStyle: "italic",
    },
    login: {
      width: "90%",
      height: 'auto',
      margin: 'auto',
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#f8ad2a",
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 20,
    },
    h2Login: {
      fontSize: 20,
      fontStyle: "italic",
      color: "#f8ad2a",
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
      backgroundColor: "#f8ad2a",
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
      width: "70%",
      backgroundColor: "white",
      padding: 5,
      textAlign: "center",
      borderRadius: 3,
      borderWidth: 1,
      borderColor: "#f8ad2a",
      marginBottom: 20,
    },
    textoRegistrarse: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "500",
      fontStyle: "italic",
      color: "#f8ad2a",
    },
    regularCard: {
      position: 'absolute',
      zIndex: 1,
    },
    flippedCard: {
      backfaceVisibility: 'hidden',
      zIndex: 2,
    },

  // Menú

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    width: "80%",
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: "column",
  },
  cabeceraMenu: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cabeceraIcono: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 2,
  },
  cabeceraUsuario: {
    color: "white",
    marginLeft: 20,
    fontWeight: "500",
    fontSize: 22,
    flex: 1,
  },
  cerrarMenu: {
    padding: 5,
  },
  linksMenu: {
    flexDirection: "column",
    paddingVertical: 20,
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
      width: "90%",
      height: "15%",
      backgroundColor: "#f8ad2a",
      padding: 15,
      marginVertical: 15,
      borderWidth: 1.5,
      borderColor: "black",
      borderRadius: 5,
    },
    textoHome: {
      fontWeight: "500",
      fontSize: 16,
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,      
    },

  // datosUsuario

    perfilLayout: {
      backgroundColor: "white",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: 10,      
    },
});

export { styles };