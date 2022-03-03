import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import EditProcedure from './pages/EditProcedure';
import Login from './pages/Login';
import MyPatient from './pages/MyPatient';
import MyProcedure from './pages/MyProcedure';
import PasswordReset from './pages/PasswordReset';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/reset" component={PasswordReset} />
          <PrivateRoute path="/myprocedure" component={MyProcedure} />
          <PrivateRoute
            exact
            path="/editprocedure/:id"
            component={EditProcedure}
          />
          <PrivateRoute path="/mypatient" component={MyPatient} />
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
