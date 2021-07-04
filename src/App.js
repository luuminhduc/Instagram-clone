import React from 'react';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import firebase from 'firebase';
import config from './firebase/config';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Container from './components/Container';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import EditAccount from './pages/EditAccount';
import EditPost from './pages/EditPost';
import SinglePostPage from './pages/SinglePostPage';
import PostModal from './components/PostModal';

const rrfProps = {
  firebase,
  config,
  dispatch:store.dispatch
}

const AuthIsLoaded = ({children}) => {
  const auth = useSelector(state=>state.firebaseReducer.auth);
  if(!isLoaded(auth)) return "";
  return children;
}

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
        <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Container>
              <Home/>
              <PostModal/>

            </Container>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/user/:userId">
            <Container>
            <UserPage/>
            <PostModal/>
            </Container>
          </Route>
          <Route exact path="/account/edit">
            <Container>
            <EditAccount/>
            </Container>
          </Route>
          <Route exact path="/editPost">
            <Container>
            <EditPost/>
            </Container>
          </Route>
          <Route exact path={`/post/:postId`}>
            <Container>
            <SinglePostPage/>
            </Container>
          </Route>
        </Switch>
        </BrowserRouter>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
 
export default App;
