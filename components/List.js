import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import ProfilePicture from "./ProfilePicture";

export default function ListItem({
  type,
  description,
  user,
  style,
  time,
  room,
  image,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ height: 80, ...style }}
      onPress={() => navigation.navigate("Chat", { user, room, image })}
    >
      <Grid style={{ maxHeight: 80 }}>
        <Col
          style={{ width: 80, alignItems: "center", justifyContent: "center" }}
        >
          <ProfilePicture user={user} width={type === "Contacts" ? 40 : 65} height={type === "Contacts" ? 40 : 65} resize='cover'/>
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Row style={{ alignItems: "center" }}>
            <Col>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "blue" }}
              >
                {user.contactName || user.displayName}
              </Text>
            </Col>
            {time && (
              <Col style={{ alignItems: "flex-end" }}>
                <Text style={{ color: 'blue', fontSize: 11 }}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={{ color: 'blue', fontSize: 13 }}>
                {description}
              </Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
}