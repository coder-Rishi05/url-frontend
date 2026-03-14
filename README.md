# Url shortner (scissor-client)

A React-based web client for the Scissor URL Shortener. Supports user authentication, URL management, and an admin dashboard — built with DaisyUI and Axios.

```

├── 📁 public
│   └── 🖼️ vite.svg
├── 📁 src
│   ├── 📁 api
│   │   └── 📄 axios.js
│   ├── 📁 assets
│   │   └── 🖼️ react.svg
│   ├── 📁 components
│   │   ├── 📁 NavBar
│   │   │   └── 📄 Navbar.jsx
│   │   ├── 📁 auth
│   │   │   └── 📄 ProtectedRoute.jsx
│   │   ├── 📁 ui
│   │   │   ├── 📄 Button.jsx
│   │   │   ├── 📄 Card.jsx
│   │   │   ├── 📄 Input.jsx
│   │   │   └── 📄 Spinner.jsx
│   │   ├── 📄 CreateUrl.jsx
│   │   └── 📄 UrlTable.jsx
│   ├── 📁 context
│   │   ├── 📄 AuthContext.jsx
│   │   └── 📄 CreditContext.jsx
│   ├── 📁 hooks
│   │   └── 📄 useAuth.js
│   ├── 📁 lib
│   │   └── 📄 api.js
│   ├── 📁 pages
│   │   ├── 📄 Dashboard.jsx
│   │   └── 📄 Login.jsx
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📝 readme.md
└── 📄 vite.config.js
```

### Features

- Signup and Login with JWT-based session (managed via httpOnly cookies)
- Protected routes using a custom ProtectedRoute component
- Global auth state via React Context (AuthContext)
- Dashboard showing all created short URLs in a table
- Create new short URLs using available credits
- Deactivate URLs directly from the dashboard
- Admin panel for managing users and approving credit requests
- All API calls centralized in lib/api.js — no direct Axios calls from components

### Tech Stack

- Framework: React (Vite)
- Styling: Tailwind CSS + DaisyUI
- HTTP Client: Axios
- Routing: React Router v6
- Notifications: react-hot-toast
- Deployment: Render

