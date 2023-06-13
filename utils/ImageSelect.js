import * as ImagePicker from "expo-image-picker";


export async function askForPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
}

export async function pickImageFromCamera() {
  let result = ImagePicker.launchCameraAsync();
  return result;
}

export async function pickImageFromLibrary() {
  let result = ImagePicker.launchImageLibraryAsync();
  return result;
}
