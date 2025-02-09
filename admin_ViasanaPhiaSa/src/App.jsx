import AdminContainer from './cpmponents/adminContainer/adminContainer'
import Notification from './cpmponents/notification/Notification'
import Auth from "./cpmponents/auth/auth"
import { useState } from 'react'
import AuthContextProvider from './context/authContext'
import PageNotFound from './pages/pageNotfound/notFoundPage'
import CourseContextProvider from './context/courseContext'

import Landing from './cpmponents/landing/Landing'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

function App() {



  return (
    <AuthContextProvider>
      <CourseContextProvider>

        <Router>
          <Routes>
            <Route exact path="/" Component={Landing} />
            <Route
              exact
              path="/login"
              element={<Auth authRoute="login"  />}
            />
            <Route
              exact
              path="/register"
              element={<Auth authRoute="register" />}
            />
            <Route
              exact
              path='/admin/*'
              element={<AdminContainer />}
            />
            <Route
              exact
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </Router>
        <Notification />
      </CourseContextProvider>

    </AuthContextProvider>
  )
}

export default App
