import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./component/Landing/Landing"
import AuthContextProvider from "./context/authContext"
import Auth from "./component/auth/auth"
import Notification from "./component/notification/Notification"
import PageNotFound from "./Routes/pageNotfound/notFoundPage"
import CourseRoute from "./Routes/Courses/Courses"
import CourseContextProvider from "./context/courseContext"

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
              element={<Auth authRoute="login" isHeaderAndFooter={true} />}
            />
            <Route
              exact
              path="/register"
              element={<Auth authRoute="register" isHeaderAndFooter={true} />}
            />

            <Route
              exact
              path="/course/*"
              element={<CourseRoute />}
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