import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment';

const mutation = graphql`
  mutation DeleteCategoryMutation($id: ID!) {
    deleteCategory(categoryId: $id) {
      categoryId
    }
  }
`

export default (id) => {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
      	id
      },
      updater: storeProxy => {
        storeProxy.delete(id)
      },
     //  configs: [{
     //  	type: 'NODE_DELETE',
		   //  deletedIDFieldName: 'categoryId',
	    // }],
      onError: err => console.error(err),
    },
  )
}