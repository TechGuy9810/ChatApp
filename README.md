# Chat Web App (MERN Stack)

This is a full-featured **real-time chat application** built using the **MERN** (MongoDB, Express, React, Node.js) stack. Users can chat with others in real-time, search for users, send messages with **emojis and images**, update profile pictures, and download photos and files.

## Features

- **Real-time Messaging**: Chat with other users in real-time using **Socket.IO**.
- **User Search**: Quickly find and chat with other users.
- **Send Emojis and Images**: Make conversations more fun with emojis and the ability to send images.
- **Profile Management**: Update your profile picture directly from the app.
- **File Upload & Download**: Upload images and files to share in chat and download any shared media.
- **Media Storage**: Images are stored in **Cloudinary** for optimized performance.
  
## Tech Stack

- **Frontend**: 
  - **React.js**
  - **Context API**
  - **Zustand** for state management
  - **FontAwesome** for icons
- **Backend**: 
  - **Node.js**
  - **Express.js**
  - **MongoDB** for the database
  - **Multer** for handling image/file uploads
  - **Cloudinary** for image storage
- **Real-time Communication**: **Socket.IO** for seamless real-time chat functionality.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-web-app.git
   cd chat-web-app
# For client
cd client
npm install

# For server
cd ../server
npm i express

MONGO_URI=your_mongo_uri
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name

## In the server directory
npm start

## In the client directory (in a new terminal)
npm run dev
