import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import ProfilePicture from "./ProfilePicture";

export default function List({
  type,
  description,
  user,
  style,
  time,
  room,
  image,
}) {
  const navigation = useNavigation();
  const profilePictureSize = type === "Contacts" ? 50 : 65;
  const containerHeight = type === "Contacts" ? 55 : 80;

  return (
    <TouchableOpacity
      style={{ height: containerHeight,  ...style }}
      onPress={() => navigation.navigate("Chat", { user, room, image })}
    >
      <Grid style={styles.grid}>
        <Col
          style={[styles.profilePictureContainer, { width:profilePictureSize, height:profilePictureSize, borderRadius:profilePictureSize}]}
        >
          <ProfilePicture user={user} width={profilePictureSize} height={profilePictureSize} resize='cover' />
        </Col>
        <Col style={styles.textContainer}>
          <Row style={styles.nameAndDateContainer}>
            <Col>
              <Text style={styles.nameText}>
                {user.contactName || user.displayName}
              </Text>
            </Col>
            {time && (
              <Col style={styles.dateContainer}>
                <Text style={styles.dateText}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={styles.lastMessageContainer}>
              <Text style={styles.lastMessageText}>
                {description}
              </Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  grid: {
    maxHeight: 80,
  },
  profilePictureContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    overflow: "hidden",
  },
  textContainer: {
    marginLeft: 10,
  },
  nameAndDateContainer: {
    alignItems: "center",
  },
  nameText: {
    fontWeight: "bold", 
    fontSize: 16, 
    color: '#1F2D59',
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  dateText: {
    color: '#1F2D59', 
    fontSize: 11,
  },
  lastMessageContainer: {
    marginTop: -5,
  },
  lastMessageText: {
    color: '#1F2D59', 
    fontSize: 13,
  },
})