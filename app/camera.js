import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Canvas } from "@react-three/fiber/native";
import { Asset } from "expo-asset";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Suspense, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import usePromise from "react-promise-suspense";
const originalLog = console.log;
console.log = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("gl.pixelStorei() doesn't support this parameter")
  ) {
    return;
  }
  originalLog(...args);
};

const getGLBUri = async () => {
  const asset = Asset.fromModule(require("../assets/avatar.glb"));
  await asset.downloadAsync();
  return asset.localUri;
};

function Avatar({ position = [0, 0, -2] }) {
  const url = usePromise(getGLBUri, []); // gives  the URI
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0.7;
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} position={position} scale={0.5} />;
}

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const [error, setError] = useState(null);
  const { width, height } = Dimensions.get("window");

  // Request camera permission on mount
  useEffect(() => {
    (async () => {
      try {
        if (!permission) return;
        if (!permission.granted && permission.canAskAgain) {
          await requestPermission();
        }
      } catch (err) {
        setError("Failed to request camera permission");
        console.error(err);
      }
    })();
  }, [permission]);

  // Loading state while permission is being checked
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Checking camera permissions...</Text>
      </View>
    );
  }

  // Permission denied UI
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {error || "We need your permission to show the camera"}
        </Text>
        {permission.canAskAgain ? (
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.text}>
            Please enable camera access in your device settings.
          </Text>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF3B30" }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Camera feed with 3D avatar overlay
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type="back" ratio="16:9" />
      <View style={[styles.overlay, { width, height }]}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense>
            <Avatar />
          </Suspense>

          <OrbitControls enableZoom={false} />
        </Canvas>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    margin: 20,
  },
});
