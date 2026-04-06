# Weekly Hits

A web application for managing and displaying weekly songs and artists. Built with Django REST Framework for the backend and React with TypeScript for the frontend.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [User Roles](#user-roles)

## Features

- **Public Access**: Browse song catalog with genre filtering and search
- **Top 10 Rankings**: View statistics of the highest-rated songs
- **User Authentication**: JWT-based login and registration
- **Role-Based Access**:
  - Musical Programmers can create, edit, and delete their own songs and artists
  - Administrators have full control over users, songs, and artists

## Installation

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL (running on port 5497)

### Clone the Repository

```bash
git clone https://github.com/RobTov/weekly-hits.git
cd weekly-hits
```

### Backend Setup

1. Install Python dependencies:
   ```bash
   make install
   # or
   pip install -r requirements.txt
   ```

2. Apply database migrations:
   ```bash
   make migrate
   ```

3. Seed the database with sample data:
   ```bash
   make seed
   ```

4. Create an admin user:
   ```bash
   make superuser
   ```

5. Start the backend server:
   ```bash
   make run
   ```

The API will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the web directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

The frontend will be available at `http://localhost:3000`

## Usage

### Makefile Commands

| Command | Description |
|---------|-------------|
| `make install` | Install Python dependencies |
| `make run` | Start Django development server |
| `make migrate` | Apply database migrations |
| `make makemigrations` | Create new migrations |
| `make seed` | Populate database with sample data |
| `make shell` | Open Django shell |
| `make superuser` | Create a superuser |
| `make run-frontend` | Start React frontend |
| `make test` | Run tests |

### Default Admin Credentials

After running `make seed` and `make superuser`:

- **Username**: admin
- **Password**: (set by you during superuser creation)

### User Roles

| Role | Permissions |
|------|-------------|
| **Unauthenticated** | View songs catalog, view top 10 rankings |
| **Musical Programmer** | All public access + create/edit/delete own songs and artists |
| **Administrator** | All permissions + manage users |

## Project Structure

```
weekly-hits/
├── accounts/           # User authentication app
├── artists/           # Artists management app
├── songs/             # Songs management app
├── weekly_radio_hits/ # Django project settings
├── web/               # React frontend
│   ├── src/
│   │   ├── pages/     # Page components
│   │   ├── store/    # Zustand stores
│   │   ├── services/ # API services
│   │   ├── types/    # TypeScript types
│   │   └── components/ # Shared components
├── seed_data.py       # Database seeding script
├── requirements.txt   # Python dependencies
└── Makefile          # Development commands
```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/refresh/` - Refresh JWT token
- `POST /api/auth/logout/` - Logout
- `GET/PUT /api/auth/profile/` - User profile

### Songs
- `GET /api/songs/` - List all songs
- `POST /api/songs/` - Create song (authenticated)
- `GET /api/songs/{id}/` - Get song details
- `PUT /api/songs/{id}/` - Update song (owner/admin)
- `DELETE /api/songs/{id}/` - Delete song (owner/admin)
- `GET /api/top-songs/` - List top 10 songs

### Artists
- `GET /api/artists/` - List all artists
- `POST /api/artists/` - Create artist (authenticated)
- `GET /api/artists/{id}/` - Get artist details
- `PUT /api/artists/{id}/` - Update artist (authenticated)
- `DELETE /api/artists/{id}/` - Delete artist (authenticated)

### Users (Admin only)
- `GET /api/users/` - List all users
- `POST /api/users/` - Create user
- `GET /api/users/{id}/` - Get user details
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user

## License

CC0 This project is for educational purposes.
