import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello There</Text>
        <Text>General Kenobi, you're a bold one</Text>
        <Text>Did you hear the tragedy of Darth Plagueis The Wise?</Text>
        <Text>It's over Anakin, I've the high ground</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
