import { useEffect, useState } from "react";
import AlertContext from "./context/AlertContext";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewBook from "./containers/NewBook/NewBook";
import EditBook from "./containers/Edit Book/EditBook";
import SingleBook from "./containers/SingleBook/SingleBook";
import AllBooks from "./containers/AllBooks/AllBooks";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Alert from "./components/Alert/Alert";

function App() {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    console.log("Make an API call");
    axios
      .get("/api/config")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Router>
        <AlertContext.Provider value={{ ...alert, setAlert: setAlert }}>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/books/new" component={NewBook} />
            <Route exact path="/books/:bookId/edit" component={EditBook} />
            <Route exact path="/books/:bookId" component={SingleBook} />
            <Route exact path="/books" component={AllBooks} />
            <Route exact path="/" component={Home} />
            <Route path="/" component={NotFound} />
          </Switch>
        </AlertContext.Provider>
      </Router>
    </div>
  );
}

export default App;
