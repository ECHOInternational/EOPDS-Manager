const { Environment, RecordSource, Store } = require('relay-runtime')
const store = new Store(new RecordSource());
const { RelayNetworkLayer, urlMiddleware } = require('react-relay-network-modern/node8');


// const network = Network.create((operation, variables) => {
//   return fetch('http://development.echocommunity.org:3000/graphql/', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: operation.text,
//       variables,
//     }),
//   }).then(response => {
//     return response.json()
//   })
// })

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
export default environment