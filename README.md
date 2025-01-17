
---

# Video Calling App

This project is a **Video Calling Application** built using **WebRTC** for real-time video communication, **Socket.io** for managing real-time connections between users, **React** for the frontend, and **Node.js** with **TypeScript** for the backend server.

## Features

- Real-time video calling between users using WebRTC.
- User-friendly interface powered by React.
- Peer-to-peer communication using PeerJS for handling connections.
- Room creation and management for multiple participants using Socket.io.
- Automatic handling of media streams (audio/video).
- Scalable backend with Node.js and TypeScript.

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, TypeScript, Socket.io
- **WebRTC**: Peer-to-peer media stream handling
- **Signaling Server**: PeerJS for signaling, Socket.io for real-time communication
- **Styling**: CSS
- **Package Management**: NPM

## Prerequisites

- **Node.js** (v14+)
- **npm** or **yarn**
- Web browser supporting WebRTC (Google Chrome, Mozilla Firefox, etc.)

## Installation and Setup

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/video-calling-app.git
cd video-calling-app
```

### 2. Install dependencies:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Running the Backend

The backend server runs on **Node.js** with **Socket.io** and manages real-time communication and signaling. The PeerJS server also needs to be running.

1. **Start the PeerJS Server**:

   ```bash
   npx peerjs --port 9000 --path /myapp
   ```

2. **Start the backend server**:

   ```bash
   cd server
   npm run dev
   ```

   This will start the backend server on `http://localhost:3000`.

### 4. Running the Frontend

1. Go to the **client** folder and start the React application:

   ```bash
   cd client
   npm start
   ```

   The React app will be available at `http://localhost:3001`.

## Usage

1. Open the app in your browser by visiting `http://localhost:3001`.
2. Click on **Create Room** to generate a new room.
3. Share the room link with another user to join the call.
4. Enjoy real-time video and audio calling between peers.

## Project Structure

```bash
root/
├── client/                # React Frontend
│   ├── public/
│   ├── src/
│   ├── package.json
├── server/                # Node.js Backend
│   ├── src/
│   ├── interfaces/
│   ├── controllers/
│   ├── socketHandlers/    # Socket logic for rooms, peer connections
│   ├── package.json
├── README.md
```

### Key Files

- **Frontend (React)**:

  - `client/src/components`: React components for video calling UI.
  - `client/src/context/SocketProvider.tsx`: Handles the socket connection and peer communication.

- **Backend (Node.js)**:
  - `server/src/socketHandlers/roomHandler.ts`: Handles room creation and management via Socket.io.
  - `server/src/index.ts`: Entry point for the server.

## WebRTC Flow

- WebRTC is used for peer-to-peer video communication.
- PeerJS helps with the signaling process, allowing peers to find and connect to each other.
- When a user joins a room, Socket.io broadcasts this event, and PeerJS facilitates the WebRTC connection between participants.

## Screenshots

- Add screenshots of your application in action to give a visual understanding.

## Troubleshooting

- Ensure that **PeerJS server** is running on port `9000`. You can start it by running:

  ```bash
  npx peerjs --port 9000 --path /myapp
  ```

- Make sure your browser has the necessary permissions to access the camera and microphone.

- If you experience issues connecting to other peers, check your firewall or network settings, as WebRTC requires peer-to-peer connections that may be blocked.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **WebRTC** for enabling peer-to-peer communication.
- **PeerJS** for simplifying WebRTC signaling.
- **Socket.io** for real-time communication.
- **React** for providing a robust frontend framework.

---


