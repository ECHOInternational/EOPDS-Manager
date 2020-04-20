import React, { Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import EditableTextField from '../../components/EditableTextField';
import WysiwygCard from '../../components/WysiwygCard';
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../../Environment.js';

class Category extends Component {
	state = {
		name: '',
		description: '',
		id: "shdj-2394-ks87-shdd-23jj",
	}

	onChangeName = (evt) => {
		this.setState({ name: evt.target.value });
	}
	onChangeDescription = (value) => {
		this.setState({ description: value });
	}

	render() {
		const {match: {params} } = this.props;
		const {id} = params;
		return (
			<QueryRenderer
				environment={environment}
				query={graphql`
					query CategoryQuery($categoryID: ID!) {
						category(id: $categoryID){
							id
							name
							description
						}
					}
				`}
				variables={{
					categoryID: id,
				}}
				render={({error, props}) => {
					if (error) {
						return <div>Error!</div>;
					}
					if (!props) {
						return <div>Loading...</div>
					}
					if (!props.category) {
						return <div>Category Not Found.</div>
					}
					return (
						<div className="animated fade-in">
							<CategoryView
								name={props.category.name}
								description={props.category.description}
								id={props.category.id}
								onChangeName={this.onChangeName}
								onChangeDescription={this.onChangeDescription}
							/>
						</div>
					)
				}}
			/>
		);
	}
}


const CategoryView = props => {
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