import './App.css';
import routes from './shell/routes';
import {Route, Switch} from 'react-router-dom';
import Error from "./shell/components/error/Error";

function App() {
  return (
    <div className="app">
      <Error/>
      {routes.map(route => {
        return (
            <Switch>
              <Route
                  exact
                  path={route.path}
                  key={route.path}
                  component={() => route.view() }>
              </Route>
            </Switch>
        )
      })}
    </div>
  );
}

export default App;
