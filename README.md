# React Native Chat App

## Project Overview

### Objective
The project aims to develop a mobile chat application using React Native, providing users with a seamless chat interface along with the ability to share images and locations. This achievement project aligns with the growing trend of mobile-centric tasks, acknowledging the convenience and prevalence of mobile usage for various daily activities.

### Key Features

#### User Configuration
The app features a user-friendly setup allowing users to enter their name and choose a background color for the chat screen before joining conversations.

#### Chat Interface
The primary page displays ongoing conversations, accompanied by an input field and submit button for easy interaction. The chat interface leverages the Gifted Chat library, ensuring a smooth and intuitive user experience.

#### Additional Communication Features
To enhance user interaction, the chat incorporates two additional communication features: image sharing and location data transmission.

##### Image Sharing
Users can seamlessly pick and send images from their device's image library, as well as capture new pictures using the device's camera app. All images are stored securely in Firebase Cloud Storage.

##### Location Data
The app enables users to share their location data through a map view within the chat interface. This feature enhances real-time communication, allowing users to convey their geographical context effortlessly.

#### Data Storage
The application ensures data persistence both online and offline. Chat conversations are stored in Google Firestore Database, offering reliable and scalable storage solutions.

### Technical Requirements

#### Technology Stack
- React Native: The entire app is developed using React Native, facilitating a single codebase for both Android and iOS platforms.
- Expo: The development framework of choice, simplifying the development process and enhancing project efficiency.
- Google Firestore Database: Responsible for storing chat conversations securely in the cloud.
- Google Firebase Authentication: Users are authenticated anonymously via Google Firebase, ensuring a secure and seamless login process.

#### Styling
The app adheres to the provided screen design, ensuring a visually cohesive and aesthetically pleasing user interface.

#### Codebase Comments
To enhance code readability and maintainability, the app's codebase is well-commented, providing insights into the functionality and logic behind each segment.

## Setup Instructions

### Development Environment

1. Install Node.js: [Node.js](https://nodejs.org/)

2. Install Expo CLI globally:

    ```bash
    npm install -g expo-cli
    ```

3. Install Expo Go on your mobile device from the App Store (for iOS) or Google Play (for Android).

4. Clone the repository:

    ```bash
    git clone [<repository-url>](https://github.com/Cameron8325/ChatApp)
    cd react-native-chat-app
    ```

5. Install dependencies:

    ```bash
    npm install
    ```

6. Start the Expo development server:

    ```bash
    npm start
    ```

7. Scan the QR code using the Expo Go app on your mobile device to view the app.

### Database Configuration

1. Set up a project in Firebase: [Firebase Console](https://console.firebase.google.com/)

2. Create a Firestore Database and note the credentials.

3. Replace the placeholder values in the `firebaseConfig` object in `App.js` with your Firebase project credentials.

### Necessary Libraries

1. Install required libraries using npm:

    ```bash
    npm install @react-native-community/netinfo @react-navigation/native @react-navigation/native-stack firebase react-native-gifted-chat react-native-maps expo-image-picker expo-location expo-media-library
    ```

## Conclusion
This React Native chat app stands as a testament to the proficiency in JavaScript mobile development, utilizing modern technologies to create a feature-rich and user-centric application.

## Contributing

Your contributions are invaluable in enriching my knowledge and fostering growth. I wholeheartedly invite your input and suggestions to enhance this project. Whether it's sharing insights, offering feedback, or proposing improvements, your collaboration is pivotal. Let's embark on this journey together, advancing our expertise in the realm of web development.

---
