/**
 * @flow
 * @relayHash e850d6efd79e416eaf2ee70f21b1e695
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CategoryQueryVariables = {|
  categoryID: string
|};
export type CategoryQueryResponse = {|
  +category: ?{|
    +id: string,
    +name: ?string,
    +description: ?string,
  |}
|};
export type CategoryQuery = {|
  variables: CategoryQueryVariables,
  response: CategoryQueryResponse,
|};
*/


/*
query CategoryQuery(
  $categoryID: ID!
) {
  category(id: $categoryID) {
    id
    name
    description
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "categoryID",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "category",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "categoryID"
      }
    ],
    "concreteType": "Category",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "description",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CategoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CategoryQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CategoryQuery",
    "id": null,
    "text": "query CategoryQuery(\n  $categoryID: ID!\n) {\n  category(id: $categoryID) {\n    id\n    name\n    description\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '74a8e5225806cdc7b8fd516e3c92f849';

module.exports = node;
