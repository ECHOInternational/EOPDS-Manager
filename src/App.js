import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, HttpLink, ApolloProvider, ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from 'apollo-link-context';
import DebounceLink from 'apollo-link-debounce';
import AppLoader from './loaders/AppLoader';
import { cache, userCurrentLanguage, appErrorMessages } from './cache';
import { AuthProvider, UserManager } from 'oidc-react';

import i18n from 'i18next';
import './App.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
// import DefaultLayout from './containers/DefaultLayout';

// Pages
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const oidcConfig = {
  authority: 'https://www.echocommunity.org/',
  // authority: 'http://development.echocommunity.org:3000/',
  client_id: 'ALn5MoqIwgxC9NI8m-9Jim6uL4pBAuNgJOSd8v_Kqr4',
  redirect_uri: 'https://development.echocommunity.org:3001/',
  scope: 'openid profile read write',
  response_type: 'code',
  automaticSilentRenew: true,
  sendRequestsWithCredentials: true,
}

const userManager = new UserManager({...oidcConfig});

// userManager.events.addAccessTokenExpiring(function(){
//   console.log("token expiring...");
// });

// userManager.events.addUserLoaded(function(){
//   console.log("user loaded");
// });

// userManager.events.addUserUnloaded(function(){
//   console.log("user unloaded");
// });

const httpLink = new HttpLink({
  // uri: 'https://plant-api.echocommunity.org/graphql'
  uri: 'http://development.echocommunity.org:3000/graphql'
});


const debounceLink = new DebounceLink(100);

// Adds an accept_language header based on a local state variable
const userLanguageLink = setContext((request, previousContext) => {
  const headers = previousContext.headers;

  const userLanguage = userCurrentLanguage.id || i18n.language

  return {
    headers: {
      ...headers,
      accept_language: userLanguage,
    }
  }
});


const asyncAuthLink = setContext(async (_, {headers}) => {
  const user = (await userManager.getUser())
  if(!user) return;

  const token = user.access_token
  if(!token) return;

  return{
    headers:{
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }

});


// This is how we redirect for people who are not logged in
// We can catch exprired credentials here and update them before we throw an error at the user
// This does not prevent errors from propagating to the item that called them.
// They can be handled on a case-by-case bases with try-catch.
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      var error_message = ''
      switch(extensions?.code) {
        case 401:
          userManager.signinSilent().then(forward(operation));  
          error_message = `The user is Not Logged In.: ${message}`
          break;
        case 403:
          error_message = `The user is unauthorized: ${message}`
          break;
        case 404:
          error_message = `The item is not found: ${message}`
          break;
        default:
          error_message = `[Unhandled GraphQL error]: Message: ${message}`
      }
      console.log(error_message)
      appErrorMessages([...appErrorMessages(), error_message])
      // return Observable.of(operation);
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError.message}`)
    // return Observable.of(operation)
  }

  return forward(operation);
});

const link = ApolloLink.from([userLanguageLink, debounceLink, errorLink, asyncAuthLink, httpLink])

const client = new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
});

const App = (props) =>{

  const handleUserLogin = (user) => {
    const destination = localStorage.getItem('redirect_destination') || '/'
    window.location.replace(destination)
  }
  
  const handleUserSignOut = () => {
    client.resetStore()
  }

  // Reuseable modal for confirming record deletes.
  const getUserConfirmation = (dialogKey, callback) => {
    const dialogTrigger = window[Symbol.for(dialogKey)];
    if (dialogTrigger) {
      return dialogTrigger(callback);
    }
    callback(true);
  }

    return (
      <AuthProvider userManager={userManager} autoSignIn={false} onSignIn={handleUserLogin} onSignOut={handleUserSignOut} >
        <ApolloProvider client={client}>
          <HashRouter getUserConfirmation={getUserConfirmation}>
              <React.Suspense fallback={<AppLoader />}>
                  <Switch>
                    <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                    <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                    <Route path="/" name="Home" render={ (props) => {
                      return(<DefaultLayout {...props}/>)
                    }} />
                  </Switch>
              </React.Suspense>
          </HashRouter>
        </ApolloProvider>
      </AuthProvider>
    );
}

export default App;
