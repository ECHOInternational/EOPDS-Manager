import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
	query Categories($afterCursor: String, $sortDirection: SortDirection, $name: String, $language: String){
		categories(first: 20, after: $afterCursor, sortDirection: $sortDirection, name: $name, language: $language) @connection(key: "categories"){
		    totalCount
		    edges{
		   	  node {
		        id
		        name
            images(first: 1){
              edges{
                node {
                  id
                  name
                  description
                  baseUrl
                }
              }
            }
		      }
		    }
	    	pageInfo {
	    		endCursor
	    		hasNextPage
	    	}
	    }
	}
`