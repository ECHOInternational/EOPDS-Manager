import React, { Component } from 'react';
// import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { Card, CardHeader, CardBody, Table, Button} from 'reactstrap';
// import EditableTextField from '../../components/EditableTextField';
// import WysiwygCard from '../../components/WysiwygCard';
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../../Environment.js';
// import CategoriesTable from './CategoriesTable';
import DeleteCategoryMutation from '../../mutations/DeleteCategoryMutation';

class Categories extends Component {
  _selectCategory = (id) => {
  	console.log('Category Selected', id);
  }

  _deleteCategory = (id) => {
  	DeleteCategoryMutation(id);
  }

  render(){
  	return(
  		<QueryRenderer
			environment={environment}
			query={graphql`
				query CategoriesQuery {
					categories{
						edges{
							node{
								id
								name
							}
						}
					}
				}
			`}
			variables={{}}
			render={({error, props}) => {
				if (error) {
					return <div>Error!</div>;
				}
				if (!props) {
					return <div>Loading...</div>
				}
				if (!props.categories) {
					return <div>No Categories Found.</div>
				}
				if(!props.categories.edges) {
					return <div>No Edges Found.</div>
				}
				if(!props.categories.edges[0]) {
					return <div>First Edge Not Found </div>
				}
				return (
					<Card>
						<CardHeader>
							Plant Categories
						</CardHeader>
						<CardBody>
									{ props.categories.edges.map( 
										edge => (
										<div key={edge.node.id}>
											{edge.node.name}
											<Button
												onClick={() => this._deleteCategory(edge.node.id)}
												size="sm"
												color="danger"
												outline
											>
												<i className="fa fa-trash"></i> Delete
											</Button>
										</div>
									))}
						</CardBody>
					</Card>
				)
			}}
		/>
    )
  };
}


export default Categories;