/**
 * @flow
 * @relayHash 36ddad3b594fac2d1208d6b1d72ea06d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteCategoryMutationVariables = {|
  id: string
|};
export type DeleteCategoryMutationResponse = {|
  +deleteCategory: {|
    +categoryId: string
  |}
|};
export type DeleteCategoryMutation = {|
  variables: DeleteCategoryMutationVariables,
  response: DeleteCategoryMutationResponse,
|};
*/


/*
mutation DeleteCategoryMutation(
  $id: ID!
) {
  deleteCategory(categoryId: $id) {
    categoryId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteCategory",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "id"
      }
    ],
    "concreteType": "DeleteCategoryPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "categoryId",
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
    "name": "DeleteCategoryMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteCategoryMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteCategoryMutation",
    "id": null,
    "text": "mutation DeleteCategoryMutation(\n  $id: ID!\n) {\n  deleteCategory(categoryId: $id) {\n    categoryId\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a75a59c3e5a43dc2c37ff77556517efd';

module.exports = node;
