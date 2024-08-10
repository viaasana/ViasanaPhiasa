import MyHeader from './cpmponents/header/MyHeader'
import MyFooter from './cpmponents/footer/MyFooter'
import AdminContainer from './cpmponents/adminContainer/adminContainer'
import Notification from './cpmponents/notification/Notification'
import Auth from "./cpmponents/auth/auth"
import { useState } from 'react'
import AuthContextProvider from './context/authContext'

import Landing from './cpmponents/landing/Landing'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const [language, setLanguage] = useState("Vietnamese")



  return (
    <AuthContextProvider>
      <MyHeader />
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" Component={Landing} />
            <Route
              exact
              path="/login"
              element={ <Auth authRoute="login" language={language}/>}
            />
            <Route 
              exact 
              path="/register" 
              element={ <Auth authRoute="register" language={language}/> }
             />
          </Routes>
        </Router>
      </div>
      <MyFooter />
      <Notification />
    </AuthContextProvider>
  )
}

export default App
