const { Environment, RecordSource, Store } = require('relay-runtime');
const store = new Store(new RecordSource());
const { RelayNetworkLayer, urlMiddleware } = require('react-relay-network-modern/node8');

// function currentLanguage(){
//   acceptLanguage.languages(['en', 'es', 'fr', 'th', 'zh', 'km', 'id', 'vi', 'my', 'sw', 'hi', 'ht', 'sv', 'pt', 'de']);
//   return acceptLanguage.get(browserLanguage());
// }

// function browserLanguage(){
//   return (navigator.languages && navigator.languages[0]) ||
//     navigator.language ||
//     navigator.userLanguage
// }

const network = new RelayNetworkLayer(
  [
    urlMiddleware({
      url: (req) => Promise.resolve('http://development.echocommunity.org:3000/graphql/'),
    }),
    (next) => async (req) => {
      req.fetchOpts.headers['ACCEPT-LANGUAGE'] = 'es';
      const res = await next(req);
      return res;
    },
  ],
  // opts
);

const environment = new Environment({
  network,
  store,
})

export default environment;