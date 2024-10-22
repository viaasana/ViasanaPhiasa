import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./component/Landing/Landing"
import AuthContextProvider from "./context/authContext"
import Auth from "./component/auth/auth"
import { useState } from "react"
import Notification from "./component/notification/Notification"
import PageNotFound from "./Routes/pageNotfound/notFoundPage"
import Course from "./Routes/Courses/Courses"

function App() {
  const [language, setLanguage] = useState("Vietnamese")
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" Component={Landing} />
          <Route
            exact
            path="/login"
            element={<Auth authRoute="login" language={language} isHeaderAndFooter={true}/>}
          />
          <Route
            exact
            path="/register"
            element={<Auth authRoute="register" language={language} isHeaderAndFooter={true}/>}
          />

          <Route
            exact
            path="/course"
            element={<Course/>}
          />
          <Route
            exact
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </Router>
      <Notification/>
    </AuthContextProvider>
  )
}

export default App