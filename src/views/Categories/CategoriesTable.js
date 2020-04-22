import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Table, Button} from 'reactstrap';

const CategoriesTable = (props) => {
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
						{ props.nodes.map((node, index) => (
							<CategoryRow
								id={node.id}
								key={node.id}
								name={node.name}
								onClick={props.onRowClick}
								onDelete={props.onDelete}
							/>
						))}
					</tbody>
				</Table>
			</CardBody>
		</Card>
	)
}

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

export default CategoriesTable;