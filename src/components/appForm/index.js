import React from 'react';
// const UPDATE_POST = gql`
// mutation updatePost($_id:String, $title:String, $content:String, $img:String){
// 	updatePost(_id:$_id, title:$title, content:$content, img:$img) {
//   _id
//     title
//     content
//     img
//   }
// }
// `
// const GET_POST = gql`
// query post($_id: String) {
//     post(_id: $_id) {
//       _id
//       title
//       content
//       img
//     }
//     }
// `;
class AppForm extends React.Component {
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
    static getDerivedStateFromProps(props,state) {
        if(props.data.post._id !== state._id) {
            return {
                    _id: props.data.post._id,
                    title: props.data.post.title,
                    content: props.data.post.content,
                    img: props.data.post.img
                }
        }
        else {
            return null;
        }
        
    }
    render() {
        return (
            <form 
                onSubmit={event => {
                    event.preventDefault();
                    this.props.updatePost(
                            {variables: 
                                {   
                                    _id: this.state._id,
                                    title: this.state.title, 
                                    content: this.state.content, 
                                    img: this.state.img
                                }
                            }
                        )
                        this.setState({_id:'', title: '', content: '', img: ''});
                        this.props.history.push(`/posts/show/${this.state._id}`);
                }
                }
            >
                <div className="two fields">
                    <div className="field fluid">
                        <label>Title</label>
                        <input type="text" placeholder="Post Title" value={this.state.title} onChange={this.handleTitleChange} />
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
        )
    }
}

export default AppForm;