import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DataLayers from "./DataLayers/DataLayers";
import Overlay from "./Overlay/Overlay";
import TestingRecaptcha from "./TestingRecaptcha/TestingRecaptcha";
import OverlayRotated from "./OverlayRotated/OverlayRotated";

const Home: React.FC = () => {
  return <>Home</>;
};

const App: React.FC = () => {
  asdfasd;
  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/data-layers">Data Layers</Link>
              </li>
              <li>
                <Link to="/overlay">Overlay</Link>
              </li>
              <li>
                <Link to="/recaptcha">Testing reCaptcha</Link>
              </li>
              <li>
                <Link to="/overlay-rotated">Overlay Rotated</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/recaptcha">
              <TestingRecaptcha />
            </Route>
            <Route path="/overlay">
              <Overlay />
            </Route>
            <Route path="/data-layers">
              <DataLayers />
            </Route>
            <Route path="/overlay-rotated">
              <OverlayRotated />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
