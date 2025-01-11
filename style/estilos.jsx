import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "5%",
    backgroundColor: "#303030",
  },

  // Login

    loginLayout: {
      alignItems: "center",
      marginTop: "25%",
    },
    h1Login: {
      color: "#f8ad2a",
      fontSize: 45,
      marginBottom: "10%",
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
      paddingVertical: "2%",
      paddingHorizontal: "7%",
    },
    labelLogin: {
      fontSize: 20,
      fontStyle: "italic",
      color: "#f8ad2a",
      fontWeight: "500",
      marginTop: "7.5%",
    },
    inputsLogin: {
      borderBottomWidth: 1,
      borderBottomColor: "grey",
      paddingTop: "2%",
      paddingLeft: "1.5%",
      fontSize: 18,
      fontStyle: "italic",
    },
    botonIniciarSesion: {
      backgroundColor: "#f8ad2a",
      marginTop: "15%",
      padding: "1.2%",
      textAlign: "center",
      borderRadius: 5,
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
      padding: "1.2%",
      textAlign: "center",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#f8ad2a",
      marginBottom: "7.5%",
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
    paddingVertical: "7.5%",
    paddingHorizontal: "6%",
    flexDirection: "column",
  },
  cabeceraMenu: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "7.5%",
  },
  cabeceraIcono: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: "1%",
  },
  cabeceraUsuario: {
    color: "white",
    marginLeft: "7.5%",
    fontWeight: "500",
    fontSize: 22,
    flex: 1,
  },
  cerrarMenu: {
    padding: "1.2%",
  },
  linksMenu: {
    flexDirection: "column",
    paddingVertical: "7.5%",
  },
  cajaLinksMenu: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  linkMenu: {
    padding: "7.5%",
    color: "white",
    fontSize: 15,
  },

  // Home

    homeLayout: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: "2%",
    },
    homeLayouts: {
      width: "90%",
      height: "15%",
      backgroundColor: "#f8ad2a",
      padding: 15,
      marginVertical: "5%",
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
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: "2%",      
    },
    perfilLayouts: {
      width: "45%",
      marginVertical: "5%",
    },
    labelPerfil: {
      fontSize: 12,
      paddingLeft: "1.5%",
      color: "#f8ad2a",
      fontWeight: "500",
    },
    inputsPerfil: {
      borderBottomWidth: 1,
      borderBottomColor: "white",
      paddingTop: "2.%",
      paddingLeft: "1.5%",
      color: "white",
      fontSize: 18,
    },
    botonPerfil: {
      width: "90%",
      backgroundColor: "white",
      marginTop: "10%",
      padding: "1.2%",
      textAlign: "center",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#f8ad2a",
    },
    textoPerfil: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "500",
      fontStyle: "italic",
      color: "#f8ad2a",
    }
});

export { styles };