**Frontend:**: React + TailwindCSS
**Backend:** Node.js + Express
**Database:** MySQL

**Live Link:** https://websitelogical.vercel.app/



## Features

Full Stack (Frontend + Backend)
Admin Dashboard with status cards and lead tables
Create and Manage Movies
Search, Filter
API Integration (Node.js + Express + MySQL)
Validation for form fields before submission
Sidebar Navigation (Dashboard & Movies)
Responsive UI with TailwindCSS
Modular Folder Structure

### folder structure ###

frontend                          # React + Tailwind frontend
  -components                          # Reusable UI components
    Loading.jsx                            # Loader component
    MoviesModal.jsx                          # Modal to create a Movies
  -constants                    
    apiConstants.js                   # API constants 
  -hooks
    useMovies.jsx                       # Custom hook for API logic (CRUD, filters, search)
  -pages
    DashboardContent.jsx               # Dashboard overview (cards + Movies stats)    
    Movies.jsx                          # Moviess table + search + filter + create
    DashboardLayout.jsx                # Main layout (Sidebar + Content)
    SideBar.jsx                        # Sidebar navigation
    Login.jsx                           # user login component
    Register.jsx                        # Register login component
  -services
    api.jsx                            # Base API logic
    MoviesService.jsx                    # Movies-related API service (CRUD)
  -utils
    alerts.js                           # Toaster/alert functions
    formValidator.js                    # Validation functions for frontend
ProtectedRoute.js                    # Used in App.js to restrict access to private routes unless the user is authenticated
 PublicRoute.jsx                      # Used in App.js to prevent logged-in users from accessing public pages like Login or Register



### website
cd website
npm install
npm start


### server
cd server
npm install
npm run dev

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
