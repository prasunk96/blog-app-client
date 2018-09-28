import React, { Component } from 'react';
import './App.css';
import Posts from './components/posts';
import Post from './components/post';
import CreatePost from './components/createPost';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import UpdatePost from './components/updatePost';
class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="ui stackable menu fluid">
            <div className="item">
              <i className="react icon"></i>
              Blog
            </div>
            <Link to="/posts" className="item right">Home</Link>
          </div>
          <div>
            <Switch>
              <Route exact path="/posts" render={(props)=> <Posts {...props} />}></Route>
              <Route path={`/posts/show/:id`} render={(props)=> <Post {...props} />}></Route>
              <Route path={`/posts/new/createnewpost`} render={(props) => <CreatePost {...props}/>}></Route>
              <Route path={`/posts/edit/post/:id`} render={(props)=> <UpdatePost {...props} />}></Route>
            </Switch>
          </div>
        </div>
    );
  }
}

export default withRouter(App);