import logo from './logo.svg';
import './App.css';

import { Switch, Route } from "react-router-dom";
import NavbarPage from "./components/NavbarPage"
import HomePage from './components/HomePage';
function App() {
  return (
    <>
      <div className="container">
        <NavbarPage></NavbarPage>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
