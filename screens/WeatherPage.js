import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch news data function
  useEffect(() => {
    const getNewsData = async () => {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Maryland,us&units=imperial&lang=es&appid=ef3d5ce1ca001730ab6a7977f7012edd"
      );

      const data = await response.json();
      setWeatherData(data);
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
    <View style={styles.mainBackgroundColor}>
      <Text style={styles.weatherCity}>{weatherData.name}</Text>
      <Text style={styles.weatherTemp}>
        {Math.floor(weatherData.main.temp)}
      </Text>
      <Text style={styles.degree}>Grados</Text>
      <Image
        style={styles.weatherImg}
        source={{
          uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
        }}
      />
      <Text style={styles.weatherDesc}>
        {weatherData.weather[0].description}
      </Text>
    </View>
  );
};

WeatherPage.navigationOptions = {
  headerTitle: "El Tiempo",
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mainBackgroundColor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efefef",
  },
  weatherCity: {
    fontSize: 48,
    color: "#007bff",
  },
  weatherTemp: {
    fontSize: 112,
    color: "#007bff",
  },
  degree: {
    textTransform: "uppercase",
    color: "#007bff",
  },
  weatherDesc: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#007bff",
  },
  weatherImg: {
    height: 170,
    width: 170,
  },
});

export default WeatherPage;
