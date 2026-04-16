# Academic Change Management System (CMS)

A full-stack application for managing academic change requests (Internal Marks, Exam Dates, Venues, and Revaluation).

## 🚀 Features
- **Faculty Dashboard**: Submit and track change requests.
- **HOD Dashboard**: Review and approve/reject requests.
- **Academic Dashboard**: Implement approved changes.
- **Student View**: Track requests submitted on their behalf.
- **Analytics**: Visualize request trends and status distributions.
- **Real-time Updates**: Status changes reflect immediately.
- **Auto-Expiry**: Requests pending for more than 48 hours are automatically marked as expired.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, Framer Motion (motion/react).
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Charts**: Recharts.

## 📦 Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### 2. Clone and Install
```bash
# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGODB_URI="mongodb://localhost:27017/cms"
PORT=3000
```

### 4. Run Locally
```bash
# Development mode (Frontend + Backend)
npm run dev
```

### 5. Build for Production
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## 🐳 Docker Deployment
You can also deploy using Docker:
```bash
# Build the image
docker build -t academic-cms .

# Run the container
docker run -p 3000:3000 academic-cms
```

## 🚀 Vercel Deployment

This project is configured for easy deployment on Vercel.

1.  **Push your code to GitHub.**
2.  **Connect your repository to Vercel.**
3.  **Configure Environment Variables:**
    *   `MONGODB_URI`: Your MongoDB Atlas connection string.
    *   `NODE_ENV`: `production`
4.  **Deploy!**

The `vercel.json` file handles the routing and build process automatically.

## 🔑 Test Credentials
The database is automatically seeded with these users on the first run:
- **Faculty**: `faculty@gmail.com` / `abi123`
- **HOD**: `hod@gmail.com` / `abi123`
- **Academic**: `academic@gmail.com` / `abi123`
- **Student**: `student@gmail.com` / `abi123`
- **Student 2**: `student2@gmail.com` / `abi123`
- **Faculty 2**: `faculty2@gmail.com` / `abi123`

## ⚠️ Deployment Considerations
To ensure a smooth deployment without errors, keep the following in mind:
1.  **MongoDB URI**: You **MUST** provide a real MongoDB connection string (like MongoDB Atlas) in your production environment variables. The app will not start in production without a valid `MONGODB_URI`.
2.  **Environment Variables**: Ensure `NODE_ENV=production` is set in your hosting platform.
3.  **Port**: The app listens on the port specified by the `PORT` environment variable (defaulting to 3000). Most cloud providers set this automatically.
4.  **Build Step**: Make sure `npm run build` is executed before starting the server so the `dist` folder is populated.

## 📄 License
MIT
