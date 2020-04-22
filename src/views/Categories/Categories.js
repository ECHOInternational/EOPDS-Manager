import React from 'react';
// import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { Card, CardHeader, CardBody, Table, Button} from 'reactstrap';
// import EditableTextField from '../../components/EditableTextField';
// import WysiwygCard from '../../components/WysiwygCard';
// import CategoriesTable from './CategoriesTable';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_CATEGORIES = gql`
	{
		categories{
	    nodes{
	      id
	      name
	    }
	  }
	}
`

const DELETE_CATEGORY = gql`
	mutation DeleteCategory($id: ID!){
		deleteCategory(categoryId: $id){
			categoryId
		}
	}
`


const Categories = (props) => {
	const {loading, error, data } = useQuery(GET_CATEGORIES);
	const [deleteCategory] = useMutation(
		DELETE_CATEGORY,
		{
			update(cache, { data: { deleteCategory } }) {
				const { categories } = cache.readQuery({ query: GET_CATEGORIES});
				cache.writeQuery({
					query: GET_CATEGORIES,
					data: { categories:
						{
							nodes: categories.nodes.filter((node) => node.id !== deleteCategory.categoryId)
						}
					},
				});
			}
		}
	);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`

	const _onCategoryClick = (id) => {
		props.history.push(`/categories/${id}`);
	}

	const _onCategoryDelete = (id) => {
		deleteCategory({variables: {id}});
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