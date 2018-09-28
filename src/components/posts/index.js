import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const GET_POSTS = gql`
{
    posts {
        _id
        title
        content
        img
        comments {
            _id
            content
        }
    }
}
`
class Posts extends React.Component {
handleClick = (event, postId) => {
    this.props.history.push(`/posts/show/${postId}`);
}
handleCreatePostClick = (event) => {
    this.props.history.push('/posts/new/createnewpost');
}
render() {
        return (
            <div className="ui centered grid container">
                <div className="row"></div>
            <div className="center aligned ui eight wide tablet ten wide computer column grid">
                <button className="ui purple basic button" onClick={event => this.handleCreatePostClick(event)}>Create New Post <i  className="plus square icon"></i></button>                            
            </div>
            <Query query={GET_POSTS} fetchPolicy={'network-only'}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return (
                            <div className="ui centered grid container">
                            <div className="row"></div>
                                {
                                    data.posts.map((post, index) => (
                                        <div key={post._id} className="center aligned ui card eight wide tablet ten wide computer column grid">
                                            <div className="content">
                                                <div className="ui header">
                                                    <p>{post.title}</p>
                                                </div>
                                                <div className="row"></div>
                                                <div>
                                                    <img className="ui rounded fluid image" alt="post" src={post.img}></img>
                                                </div>
                                                <div className="ui piled segment">
                                                    <h4 className="ui header">Descrption</h4>
                                                    <p>{post.content.slice(0,100)}...</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button className="ui purple basic button" onClick={event => this.handleClick(event,post._id)}>More</button>
                                            </div>
                                        </div>
                                        
                                    ))
                                }
                            </div>
                        )
                    }
                }
            </Query>
            </div>
        )
    }
}


export default Posts;