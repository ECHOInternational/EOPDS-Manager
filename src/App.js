import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, ApolloLink, gql } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import DebounceLink from 'apollo-link-debounce';
// import { renderRoutes } from 'react-router-config';
import AppLoader from './loaders/AppLoader'
import './App.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql'
});

const cache = new InMemoryCache();

const debounceLink = new DebounceLink(100);

// Adds an accept_language header based on a local state variable
//Left here as an example
// const userLanguageLink = setContext((request, previousContext) => {
//   const headers = previousContext.headers;

//   const { userLanguage } = client.readQuery({
//       query: gql`
//         {
//           userLanguage @client
//         }
//        `
//     });
//   return {
//     headers: {
//       ...headers,
//       accept_language: userLanguage,
//     }
//   }
// });

// const link = ApolloLink.from([userLanguageLink, debounceLink, httpLink])
const link = ApolloLink.from([debounceLink, httpLink])

const client = new ApolloClient({
  cache,
  link
});

// Set defaults in local state
cache.writeQuery({
  query: gql`
    query {
      userLanguage
    }
  `,
  data: {
    userLanguage: "es",
  }
});

// Reuseable modal for confirming record deletes.
const getUserConfirmation = (dialogKey, callback) => {
  const dialogTrigger = window[Symbol.for(dialogKey)];
  if (dialogTrigger) {
    return dialogTrigger(callback);
  }
  callback(true);
}

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <HashRouter getUserConfirmation ={getUserConfirmation}>
              <React.Suspense fallback={<AppLoader />}>
                <Switch>
                  <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                  <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                  <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                  <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                  <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
                </Switch>
              </React.Suspense>
          </HashRouter>
        </ApolloProvider>
    );
  }
}

export default App;
