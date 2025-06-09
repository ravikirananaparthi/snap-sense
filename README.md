Here's a complete `README.md` file for your **3D Avatar Motion Capture Test App** built with React Native and Expo:

---

````markdown
# 3D Avatar Motion Capture Test App

A simple React Native app using Expo that displays a live camera feed. Built with `expo-router`, `expo-camera`, and designed for further extension into 3D avatar motion capture using tools like `expo-gl`, `expo-three`, and `three`.

## 🚀 Features

- 📷 Camera feed with real-time access
- 🔁 Navigation with `expo-router`
- 📱 Tested on Android with Expo Go
- 🧩  3D rendering of Avatar Object (.glb) file 

---

## 🛠️ Setup Instructions

### 1. Install Node.js

Make sure you have **Node.js v18.x or higher** installed from [https://nodejs.org](https://nodejs.org).

### 2. Install Expo CLI

```bash
npm install -g expo-cli
```
````

Sure! Here's the Git clone snippet for your repository:

```bash
git clone https://github.com/ravikirananaparthi/snap-sense.git
cd snap-sense
```

```bash
cd <pathto-directory>\Snapsense
```

### 4. Install Dependencies

```bash
npm install
npx expo install expo-camera expo-router expo-asset expo-three expo-constants expo-font expo-linking expo-splash-screen expo-status-bar expo-system-ui expo-web-browser react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens
```

### 5. Start the App

```bash
npx expo start --clear
```

---

## 📱 Running on Device

1. Install the **Expo Go** app on your Android device.
2. Open the QR code scanner inside Expo Go.
3. Scan the QR code displayed in the terminal or browser after running `npx expo start`.
4. Grant camera permissions when prompted.

---

## 🗂️ File Structure

```
app/
├── _layout.js       # Navigation setup
├── index.js         # Home screen with “Open Camera” button
├── camera.js        # Camera screen with live feed and “Go Back” button
app.json             # App config and camera permissions
```

---

## 🧪 Troubleshooting

### ❌ Error: `type is invalid:`

Try clearing the cache and reinstalling dependencies:

```bash
rmdir /s /q node_modules package-lock.json
npm install
npx expo start --clear
```

### 📷 Camera Not Working?

- Ensure camera permissions are granted in the **Expo Go** app.
- Use a **physical Android device** (not an emulator).

---
