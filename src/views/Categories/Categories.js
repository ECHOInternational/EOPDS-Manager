import React from 'react';
// import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { Card, CardHeader, CardBody, Table, Button} from 'reactstrap';
// import EditableTextField from '../../components/EditableTextField';
// import WysiwygCard from '../../components/WysiwygCard';
// import CategoriesTable from './CategoriesTable';
import { gql, useQuery } from '@apollo/client';

const CATEGORIES = gql`
	{
		categories{
	    nodes{
	      id
	      name
	    }
	  }
	}
`

const Categories = (props) => {
	const {loading, error, data } = useQuery(CATEGORIES);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`

	const _onCategoryClick = (id) => {
		props.history.push(`/categories/${id}`);
	}

	const _onCategoryDelete = (e) => {
		console.log('deleted', e)
	}

	return(
		<Card>
			<CardHeader>
				Plant Categories
			</CardHeader>
			<CardBody>
				<Table responsive hover> 
					<thead>
						<tr>
							<th>Name</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{data.categories.nodes.map(category => (
							<CategoryRow
								key={category.id}
								id={category.id}
								name={category.name}
								onClick={_onCategoryClick}
								onDelete={_onCategoryDelete}
							/>
						))}
					</tbody>
				</Table>
			</CardBody>
		</Card>
	);
};

const CategoryRow = (props) => {
	return(
		<tr style={{cursor: 'pointer'}}>
			<td	onClick={() => props.onClick(props.id) }>{props.name}</td>
			<td style={{textAlign: 'right'}}>
				<Button
					onClick={() => props.onDelete(props.id)}
					size="sm"
					color="danger"
					outline
				>
					<i className="fa fa-trash"></i> Delete
				</Button>
			</td>
		</tr>
	)
}


export default Categories;