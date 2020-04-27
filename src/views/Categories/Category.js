import React, {useState} from 'react';
// import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import { gql, useQuery } from '@apollo/client';
import CategoryForm from './CategoryForm';

const GET_CATEGORY = gql`
  query Category($id: ID!) {
    category(id: $id) {
		id
		name
		description
		createdBy
		translations {
			id
			locale
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

const Category = (props) => {
	
	const [userCanEdit, setUserCanEdit] = useState(false);

	const {match: {params} } = props;
	const {id} = params;

	const { loading, error, data } = useQuery(GET_CATEGORY, {
		variables: { id },
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