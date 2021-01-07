import React, {useState} from 'react';
// import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import { gql, useQuery } from '@apollo/client';
import CategoryForm from './CategoryForm';

const GET_CATEGORY = gql`
  query Category($id: ID!, $language: String) {
    category(id: $id, language: $language) {
		id
		name
		description
		createdBy
		translations {
			id
			locale
			name
			description
		}
		versions{
			totalCount
			nodes{
				id
				date
				user
				name
				description
			}
		}
    }
  }
`

const GET_USER_LANGUAGE = gql`
  {
    userLanguage @client
  }
`;

const Category = (props) => {
	
	const [userCanEdit, setUserCanEdit] = useState(false);

	const {match: {params} } = props;
	const {id} = params;

	const { data : { userLanguage }, } = useQuery(GET_USER_LANGUAGE);

	const { loading, error, data } = useQuery(GET_CATEGORY, {
		variables: { id, language: userLanguage },
		onCompleted: (data) => {
			setUserCanEdit(true); //TODO! This needs to check if user can edit. 
		},
	});

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`
	if (!data) return 'Category Not Found.'

	return (
		<CategoryForm
			category={data.category}
			allowEdit={userCanEdit}
		/>
	);
}

export default Category;