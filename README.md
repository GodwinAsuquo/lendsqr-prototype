# Lendsqr Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. This project showcases a user management system with authentication, filtering, pagination, and detailed user views.

## 🚀 Features

- **Authentication System**: Secure login with form validation
- **User Management**: Comprehensive user listing with detailed profiles
- **Advanced Filtering**: Filter users by organization, username, email, phone number, status, and date
- **Pagination**: Efficient data navigation with customizable items per page
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **User Details**: In-depth user information including personal details, employment, education, and guarantor information
- **Status Management**: Visual status indicators (Active, Inactive, Pending, Blacklisted)

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Formik** - Form management
- **Yup** - Schema validation
- **React Query** - Data fetching and caching
- **React Icons** - Icon library
- **Radix UI** - Accessible component primitives

## 📁 Project Structure

```
src/
├── assets/
│   └── images/           # Images and logos
├── components/
│   ├── pageComponents/   # Page-specific components
│   │   └── users/       # User-related components
│   └── ui/              # Reusable UI components
├── layout/
│   └── dashboardLayout.tsx  # Main dashboard layout
├── pages/
│   ├── signin.tsx       # Authentication page
│   ├── users.tsx        # Users listing page
│   └── userDetails.tsx  # User detail view
├── services/
│   └── query/           # React Query hooks
├── types/
│   └── index.ts         # TypeScript type definitions
├── utils/
│   ├── constants.ts     # App constants
│   └── routes.ts        # Route definitions
└── App.tsx              # Root component
```

## 🎯 Key Components

### Authentication (SignIn)
- Email and password validation using Yup schema
- Show/hide password functionality
- Form state management with Formik
- Responsive two-column layout with branding

### Users Dashboard
- Statistics cards showing user metrics
- Advanced table with sorting and filtering
- Pagination with customizable page size
- Action menu for each user (View, Blacklist, Activate)
- Empty state handling

### User Details
- Comprehensive user profile view
- Tabbed interface (General, Documents, Bank, Loans, Savings, App)
- Personal information, education, employment details
- Social media links
- Multiple guarantor support
- Back navigation

### Filtering System
- Multi-criteria filtering
- Organization, username, email, phone number filters
- Status-based filtering
- Date range filtering
- Reset functionality

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/GodwinAsuquo/lendsqr-prototype.git
cd lendsqr-prototype
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Authentication Flow

1. Navigate to `/signin` (default route for unauthenticated users)
2. Enter any valid email and password (6+ characters)
3. Upon successful login, you'll be redirected to `/users`
4. Authentication state is persisted in localStorage
5. Protected routes redirect to `/signin` if not authenticated

## 📊 Data Structure

The application uses a structured data model for users.


## 🎨 Design Decisions

### Color Palette
- Primary: `#213F7D` (Navy Blue)
- Secondary: `#39CDCC` (Teal)
- Text: `#545F7D` (Gray)
- Error: `#E4033B` (Red)
- Background: `#FBFBFB` (Light Gray)

### Typography
- Clean, professional font hierarchy
- Consistent sizing and spacing
- Accessible color contrast ratios

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ✨ Features in Detail

### Pagination
- Dynamic page size selection (10, 20, 50, 100)
- Smart page number display with ellipsis
- Previous/Next navigation
- Current page highlighting

### Filtering
- Real-time filter application
- Multiple filter criteria support
- Visual feedback for active filters
- One-click filter reset

### User Status
- Color-coded status badges
- Four status types with distinct styling
- Hover effects and transitions

## 🔜 Future Enhancements

- [ ] Dark mode support
- [ ] Export data functionality
- [ ] Advanced search with autocomplete
- [ ] User creation and editing
- [ ] Role-based access control
- [ ] Email notifications
- [ ] Activity logs
- [ ] API integration
- [ ] Unit and integration tests
- [ ] Performance optimizations

## 📝 Development Notes

### Form Validation
The project uses Yup for schema validation:
- Email format validation
- Password minimum length (6 characters)
- Real-time error display

### State Management
- React Query for server state
- React hooks for local state
- LocalStorage for persistence

### Routing Strategy
- Public routes: Authentication pages
- Private routes: Dashboard and user pages
- Automatic redirection based on auth state
- Protected route wrapper with layout

## 🤝 Contributing

This is a portfolio project demonstrating frontend development skills. Feedback and suggestions are welcome!

## 📄 License

This project is created for demonstration purposes.

## 👤 Author - Godwin Asuquo

Built to showcase proficiency in modern React development, TypeScript, and UI/UX implementation.

---
