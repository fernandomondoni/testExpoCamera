import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Camera as ExpoCamera } from "expo-camera";

const Camera: any = ExpoCamera;

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const cameraRef = useRef<typeof ExpoCamera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permissions...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Camera</Text>
      <Camera
        ref={cameraRef}
        style={{ width: 200, height: 200 }}
        type={"back"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
