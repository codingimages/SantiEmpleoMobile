import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import "moment/locale/es";

const NewsPage = () => {
  // news state
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch news data function
  useEffect(() => {
    const getNewsData = async () => {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=empleos&language=es&apiKey=bc9471b0c90c4d1a8d41860292e59d6b"
      );

      const data = await response.json();
      setNewsData(data.articles);
      setIsLoading(false);
    };
    getNewsData();
  }, []);

  return isLoading ? (
    <View style={styles.activityIndicator}>
      <ActivityIndicator />
      <Text>Cargando...</Text>
    </View>
  ) : (
    <LinearGradient
      colors={["rgb(255, 255, 255)", "rgb(255, 255, 255)"]}
      style={styles.linearGradient}
    >
      <ScrollView style={styles.mainContainer}>
        {newsData.map((noticia) => {
          return (
            <View style={styles.jobsListContainer} key={noticia.title}>
              <View style={styles.jobInfo}>
                {/* title */}
                <View style={styles.titleBackGround}>
                  <Text style={styles.jobTitle}>{noticia.title}</Text>
                </View>

                {/* summary */}

                <View style={styles.summaryContainer}>
                  <Text style={styles.jobSummary}>{noticia.description}</Text>
                </View>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    return Linking.openURL(noticia.url);
                  }}
                >
                  <Text style={styles.aplicarBtn}>Leer Noticia Completa</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

NewsPage.navigationOptions = {
  headerTitle: "Noticias sobre empleos",
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mainContainer: {
    width: "100%",
  },

  jobsListContainer: {
    width: "100%",
    marginVertical: 8,
    padding: 16,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },

  jobInfo: {
    width: "100%",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "darkgray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  titleBackGround: {
    width: "100%",
    padding: 8,
    backgroundColor: "#0a578b",
    marginBottom: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  jobTitle: {
    textAlign: "center",
    fontSize: 24,
    color: "#ffffff",
    marginVertical: 8,
  },

  jobSummary: {
    marginVertical: 8,
    fontSize: 16,
    color: "#000000",
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f26321",
    padding: 8,
    borderRadius: 8,
    marginBottom: 32,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
  },

  aplicarBtn: {
    fontSize: 16,
    marginRight: 16,
    color: "#ffffff",
  },
});

export default NewsPage;
