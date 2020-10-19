import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

const NotesPage = (props) => {
  const [note, setNote] = useState("");
  const [misNotas, setMisNotas] = useState([]);

  useEffect(() => {
    if (misNotas.length) {
      try {
        const value = JSON.stringify(misNotas);
        AsyncStorage.setItem("@NOTAS", value);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [misNotas]);

  useEffect(() => {
    if (misNotas) {
      const storedValue = async () => {
        const value = await AsyncStorage.getItem("@NOTAS");
        if (value) {
          setMisNotas(JSON.parse(value));
        }
      };
      storedValue();
    }
  }, []);

  const onHandleChangeText = (e) => {
    setNote(e);
  };

  const entrarNota = () => {
    if (note === "") {
      Alert.alert("Entrada inválida", "Ingresa una nota", [
        {
          text: "Intenta nuevamente",
          onPress: () => props.navigation.navigate("Notes"),
          style: "error",
        },
      ]);
    } else {
      setMisNotas((currentNotas) => [
        ...currentNotas,
        { key: Math.random().toString(), value: note },
      ]);
      setNote("");
    }
    // AsyncStorage.clear();
  };

  const deleteItem = (noteId) => {
    Alert.alert(
      "Por favor confirma",
      "Eliminar nota",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            setMisNotas((currentNotas) => {
              return currentNotas.filter((myNote) => myNote.key !== noteId);
            }),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>Mis Notas</Text>
      </View>
      <View style={styles.inputArea}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.noteInputStyle}
          type="text"
          placeholder="Escribe una nota"
          onChangeText={onHandleChangeText}
          value={note}
        />
        {/* button */}
        <TouchableOpacity style={styles.aplicarBtn} onPress={entrarNota}>
          <Text style={styles.aplicarTxt}>Crear Nota</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={misNotas}
        renderItem={(itemData) => (
          <View style={styles.noteContainer}>
            <Text style={styles.notaItem}>{itemData.item.value}</Text>
            <TouchableOpacity>
              <Text
                style={styles.deleteNote}
                onPress={() => deleteItem(itemData.item.key)}
              >
                X
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noteHeader: {
    marginTop: 8,
    marginBottom: 8,
  },
  noteTitle: {
    color: "#0a578b",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },

  noteInputStyle: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 8,
    borderRadius: 8,
    borderColor: "#0a578b",
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
  },

  inputArea: {
    backgroundColor: "lightgray",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
  },

  botonEntrar: {
    alignItems: "center",
    width: "100%",
    padding: 8,
  },

  aplicarBtn: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 8,
    width: "90%",
    fontSize: 16,
    backgroundColor: "#0a578b",
    padding: 8,
    borderRadius: 8,
  },

  aplicarTxt: {
    textAlign: "center",
    color: "#fff",
  },

  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 12,
    borderLeftColor: "transparent",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderWidth: 1,
  },

  notaItem: {
    marginVertical: 8,
    fontSize: 16,
  },

  deleteNote: {
    color: "red",
    fontWeight: "500",
  },
});

export default NotesPage;
