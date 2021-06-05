import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from './views/LandingPage'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import Learn from './views/Learn';
import Ranking from './views/Ranking';
import Study from './views/Study';
import Exercise from './views/Exercise';
import ExStudy from './views/ExStudy';

function App() {
  return (
    <AuthContextProvider>
      <Router>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route 
              exact 
              path='/login' 
              render={props => <Auth {...props} authRoute='login'/>}
            />
            <Route 
              exact 
              path='/register' 
              render={props => <Auth {...props} authRoute='register'/>}
            />
            <ProtectedRoute
              exact
              path='/dashboard'
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path='/learn'
              component={Learn}
            />
            <ProtectedRoute
              exact
              path='/ranking'
              component={Ranking}
            />
            <ProtectedRoute
              exact
              path='/exercise'
              component={Exercise}
            />
            <ProtectedRoute
              exact
              path='/study'
              component={Study}
            />
            <ProtectedRoute
              exact
              path='/exstudy'
              component={ExStudy}
            />
          </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
