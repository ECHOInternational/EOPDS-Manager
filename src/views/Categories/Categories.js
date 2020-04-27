import React from 'react';
import { Card, CardHeader, Button, Badge, ListGroupItem, ListGroup,   Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  ButtonGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
 } from 'reactstrap';
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
		<React.Fragment>
			<ListControlNavbar
				title="Plant Categories"
				listSize={data.categories.totalCount}
				alphaSort="up"
				listMode="list"
				addButtonText="Add Category"
			/>
			<ListGroup flush>
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
		</React.Fragment>
	);
};

const ListControlNavbar = (props) => {
	const _setAlphaSort = (direction) => {
		console.log(direction);
	}

	const _setListMode = (mode) => {
		console.log(mode);
	}

	const _handleAddClick = () => {
		console.log("Add Clicked");
	}

	return(
		<Navbar light className="mb-4">
			<NavbarBrand>{props.title} {props.listSize ? <Badge>{props.listSize}</Badge> : <span></span>}</NavbarBrand>
			<Form inline style={{flex: "1 1 auto"}} className="mr-2">
				<InputGroup style={{width: "100%"}} className="m-auto">
					<InputGroupAddon addonType="prepend">
						<InputGroupText>
							<i className="fas fa-search"></i>
						</InputGroupText>
					</InputGroupAddon>
					<Input type="search" name="search" id="listSearch" />
				</InputGroup>
			</Form>
			<Nav>
				<AlphaSortNavItem reverse={props.alphaSort === 'down'} className="mr-2" onChange={_setAlphaSort}/>
				<ListModeNavItem grid={props.listMode === 'grid'} className="mr-2" onChange={_setListMode} />
			</Nav>
			<Nav navbar>
			  
			  <NavItem>
			    <Button color="link" onClick={_handleAddClick}><i className="fas fa-plus"></i> {props.addButtonText}</Button>
			  </NavItem>
			</Nav>
		</Navbar>
	)
}

const AlphaSortNavItem = (props) => {
	return(
		<NavItem className={props.className}>
			<ButtonGroup>
				<Button active={!props.reverse} onClick={() => props.onChange('forward')}>
					<i className="fas fa-sort-alpha-up"></i>
				</Button>
				<Button active={props.reverse} onClick={() => props.onChange('reverse')}>
					<i className="fas fa-sort-alpha-down-alt"></i>
				</Button>
			</ButtonGroup>
		</NavItem>
	)
}

const ListModeNavItem = (props) => {
	return(
		<NavItem className={props.className}>
			<ButtonGroup>
			    <Button active={!props.grid} onClick={() => props.onChange('list')}>
			    	<i className="fas fa-list"></i>
			    </Button>
			    <Button active={props.grid} onClick={() => props.onChange('grid')}>
			    	<i className="fas fa-th"></i>
			    </Button>
			</ButtonGroup>
		</NavItem>
	)
}


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