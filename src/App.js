import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import MyProcedure from './pages/MyProcedure';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/myprocedure" component={MyProcedure} />
          {/* end redirect route on not found */}
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
