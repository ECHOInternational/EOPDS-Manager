import { gql } from '@apollo/client';

export const DELETE_CATEGORY = gql`
	mutation DeleteCategory($input: DeleteCategoryInput!){
		deleteCategory(input: $input){
			categoryId
			errors{
				code
				field
				message
				value
			}
		}
	}
`