# MERN Stack Developer Portfolio

A stunning, responsive portfolio website for MERN stack developers featuring modern design, smooth animations, and a clean code architecture.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with perfect display on all devices
- **Dark/Light Mode**: Theme toggle with user preference persistence
- **Stunning Animations**: Smooth transitions and scroll animations using Framer Motion
- **Interactive UI**: Modern, clean interface with intuitive navigation
- **Contact Form**: Backend integration with email notifications
- **SEO Optimized**: Meta tags and performance optimizations
- **Full Stack**: Complete MERN (MongoDB, Express, React, Node.js) implementation

## 🚀 Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API requests

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **TypeScript**
- **Nodemailer** for email functionality
- **JWT** authentication
- **Helmet**, **Cors**, **Rate Limiting** for security

## 📋 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mern-portfolio.git
cd mern-portfolio
```

2. Install dependencies for both frontend and backend
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Setup environment variables
- Create `.env` file in the server directory based on `.env.example`
- Create `.env` file in the client directory based on `.env.example`

4. Start development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend server (in a new terminal)
cd client
npm run dev
```

5. Build for production
```bash
# Build frontend
cd client
npm run build

# Build backend
cd ../server
npm run build
```

## 🏗️ Project Structure

```
portfolio/
├── client/             # Frontend React application
│   ├── public/         # Static files
│   └── src/
│       ├── assets/     # Images, fonts, etc.
│       ├── components/ # Reusable components
│       ├── context/    # Context API providers
│       ├── hooks/      # Custom React hooks
│       ├── pages/      # Page components
│       └── utils/      # Utility functions
├── server/             # Backend Node.js application
│   ├── src/
│   │   ├── config/     # Configuration files
│   │   ├── controllers/# Route controllers
│   │   ├── middlewares/# Express middlewares
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # Express routes
│   │   └── utils/      # Utility functions
│   └── dist/           # Compiled TypeScript
└── README.md           # Project documentation
```

## 🔧 Customization

1. **Personal Information**: Update the personal details in `client/src/data/` directory
2. **Projects**: Modify the project information in `client/src/data/projects.ts`
3. **Theme**: Customize colors in `client/tailwind.config.js`
4. **Content**: Edit section content in their respective components

## 📝 License

This project is licensed under the MIT License

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/) 