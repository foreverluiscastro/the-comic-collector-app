import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import ComicList from "../pages/ComicList";
import AllComicsList from "../pages/AllComicsList";
import NewComic from "../pages/NewComic";
import ComicPage from "../pages/ComicPage";
import HomePage from "../pages/HomePage";
import '../App.css';
import EditComic from "../pages/EditComic";
import PublicComicPage from "../pages/PublicComicPage";
import MarvelComicsList from "../pages/MarvelComicsList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App"
    style={{
      backgroundImage: `url("https://i.pinimg.com/originals/2e/d8/20/2ed82058f206795b9127ee2d35aecad0.jpg")`
    }}
    >
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/new">
            <NewComic user={user} />
          </Route>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/comics">
            <ComicList />
          </Route>
          <Route exact path="/marvelcomics">
            <MarvelComicsList/>
          </Route>
          <Route exact path="/allcomics">
            <AllComicsList />
          </Route>
          <Route path="/allcomics/:id" component={PublicComicPage}/>
          <Route path="/comics/:id/edit" component={EditComic} />
          <Route path="/comics/:id" component={ComicPage}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;