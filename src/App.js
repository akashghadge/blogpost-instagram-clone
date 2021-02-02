import logo from './logo.svg';
import './App.css';

import { Switch, Route } from "react-router-dom";
import NavbarPage from "./components/NavbarPage"
import HomePage from './components/HomePage';
import Sign from './components/Sign';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
function App() {
  return (
    <>
      <div className="container">
        <NavbarPage></NavbarPage>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/sign" component={Sign}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/createpost" component={CreatePost}></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
