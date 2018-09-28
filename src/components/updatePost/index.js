import React from 'react';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import AppForm from '../appForm';
const UPDATE_POST = gql`
mutation updatePost($_id:String, $title:String, $content:String, $img:String){
	updatePost(_id:$_id, title:$title, content:$content, img:$img) {
  _id
    title
    content
    img
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
    }
    }
`;

class UpdatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
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
            <div>
                <Query query={GET_POST} variables={{_id: this.props.match.params.id}}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (
                        <Mutation mutation={UPDATE_POST}>
                        {
                            (updatePost) => (
                                <div className="ui centered grid container">
                                    <div className="row"></div>
                                    <div className="ui segment">
                                        <div className="ui form">
                                            <AppForm data={data} updatePost={updatePost} {...this.props}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        </Mutation>
                        )   
                    }
                }
                </Query>
            </div>
        )
    }
}

export default UpdatePost;