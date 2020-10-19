import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomePage = (props) => {
  return (
    <ImageBackground
      source={require("../assets/business-man.jpg")}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <LinearGradient
        colors={["rgba(10, 87, 139, .9)", "rgba(242, 99, 33, .9)"]}
        style={styles.linearGradient}
      >
        <View>
          {/* header */}
          <View style={styles.homeHeader}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 75, height: 75, resizeMode: "contain" }}
                source={require("../assets/logo.png")}
              />
            </View>
            <Text style={styles.homeTitle}>Santi Empleo</Text>
            <Text style={styles.homeSubTitle}>
              Buscas Trabajo Tenemos Trabajo
            </Text>
          </View>

          <ScrollView>
            {/* empleos tab */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Jobs")}
              style={styles.cardContainer}
            >
              <View style={styles.empleos}>
                <Text style={styles.cardsTitle}>Empleos</Text>
              </View>
              <View style={styles.cardsBodyBg}>
                <Text style={styles.bodyText}>
                  Aquí podrás ver los empleos disponibles y aplicar
                </Text>
              </View>
            </TouchableOpacity>

            {/* empleos tab */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("News")}
              style={styles.cardContainer}
            >
              <View style={styles.noticias}>
                <Text style={styles.cardsTitle}>Noticias</Text>
              </View>
              <View style={styles.cardsBodyBg}>
                <Text style={styles.bodyText}>
                  Entérate sobre lo último en noticias sobre empleos
                </Text>
              </View>
            </TouchableOpacity>

            {/* empleos tab */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Notes")}
              style={styles.cardContainer}
            >
              <View style={styles.notas}>
                <Text style={styles.cardsTitle}>Mis notas</Text>
              </View>
              <View style={styles.cardsBodyBg}>
                <Text style={styles.bodyText}>
                  Toma notas que te ayuden a recordar las tareas del trabajo
                </Text>
              </View>
            </TouchableOpacity>

            {/* el tiempo tab */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Weather")}
              style={styles.cardContainer}
            >
              <View style={styles.tiempo}>
                <Text style={styles.cardsTitle}>El Tiempo</Text>
              </View>
              <View style={styles.cardsBodyBg}>
                <Text style={styles.bodyText}>
                  Verifica al instante la información del tiempo en Maryland
                </Text>
              </View>
            </TouchableOpacity>

            {/* about tab */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("About")}
              style={styles.cardContainer}
            >
              <View style={styles.contacto}>
                <Text style={styles.cardsTitle}>Sobre Nosotros / Contacto</Text>
              </View>
              <View style={styles.cardsBodyBg}>
                <Text style={styles.bodyText}>
                  Conoce sobre Santi Empleo y nuestra misión para brindar
                  empleos a la comunidad hispana
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

HomePage.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  homeHeader: {
    marginTop: Platform.OS === "ios" ? 24 : 16,
    marginBottom: 20,
  },

  homeTitle: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },

  homeSubTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  cardContainer: {
    marginVertical: 16,
  },

  empleos: {
    backgroundColor: "rgba(242, 99, 33, .7)",
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  noticias: {
    backgroundColor: "rgba(33, 71, 242, 0.7)",
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  notas: {
    backgroundColor: "red",
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  tiempo: {
    backgroundColor: "rgba(141, 33, 242, 0.7)",
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  contacto: {
    backgroundColor: "rgba(242, 33, 68, 0.7)",
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  cardsTitle: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
  },

  cardsBodyBg: {
    backgroundColor: "rgba(255, 255, 255, .7)",
    padding: 16,
  },

  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default HomePage;
