import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Layout from "./components";
function Routing() {
  return (
    <div className="container">
      <Router>
        <Layout.Navbar />
        <Switch>
          <Route exact path="/" component={Layout.Home} />
          <Route path="/adduser" component={Layout.AddUser} />
          <Route path="/dashboard" component={Layout.Dashboard} />
          <Route path="/login" component={Layout.Login} />
          <Route path="/signup" component={Layout.Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routing;
