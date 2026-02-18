# ArtLive – Frontend

![React](https://img.shields.io/badge/react-18.x-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-5.x-646CFF?logo=vite&logoColor=white)
![Mapbox](https://img.shields.io/badge/mapbox-GL_JS-000000?logo=mapbox&logoColor=white)
![JWT](https://img.shields.io/badge/auth-JWT-blue)

**ArtLive Frontend** is the client-side application for ArtLive, a creative workshop discovery platform where instructors host art experiences and students explore, register, and connect through creativity.


## Description

ArtLive is designed to help people discover inspiring art workshops near them.

The frontend application provides:
* Interactive workshop discovery
* Real-time filtering by category and level
* Map-based visualization using Mapbox
* Secure authentication with JWT
* Role-based UI rendering (Instructor / Student)
* Responsive design optimized for mobile and desktop

The UI follows a soft, artistic aesthetic inspired by watercolor textures and natural tones to reflect the creative spirit of the platform.


## Project Links

- **Frontend Repository:**  
  [View the ArtLive Frontend repository on GitHub](https://github.com/Gabyara237/artlive-frontend) 

- **Backend Repository:**  
  [View the ArtLive Backend repository on GitHub](https://github.com/Gabyara237/artlive-backend) 

- **Project Planning (Trello):**  
  [Explore the project planning board on Trello](https://trello.com/b/MadoMymc/project-4-artlive)

- **Deployed Application:**  
  [Visit the live ArtLive application](https://art-live.netlify.app/) 



## Application Screenshots

### Workshop Discovery
![Workshop Discovery](https://i.postimg.cc/Bqmv15Zw/Screenshot-2026-02-18-at-2-51-33-AM.png)
*Interactive workshop exploration with map visualization and dynamic filters.*

### Workshop Details
![Workshop Details](https://i.postimg.cc/52MXnfD5/Screenshot-2026-02-18-at-3-02-20-AM.png)
*Detailed workshop page with instructor info, materials, and registration options.*

### Create Workshop – Instructor View
![Create Workshop – Instructor View](https://i.postimg.cc/QtWD2TTT/Screenshot-2026-02-18-at-1-21-38-AM.png)
*Instructors can create and manage workshops with image upload and structured form inputs.*


## Core Features

### Authentication
- Sign up / Sign in
- JWT stored in localStorage
- Protected routes
- Role-based rendering (student vs instructor)

### Workshop Discovery
- View all workshops
- Search by title or instructor
- Filter by:
  - Art type (painting, drawing, sculpture, etc.)
  - Skill level (beginner, intermediate, advanced)
- Responsive layout:
  - Desktop → list + map side-by-side
  - Mobile → map on top, list below

### Interactive Map
- Mapbox integration with custom art-themed markers
- Dynamic marker icons based on workshop art type
- Marker resizing for mobile optimization
- Click markers to view workshop details
- Real-time map updates when filtering

### Instructor Features
- Create workshop with image upload
- Edit workshop details
- Delete workshops
- View all created workshops

### Student Features
- Register for workshops
- Cancel registration
- View all registered workshops
- Check registration status per workshop


## UI & Design System

- Soft textured background with artistic aesthetic
- Warm earthy color palette
- Reusable card components
- Custom styled filters
- Elegant date formatting utility
- Fully responsive navbar
- Custom workshop markers by art type


## Architecture & State Management

The frontend is structured using:
- Component-based architecture
- Reusable UI components (CardWorkshop, WorkshopsFilters, WorkshopsMap, WorkshopMarker)
- `useMemo` for optimized filtering
- `useEffect` for data fetching
- `useRef` for DOM manipulation and Mapbox instances
- Context API for user authentication state
- React Portals for custom map markers


## Technologies Used

- **React 18** – UI library
- **Vite** – build tool and dev server
- **React Router** – client-side routing
- **Mapbox GL JS** – interactive mapping
- **JWT** – authentication token management
- **CSS (Custom Styling)** – handcrafted visual design
- **Axios** – HTTP requests to backend API
- **Cloudinary** (via backend) – image handling
- **Netlify** – deployment


## Project Structure
```
artlive-frontend/
├── node_modules/
├── public/
│   ├── _redirects          # Netlify routing config
│   └── vite.svg
├── services/
│   ├── authService.js      # Authentication API calls
│   ├── userService.js      # User-related API calls
│   └── workshopService.js  # Workshop API calls
├── src/
│   ├── assets/             # Images and static assets
│   ├── components/
│   │   └── [various components]
│   ├── contexts/
│   │   └── UserContext.jsx # User authentication context
│   ├── services/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── workshopService.js
│   ├── utils/
│   │   └── formatDateTime.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env                    # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```


## Responsive Behavior

- **Desktop** → Split layout (workshop list + map side-by-side)
- **Mobile** → Map on top, workshop list below
- Marker sizes adjust dynamically based on screen size
- Navbar collapses responsively


## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Mapbox API token

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Gabyara237/artlive-frontend.git
cd artlive-frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the root directory:
```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_MAPBOX_TOKEN=your-mapbox-token
```

> **Note:** The variable name must start with `VITE_` or Vite will not expose it to the app.  
> Use your deployed backend URL in production (e.g., Render/Railway).

#### 4. Run the development server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port).


## Future Improvements

- Add workshop reviews & ratings
- Add instructor profile pages with portfolio
- Add favorites/bookmarking functionality
- Add pagination for workshop listings
- Improve map clustering for better performance with many workshops
- Add smooth animations for UI transitions
- Add automated frontend tests (React Testing Library / Vitest)
- Implement dark mode
- Add social sharing features


## Attributions

- Mapbox GL JS for interactive mapping
- Icon designs inspired by art education platforms
- UI aesthetic inspired by watercolor textures and natural tones
