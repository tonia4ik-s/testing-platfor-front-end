import './App.css';
import Login from "./components/authentication/login";
import ThemeProvider from "./theme";
import {Route, Routes} from "react-router-dom";
import Register from "./components/authentication/register";
import MainPage from "./components/mainPage";
import TestPage from "./components/testPage";
import QuestionPage from "./components/questionPage";
import ResultPage from "./components/ResultPage";
import PrivateRoute from "./privateRoute";
import PrivateAuthRoute from "./privateAuthRoute";

function App() {
  return (
      <ThemeProvider>
        <Routes>
              <Route
                  exact
                  path="/register"
                  element={
                      <PrivateAuthRoute>
                          <Register />
                      </PrivateAuthRoute>
                  }
              />
            <Route
                exact
                path="/login"
                element={
                    <PrivateAuthRoute>
                        <Login />
                    </PrivateAuthRoute>
                }
            />
            <Route
                exact
                path="/test"
                element={
                    <PrivateRoute>
                        <TestPage />
                    </PrivateRoute>
                }
            />
            <Route
                exact
                path="/question"
                element={
                    <PrivateRoute>
                        <QuestionPage />
                    </PrivateRoute>
                }
            />
            <Route
                exact
                element={
                    <PrivateRoute>
                        <ResultPage />
                    </PrivateRoute>
                }
                path="/result"
            />
            <Route exact path="/" element={ <PrivateRoute><MainPage /></PrivateRoute>}/>
            <Route exact path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
  );
}

export default App;
