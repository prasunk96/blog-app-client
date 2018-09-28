import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter} from 'react-router-dom';
const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql'
})

// client
//     .query({
//         query: gql`
//         {
//             posts {
//                 _id
//                 title
//                 content
//                 comments {
//                     content
//                 }
//             }
//         }
//         `
//     })
//     .then(result => console.log(result));

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
