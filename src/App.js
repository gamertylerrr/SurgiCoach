import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          {/* end redirect route on not found */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
