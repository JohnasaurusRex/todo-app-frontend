# Task Manager Pro - Frontend (Vue.js)

A modern, responsive Vue.js frontend application for Task Manager Pro, featuring real-time task management, intuitive user interface, and seamless API integration.

## Features

### 🎨 Modern User Interface
- Clean, intuitive design with Tailwind CSS
- Responsive layout for all device sizes
- Dark mode support (optional)
- Smooth animations and transitions
- Touch-friendly mobile interface

### ⚡ Real-time Functionality
- Instant task creation and updates
- Live search with debouncing
- Real-time filtering and sorting
- Progressive web app capabilities
- Optimistic UI updates

### 🔍 Advanced User Experience
- Smart search across tasks and descriptions
- Multiple filter combinations
- Drag-and-drop task reordering (future enhancement)
- Keyboard shortcuts for power users
- Toast notifications for user feedback

### 📊 Interactive Dashboard
- Visual task statistics
- Progress tracking with charts
- Category-based organization
- Quick action buttons
- Task completion analytics

## Technology Stack

- **Vue.js 3**: Modern JavaScript framework with Composition API
- **Pinia**: State management for Vue applications
- **Vue Router**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful SVG icon library
- **Axios**: HTTP client for API communication
- **Vue Toastification**: Elegant toast notifications
- **Vite**: Fast build tool and development server

## Prerequisites

- Node.js 16.0 or higher
- npm 7.0+ or yarn 1.22+
- Modern web browser with ES6+ support

## Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd todo-app/frontend
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration
Create environment configuration file:

```bash
# Create .env.local file
touch .env.local
```

Add environment variables to `.env.local`:
```env
VUE_APP_API_URL=http://localhost:8000/api
VUE_APP_APP_NAME=Task Manager Pro
```

### 4. Development Server
```bash
# Start development server
npm run serve

# Or with yarn
yarn serve

# Application will be available at http://localhost:8080
```

### 5. Build for Production
```bash
# Create production build
npm run build

# Or with yarn
yarn build

# Built files will be in the dist/ directory
```
## Component Architecture

### Core Components

#### App.vue
Main application wrapper with global layout and navigation.

#### Views
- **HomeView.vue**: Landing page with feature highlights
- **LoginView.vue**: User authentication login form
- **RegisterView.vue**: User registration form
- **DashboardView.vue**: Main application dashboard

#### Layout Components
- **Navbar.vue**: Top navigation bar with user menu

#### Task Components
- **TaskManager.vue**: Main task management container
- **TaskList.vue**: List of tasks with filtering
- **TaskItem.vue**: Individual task display and actions
- **TaskModal.vue**: Task creation/editing modal
- **TaskFilters.vue**: Search and filter controls
- **TaskSidebar.vue**: Categories and statistics sidebar
- **CategoryModal.vue**: Category creation/editing modal

#### Common Components
- **LoadingSpinner.vue**: Reusable loading indicator
- **EmptyState.vue**: Empty state placeholder
- **ConfirmDialog.vue**: Confirmation dialog modal

### State Management (Pinia)

#### Auth Store (`stores/auth.js`)
- User authentication state
- Login/logout functionality
- Token management
- User profile data

#### Tasks Store (`stores/tasks.js`)
- Task list management
- CRUD operations
- Filtering and search state
- Task statistics

#### Categories Store (`stores/categories.js`)
- Category management
- Category-based filtering
- Category statistics

## Styling & Design System

### Tailwind CSS Configuration
The application uses Tailwind CSS for styling with custom configurations:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          // ... more shades
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### Design Tokens
- **Primary Color**: Blue (#3B82F6)
- **Success Color**: Green (#10B981)
- **Warning Color**: Yellow (#F59E0B)
- **Danger Color**: Red (#EF4444)
- **Font Family**: Inter
- **Border Radius**: 0.5rem default

## API Integration

### Service Layer
All API calls are centralized in service modules:

#### API Configuration (`services/api.js`)
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

#### Service Examples
```javascript
// services/taskService.js
export const taskService = {
  async getTasks(filters = {}) {
    const response = await api.get('/tasks', { params: filters })
    return response.data
  },

  async createTask(taskData) {
    const response = await api.post('/tasks', taskData)
    return response.data
  }
}
```

### Environment Variables for Production
```env
VUE_APP_API_URL=https://api.yourdomain.com/api
VUE_APP_APP_NAME=Task Manager Pro
NODE_ENV=production
```

## Security Considerations

- XSS protection with Vue.js sanitization
- CSRF protection through API design
- Secure token storage
- Input validation and sanitization
- Content Security Policy headers
