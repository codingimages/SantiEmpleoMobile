import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AsyncStorage } from "react-native";
import RadioGroup, { Radio } from "react-native-radio-input";
import Axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import { Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import HTML from "react-native-render-html";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

const JobsPage = (props) => {
  // state
  const [empleosData, setEmpleosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // state for the individual job and application form
  const [empleoDetail, setEmpleoDetail] = useState({});
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [ingles, setIngles] = useState("");
  const [transportacion, setTransportacion] = useState("");

  // fetch empleos data function
  useEffect(() => {
    const getEmpleosData = async () => {
      const response = await fetch("http://www.santiempleo.com/api/empleos/");
      const data = await response.json();
      setIsLoading(false);
      setEmpleosData(data);
    };
    getEmpleosData();
  }, []);

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObject) => {
        if (statusObject.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObject;
      })
      .then((statusObject) => {
        if (statusObject.status !== "granted") {
          return;
        }
      });
    // const token = Notifications.getExpoPushTokenAsync().then((data) => {
    //   console.log(data);
    //   console.log(token);
    // });
    // console.log(token);
  }, []);

  useEffect(() => {
    const checkNotificationStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("NOTIFICATION_STATUS");
        // console.log(value);
        if (value === null) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Recordatorio de empleos",
              body: "Verifica los empleos que tenemos disponible",
              autoDismiss: true,
              vibrate: true,
            },
            trigger: {
              seconds: 604800,
              repeats: true,
            },
          });
          const value = await AsyncStorage.setItem(
            "NOTIFICATION_STATUS",
            "enviada"
          );
          return value;
        }
        // else if (Platform.OS === "ios" && value === "enviada") {
        //   Notifications.scheduleNotificationAsync({
        //     content: {
        //       title: "Recordatorio de empleos",
        //       body: "Verifica los empleos que tenemos disponible",
        //       autoDismiss: true,
        //       vibrate: true,
        //     },
        //     trigger: {
        //       seconds: 61,
        //       repeats: true,
        //     },
        //   });
        // }
      } catch (error) {
        console.log(error.message);
      }
    };

    checkNotificationStatus();
  });

  useEffect(() => {
    const foregroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);
      }
    );

    const backgroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const makeModalVisible = (empleoDetail) => {
    setModalVisible(true);
    setEmpleoDetail(empleoDetail);
  };

  const makeModalUnvisible = () => {
    setModalVisible(false);
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
      };
    },
  });

  // function for checkbox
  const checkTransportacion = (value) => {
    value = value;
    setTransportacion(value);
  };

  const checkIngles = (value) => {
    value = value;
    setIngles(value);
  };

  // aplicar para el trabajo
  const submitApplication = async () => {
    const data = {
      nombre: nombre,
      ciudad: ciudad,
      number: number,
      email: email,
      transportacion: transportacion,
      ingles: ingles,
    };

    console.log(data);
    try {
      if (
        nombre === "" ||
        ciudad === "" ||
        number === 0 ||
        email === "" ||
        transportacion === "" ||
        ingles === ""
      ) {
        Alert.alert(
          "Aplicación incompleta",
          "Favor de llenar todos los blancos",
          [
            {
              text: "Intentar nuevamente",
              onPress: () => props.navigation.navigate("Jobs"),
              style: "error",
            },
          ]
        );
        return;
      }
      Axios.post(
        `https://www.santiempleo.com/vacante/${empleoDetail.url}`,
        data
      );
      Alert.alert("Aplicación exitosa", "Gracias por su tiempo para aplicar", [
        {
          text: "Ir a inicio",
          onPress: () => props.navigation.navigate("Home"),
          style: "success",
        },
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onHandleNombre = (e) => {
    setNombre(e);
  };

  const onHandleCiudad = (e) => {
    setCiudad(e);
  };

  const onHandleEmail = (e) => {
    setEmail(e);
  };

  const onHandleNumber = (e) => {
    setNumber(e);
  };

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
        <View style={styles.jobsHeader}>
          <Text style={styles.jobsHeaderTitle}>Selecciona un empleo</Text>
          <Text style={styles.jobsHeaderSubTitle}>para ver los detalles</Text>
        </View>
        {empleosData.map((empleo) => {
          return (
            <View style={styles.jobsListContainer} key={empleo._id}>
              <View style={styles.jobInfo}>
                {/* title */}
                <View style={styles.titleBackGround}>
                  <Text style={styles.jobTitle}>{empleo.titulo}</Text>
                </View>

                {/* summary */}

                <View style={styles.summaryContainer}>
                  <Icon style={styles.summaryIconStyle} name="location-arrow" />
                  <Text style={styles.jobSummary}>
                    Ubicado en {empleo.ubicacion}
                  </Text>
                </View>

                <View style={styles.summaryContainer}>
                  <Icon style={styles.summaryIconStyle} name="briefcase" />
                  <Text style={styles.jobSummary}>
                    Trabajo en {empleo.tipo}
                  </Text>
                </View>

                <View style={styles.summaryContainer}>
                  <Icon style={styles.summaryIconStyle} name="car" />
                  <Text style={styles.jobSummary}>
                    Transportacion {empleo.transportacion}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    return makeModalVisible(empleo);
                  }}
                  style={styles.jobLinkContainer}
                >
                  <Text style={styles.jobLink}>Ver Detalles</Text>
                </TouchableOpacity>
              </View>

              <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
              >
                {/* titulo y cierre de modal */}
                <View style={styles.empleoDetailClose}>
                  <TouchableOpacity
                    onPress={() => {
                      makeModalUnvisible();
                    }}
                  >
                    <Icon name="times" style={styles.empleoCloseIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.titleBackGroundModal}>
                  <Text style={styles.jobTitle}>{empleoDetail.titulo}</Text>
                </View>
                <ScrollView>
                  <View>
                    <View style={styles.jobInfoModal}>
                      {/* location */}
                      <View style={styles.summaryContainer}>
                        <Icon
                          style={styles.summaryIconStyle}
                          name="location-arrow"
                        />
                        <Text style={styles.jobSummary}>
                          Ubicado en {empleoDetail.ubicacion}
                        </Text>
                      </View>
                      {/* lugar */}
                      <View style={styles.summaryContainer}>
                        <Icon
                          style={styles.summaryIconStyle}
                          name="briefcase"
                        />
                        <Text style={styles.jobSummary}>
                          Trabajo en {empleoDetail.tipo}
                        </Text>
                      </View>
                      {/* transportacion */}
                      <View style={styles.summaryContainer}>
                        <Icon style={styles.summaryIconStyle} name="car" />
                        <Text style={styles.jobSummary}>
                          Transportacion {empleoDetail.transportacion}
                        </Text>
                      </View>

                      {/* descripcionmobile */}
                      <View style={styles.detailsInformation}>
                        <HTML html={empleoDetail.descripcion} />
                      </View>

                      {/* Requisitos */}
                      <Text style={styles.requisitoTitle}>Requisito(s):</Text>
                      {empleoDetail.skills
                        ? Object.values(empleoDetail.skills).map(
                            (requisito, index) => (
                              <View key={index} style={styles.requisito}>
                                <Icon
                                  style={styles.summaryIconStyle}
                                  name="check"
                                />
                                <Text key={requisito}>{requisito}</Text>
                              </View>
                            )
                          )
                        : null}

                      <View style={styles.summaryContainerRed}>
                        <Text style={styles.jobSummaryRed}>
                          Si usted entiende que llena todos los requisitos llene
                          el siguiente formulario y aplique para el empleo. Le
                          estaremos regresando con una llamada muy pronto.
                        </Text>
                      </View>

                      {/* input forms */}
                      <View style={{ marginBottom: 300 }}>
                        <TextInput
                          style={styles.textInputStyle}
                          type="text"
                          name="nombre"
                          placeholder="Tu nombre"
                          onChangeText={onHandleNombre}
                        />
                        <TextInput
                          style={styles.textInputStyle}
                          type="text"
                          name="ciudad"
                          placeholder="Ciudad"
                          onChangeText={onHandleCiudad}
                        />
                        <TextInput
                          style={styles.textInputStyle}
                          type="text"
                          name="email"
                          placeholder="Correo Electrónico"
                          onChangeText={onHandleEmail}
                        />
                        <TextInput
                          style={styles.textInputStyle}
                          type="text"
                          name="number"
                          placeholder="Teléfono"
                          onChangeText={onHandleNumber}
                        />
                        <View style={styles.checkBoxInput}>
                          <Text>Hablas Inglés?</Text>
                          <RadioGroup getChecked={checkIngles}>
                            <Radio label={"Si"} name="ingles" value={"Si"} />
                            <Radio label={"No"} name="ingles" value={"No"} />
                          </RadioGroup>

                          <Text>Tienes Transportación?</Text>
                          <RadioGroup getChecked={checkTransportacion}>
                            <Radio
                              label={"Si"}
                              name="transportacion"
                              value={"Si"}
                            />
                            <Radio
                              label={"No"}
                              name="transportacion"
                              value={"No"}
                            />
                          </RadioGroup>
                        </View>

                        {/* button */}
                        <TouchableOpacity
                          style={styles.buttonContainer}
                          onPress={submitApplication}
                        >
                          <Text style={styles.aplicarBtn}>Aplicar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </Modal>
            </View>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

JobsPage.navigationOptions = {
  headerTitle: "Empleos Disponibles",
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

  jobsHeader: {
    padding: 8,
    marginHorizontal: 8,
    marginTop: 24,
    marginBottom: 8,
    borderRadius: 8,
  },

  jobsHeaderTitle: {
    fontSize: 24,
    textAlign: "center",
    color: "#0a578b",
  },

  jobsHeaderSubTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#0a578b",
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

  jobInfoModal: {
    width: "100%",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  titleBackGround: {
    width: "100%",
    padding: 8,
    backgroundColor: "#0a578b",
    marginBottom: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  titleBackGroundModal: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 4,
    backgroundColor: "#0a578b",
    marginBottom: 8,
    borderRadius: 8,
  },

  jobTitle: {
    textAlign: "center",
    fontSize: 24,
    color: "#ffffff",
    marginVertical: 8,
  },

  summaryContainer: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  summaryContainerRed: {
    margin: 8,
    padding: 8,
    borderRadius: 8,
    marginBottom: 32,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },

  jobLink: {
    marginVertical: 8,
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#ffffff",
  },

  jobLinkContainer: {
    backgroundColor: "#F26221",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 16,
    borderRadius: 4,
  },

  detailsInformation: {
    padding: 8,
    marginTop: 16,
  },

  jobSummary: {
    marginVertical: 4,
    fontSize: 16,
    color: "#000000",
  },

  jobSummaryRed: {
    marginVertical: 4,
    fontSize: 16,
    color: "#ffffff",
  },

  summaryIconStyle: {
    color: "#0a578b",
    fontSize: 18,
    marginRight: 18,
  },

  summaryIconStyleWhite: {
    color: "#ffffff",
    fontSize: 18,
    marginRight: 18,
  },

  empleoDetailClose: {
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 0 : 25,
  },

  empleoCloseIcon: {
    color: "red",
    fontSize: 24,
    marginBottom: 16,
    marginTop: Platform.OS === "android" ? 16 : 0,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f26321",
    padding: 8,
    borderRadius: 16,
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

  requisitoContainer: {
    padding: 8,
  },

  requisitoTitle: {
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 8,
  },

  requisito: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginBottom: 8,
  },

  textInputStyle: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    borderColor: "#0a578b",
    borderWidth: 1,
  },

  checkBoxInput: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default JobsPage;
