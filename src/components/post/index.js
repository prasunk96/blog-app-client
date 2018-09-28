import React from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';

const GET_POSTS = gql`
{
    posts {
        _id
        title
        content
        img
        comments {
            content
        }
    }
}
`
const GET_POST = gql`
query post($_id: String) {
    post(_id: $_id) {
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
`;

const DELETE_POST = gql`
mutation createPost($_id: String) {
    deletePost(_id: $_id) {
        _id 
    }
}
`
const DELETE_COMMENT = gql`
mutation deleteComment($_id: String) {
    deleteComment(_id: $_id) {
        _id
    }
}
`
const CREATE_COMMENT = gql`
mutation createComment($postId: String, $content: String) {
 	createComment(postId: $postId, content: $content) {
         _id
        content
        postId
   }
}
`
class Post extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        content: ''
    }
}
handleCommentChange = (event) => {
    this.setState({
        content: event.target.value
    })
}
handleUpdatePostClick = (event,id) => {
    this.props.history.push(`/posts/edit/post/${id}`);
}
render() {
        return (
        <div>
            <Query query={GET_POST} variables={{_id: this.props.match.params.id}}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return (
                            <div className="ui centered grid fluid">
                                <div className="row"></div>
                                <div key={data.post._id} className="center aligned ui card eight wide tablet ten wide computer column">
                                <div className="ui eight wide tablet ten wide computer column grid float">
                                    <button style={{border:'none', color:'grey'}} onClick={event => this.handleUpdatePostClick(event,data.post._id)}>Update Post <i  className="edit icon"></i></button>                            
                                </div>
                                <div className="row"></div>
                                    <div className="content" style={{borderTop:"none"}}>
                                        <div className="ui header">
                                            <p>{data.post.title}</p>
                                        </div>
                                        <div>
                                            <img className="ui fluid rounded image" alt="post" src={data.post.img}></img>
                                        </div>
                                        <div className="ui piled segment">
                                            <h4 className="ui header">Descrption</h4>
                                            <p>{data.post.content}</p>
                                        </div>
                                    </div>
                                    <div className="ui ten column grid">
                                        <div className="five column row">
                                            <div className="column fifteen wide" style={{marginLeft:"22px"}}>
                                                <Mutation 
                                                    mutation={CREATE_COMMENT}
                                                    update={(cache, {data: {createComment}}) => {
                                                        const {post} = cache.readQuery({query: GET_POST, variables:{_id: this.props.match.params.id}});
                                                        post.comments.push(createComment);
                                                        cache.writeQuery({
                                                            query: GET_POST,
                                                            data: {post}
                                                        })
                                                    }}
                                                > 
                                                {
                                                    (createComment) => (
                                                        <div>
                                                            <div className="ui form">
                                                                <div className="field">
                                                                    <textarea rows="1" type="text" placeholder="Add Comment" value={this.state.content} onChange={this.handleCommentChange}/>
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="ui teal basic button left floated"
                                                                onClick={
                                                                    event => {
                                                                        createComment(
                                                                            {
                                                                                variables: {
                                                                                    postId: this.props.match.params.id,
                                                                                    content: this.state.content
                                                                                },
                                                                                optimisticResponse: {
                                                                                    __typename: "Mutation",
                                                                                    createComment: {
                                                                                        __typename:"Comment",
                                                                                        content: this.state.content,
                                                                                        postId: this.props.match.params.id,
                                                                                        _id: "5ba0ca12a89e7432f313e730"
                                                                                      }
                                                                                }
                                                                            }
                                                                        )
                                                                        this.setState({content:''});
                                                                    }
                                                                }
                                                            >Comment</button>
                                                        </div>
                                                    )
                                                }
                                                </Mutation>
                                                <div className="column right floated">
                                                <Mutation mutation={DELETE_POST}
                                                update={(cache, {data: {deletePost}}) => {
                                                    const {posts} = cache.readQuery({query: GET_POSTS});
                                                    cache.writeQuery({
                                                        query: GET_POSTS,
                                                        data: {posts: posts.filter(e => e._id!==this.props.match.params.id)}
                                                    })
                                                }}
                                                >
                                                    {
                                                        (deletePost) => (
                                                            <button className="ui red basic button"
                                                                onClick={
                                                                    event => {
                                                                        event.preventDefault();
                                                                        deletePost({variables:{_id: this.props.match.params.id}})
                                                                        this.props.history.push(`/posts`);  
                                                                    }
                                                                }
                                                            >Delete</button>
                                                        )
                                                    }
                                                </Mutation>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui horizontal divider">
                                        Comments
                                    </div>
                                        {
                                            data.post.comments.map((comment) => (
                                                <div key={comment._id}>
                                                    <div style={{borderBottom:"1px solid grey", padding: "10px 0px 10px 0px"}}>
                                                        <div>
                                                            {comment.content}
                                                        </div>
                                                        <div class="ui compact menu right floated" style={{border: "none", background:"none", boxShadow:"none"}}>
                                                            <div class="ui simple dropdown item">
                                                                <i class="dropdown icon"></i>
                                                                <div class="menu">
                                                                    <div class="item">
                                                                        <div className="ui small basic icon buttons">
                                                                            <Mutation mutation={DELETE_COMMENT}
                                                                                update={(cache, {data:{deleteComment}}) => {
                                                                                    const {post} = cache.readQuery({query: GET_POST, variables:{_id: this.props.match.params.id}});
                                                                                    const res = post.comments.filter(e => e._id !== deleteComment._id)
                                                                                    post.comments = res;
                                                                                    cache.writeQuery({
                                                                                        query: GET_POST,
                                                                                        data: {post}
                                                                                    })
                                                                                }}
                                                                            >
                                                                                {
                                                                                    (deleteComment) => (
                                                                                        <button className="ui button"
                                                                                            onClick={
                                                                                                event => {
                                                                                                    deleteComment(
                                                                                                        {
                                                                                                            variables:{_id: comment._id},
                                                                                                            optimisticResponse: {
                                                                                                                __typename: "Mutation",
                                                                                                                deleteComment: {
                                                                                                                    __typename: "Comment",
                                                                                                                    _id: comment._id,
                                                                                                                    }
                                                                                                            }
                                                                                                        }
                                                                                                    )
                                                                                                }
                                                                                            }
                                                                                        ><i className="trash icon"></i></button>
                                                                                    )
                                                                                }
                                                                            </Mutation>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            </div> 
                        )
                    }
                }
            </Query>
        </div>
        )
    }
}


export default Post;