import { StyleSheet } from "react-native";

// Criando os estilos
const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'center', // Centraliza verticalmente
      alignItems: 'center', // Centraliza horizontalmente
      backgroundColor: '#fff',
  },

  container2: {

    flex: 1, 
    flexDirection: 'row',
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
  },

  button: {
      backgroundColor: '#F58634',
      padding: 10,
      borderRadius: 5,
  },

  button__home: {

     marginRight: -10
  },

  darkbg: {

    backgroundColor: "#333"
  }, 

  login__logomarca: {

    marginBottom: 10
  },

  login__msg:(text='none')=>( {

    fontWeight: "bold",
    fontSize: 22, 
    color: "red", 
    marginTop: 5, 
    marginBottom: 15, 
    display: text

  }), 

  login__form: {

    width: "80%"
  }, 

  login__input: {

    backgroundColor: "#fff",
    fontSize: 19, 
    padding: 7, 
    marginBottom: 15
  }, 

  login__button: {

    padding: 12, 
    backgroundColor: "#F58634", 
    alignSelf: "center", 
    borderRadius: 5
  }, 

  login__buttonText: {

    fontWeight: "bold", 
    fontSize: 22, 
    color: "#333"
  }

});

export {styles};
  