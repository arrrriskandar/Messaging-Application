import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase";

export async function deleteProfilePicture(path, fName){
  try {
    const imageRef = ref(storage, `${path}/${fName}.jpeg`);
    await deleteObject(imageRef);
  }catch (e) {
    console.log(e);
  }
}