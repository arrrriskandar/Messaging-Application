import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

export default function CreateChatIcon({}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Contacts')}
      style={styles.createIcon}
    >
      <Ionicons
        name="create"
        size={50}
        color="#1F2D59"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  createIcon: {
    position: "absolute",
    right: 25,
    bottom: 25,
    alignItems: "center",
    justifyContent: "center",
  }
})