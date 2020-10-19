import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";

class ContactPage extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Image
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              marginBottom: 20,
            }}
            source={require("../assets/logo.png")}
          />
          <Text style={styles.header}>Santi Empleo</Text>
          <Text style={styles.paragraph}>
            SantiEmpleo se enorgullece en servir a la comunidad hispana por más
            de cinco años.
          </Text>
          <Text style={styles.paragraph}>
            Nuestra misión es conseguirte los empleos que buscas y que
            necesitas. Si buscas trabajo, Santi Empleo te puede ayudar.
          </Text>
          <Text style={styles.paragraph}>
            Actualmente trabajando con una variedad de empleadores y con planes
            de continua expansión. Pendiente que continuamos esforzándonos para
            servirte.
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                Platform.OS === "ios"
                  ? `telprompt:${4434106228}`
                  : `tel:${+4434106228}`
              );
            }}
          >
            <Text style={styles.paragraphblue}>
              Comunícate con nosotros aquí.
            </Text>
          </TouchableOpacity>
          <Text style={styles.paragraph}>
            Recuerda que también puedes visitar nuestra página web
            santiempleo.com
          </Text>
        </View>
      </View>
    );
  }
}

ContactPage.navigationOptions = {
  headerTitle: "Sobre nosotros",
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 8,
  },

  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },

  paragraph: {
    fontSize: 20,
    marginBottom: 16,
  },

  paragraphblue: {
    fontSize: 20,
    marginBottom: 16,
    color: "#0a578b",
  },
});

export default ContactPage;
