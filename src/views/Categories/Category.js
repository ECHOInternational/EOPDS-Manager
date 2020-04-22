import React, { Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import EditableTextField from '../../components/EditableTextField';
import WysiwygCard from '../../components/WysiwygCard';
import { gql, useQuery } from '@apollo/client';

const GET_CATEGORY = gql`
  query Category($id: [String!]) {
    categories(id: $id) {
      nodes{
      	id
      	name
      	description
      	uuid
      }
    }
  }
`



const Category = (props) => {
	
	const {match: {params} } = props;
	const {id} = params;

	const { loading, error, data } = useQuery(GET_CATEGORY, {
		variables: { id },
	});

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`

	const category = data.categories.nodes[0];

	const _onChangeName = (evt) => {
		// this.setState({ name: evt.target.value });
		console.log('Name changed to:', evt.target.value);
	}
	const _onChangeDescription = (value) => {
		// this.setState({ description: value });
		console.log('Description changed to:', value);
	}
		
	return (
		<CategoryView
			name={category.name}
			key={category.id}
			description={category.description}
			id={category.id}
			onChangeName={_onChangeName}
			onChangeDescription={_onChangeDescription}
		/>
	);
}


const CategoryView = (props) => {
	return(
		<div>
			<Row>
				<Col xs="12">
					<Card>
						<CardBody>
							<EditableTextField
								name = "Name"
								value = {props.name}
								placeholder = "Enter a category name"
								onChange = {props.onChangeName}
								allowEdit = {true}
								showWordCount = {true}
							/>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col xs="12" sm="8">
					<WysiwygCard
						name = "Description"
						value = {props.description}
						placeholder = "Enter a description"
						onChange = {props.onChangeDescription}
						allowEdit = {true}
						showWordCount = {true}
					/>
				</Col>
				<Col xs="12" sm="4">
					<Card className="card-accent-info">
						<CardHeader>
							Status
						</CardHeader>
						<CardBody>
							{props.id}
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col xs="12">
					<Card>
						<CardHeader>
							Plants in this category
							<div className="card-header-actions">
                  				<h5><Badge color="success" className="float-right">100</Badge></h5>
               				</div>
						</CardHeader>
						<CardBody>
							<Table responsive>
			                  <thead>
			                  <tr>
			                    <th>Common Name</th>
			                    <th>Scientific Name</th>
			                    <th>Varieties</th>
			                  </tr>
			                  </thead>
			                  <tbody>
			                  <tr>
			                    <td>Samppa Nori</td>
			                    <td>2012/01/01</td>
			                    <td>Member</td>
			                  </tr>
			                  <tr>
			                    <td>Estavan Lykos</td>
			                    <td>2012/02/01</td>
			                    <td>Staff</td>
			                  </tr>
			                  <tr>
			                    <td>Chetan Mohamed</td>
			                    <td>2012/02/01</td>
			                    <td>Admin</td>
			                  </tr>
			                  <tr>
			                    <td>Derick Maximinus</td>
			                    <td>2012/03/01</td>
			                    <td>Member</td>
			                  </tr>
			                  <tr>
			                    <td>Friderik Dávid</td>
			                    <td>2012/01/21</td>
			                    <td>Staff</td>
			                  </tr>
			                  </tbody>
			                </Table>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default Category;