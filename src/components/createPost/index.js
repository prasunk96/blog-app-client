import React from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const CREATE_POST = gql`
    mutation createPost($title:String, $content:String, $img: String) {
        createPost(title:$title, content: $content, img: $img) {
            title
            content
            img
        }
    }
`;
class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            img: ''
        }
    }
    handleTitleChange =  (event) => {
        event.preventDefault();
        this.setState({
            title: event.target.value
        })
    }
    handleContentChange = (event) => {
        event.preventDefault();
        this.setState({
            content: event.target.value
        })
    }
    handleImgChange = (event) => {
        event.preventDefault();
        this.setState({
            img: event.target.value
        })
    }
    render() {
        return (
            <Mutation mutation={CREATE_POST}>
            {
                (createPost) => (
                    <div className="ui centered grid container">
                        <div className="row"></div>
                        <div className="ui segment">
                            <div className="ui form">
                                <form 
                                    onSubmit={event => {
                                        event.preventDefault();
                                        createPost(
                                                {variables: 
                                                    {
                                                        title: this.state.title, 
                                                        content: this.state.content, 
                                                        img: this.state.img
                                                    }
                                                }
                                            )
                                            this.setState({title: '', content: '', img: ''});
                                            this.props.history.push(`/posts`);
                                    }
                                    }
                                >
                                    <div className="two fields">
                                        <div className="field fluid">
                                            <label>Title</label>
                                            <input type="text" placeholder="Post Title" value={this.state.title} onChange={this.handleTitleChange}/>
                                        </div>
                                        <div className="field fluid">
                                            <label>Image URL</label>
                                            <input type="text" placeholder="URL" value={this.state.img} onChange={this.handleImgChange}/>
                                        </div>
                                    </div>
                                    <div className="inline field">
                                        <div className="ui fluid">
                                            <textarea type="text" placeholder="Description" value={this.state.content} onChange={this.handleContentChange}/>
                                        </div>
                                    </div>
                                    <button type="submit" className="ui submit purple basic button">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            </Mutation>
        )
    }
}

export default CreatePost;