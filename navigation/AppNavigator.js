import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import HomePage from "../screens/HomePage";
import NewsPage from "../screens/NewsPage";
import WeatherPage from "../screens/WeatherPage";
import NotesPage from "../screens/NotesPage";
import JobsPage from "../screens/JobsPage";
import AboutPage from "../screens/AboutPage";

const AppNavigation = createStackNavigator(
  {
    Home: HomePage,
    News: NewsPage,
    Weather: WeatherPage,
    Notes: NotesPage,
    Jobs: JobsPage,
    About: AboutPage,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0a578b",
      },
      headerTintColor: "#ffffff",
    },
  }
);

export default createAppContainer(AppNavigation);
