import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./component/Landing/Landing"
import AuthContextProvider from "./context/authContext"
import Auth from "./component/auth/auth"
import Notification from "./component/notification/Notification"
import PageNotFound from "./Routes/pageNotfound/notFoundPage"
import CourseRoute from "./Routes/Courses/Courses"
import CourseContextProvider from "./context/courseContext"
import Assignments from "./Routes/Assignments/Assignments"
import MyHeader from "./component/header/MyHeader"
import MyFooter from "./component/footer/MyFooter"

function App() {
  return (
    <AuthContextProvider>
      <CourseContextProvider>
        <Router>
          <MyHeader />
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
              path="/assignments/*"
              element={<Assignments />}
            />
            <Route
              exact
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
          <MyFooter />
        </Router>
        <Notification />
      </CourseContextProvider>
    </AuthContextProvider>
  )
}

export default App