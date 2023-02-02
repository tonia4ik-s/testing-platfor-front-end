import './App.css';
import Login from "./components/authentication/login";
import ThemeProvider from "./theme";
import {Route, Routes} from "react-router-dom";
import Register from "./components/authentication/register";
import MainPage from "./components/mainPage";
import TestPage from "./components/testPage";
import QuestionPage from "./components/questionPage";

function App() {
  return (
      <ThemeProvider>
        <Routes>
              <Route
                  exact
                  path="/register"
                  element={
                    // <PrivateRoute>
                    //   <DashboardLayout />
                    // </PrivateRoute>
                    <Register />
                  }
              />
            <Route
                exact
                path="/login"
                element={
                    // <PrivateRoute>
                    //   <DashboardLayout />
                    // </PrivateRoute>
                    <Login />
                }
            />
            <Route
                exact
                path="/test"
                element={
                    // <PrivateRoute>
                    //   <DashboardLayout />
                    // </PrivateRoute>
                    <TestPage />
                }
            />
            <Route
                exact
                path="/question"
                element={
                    // <PrivateRoute>
                    //   <DashboardLayout />
                    // </PrivateRoute>
                    <QuestionPage />
                }
            />
            <Route exact path="/" element={<MainPage />} />
        </Routes>

      </ThemeProvider>
  );
}

export default App;
