import React from "react";
import { Image } from "react-native";

export default function ProfilePicture({ width, height, user, resize }) {
  return (
    <Image
      style={{
        width: width,
        height: height,
      }}
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require("../assets/icon-square.png")
      }
      resizeMode={resize}
    />
  );
}