import React from 'react';
import { Card, CardHeader, Button, Badge, ListGroupItem, ListGroup} from 'reactstrap';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_CATEGORIES = gql`
	{
		categories{
			totalCount
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
							totalCount: categories.totalCount - 1,
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
			<CardHeader className="d-flex justify-content-between">
				<h5>Plant Categories <Badge>{data.categories.totalCount}</Badge></h5>
				<Button size="sm" color="success" outline><i className="fa fa-plus"></i> New Category</Button>
			</CardHeader>
			<ListGroup>
				{data.categories.nodes.map(category => (
					<CategoryListGroupItem
						key={category.id}
						id={category.id}
						name={category.name}
						onClick={_onCategoryClick}
						onDelete={_onCategoryDelete}
					/>
				))}
			</ListGroup>
		</Card>
	);
};

const CategoryListGroupItem = (props) => {
	return(
		<ListGroupItem onClick={() => props.onClick(props.id) } className="d-flex justify-content-between" tag="a" style={{cursor: 'pointer'}} action>
			{props.name}
			<DeleteConfirmationModal
				itemName={props.name}
				onConfirmDelete={() => props.onDelete(props.id)}
			/>
		</ListGroupItem>
	)
}


export default Categories;