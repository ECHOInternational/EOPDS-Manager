import React from 'react';
import { Badge, Collapse, ListGroup, ListGroupItem } from 'reactstrap';


const RevisionCollapse = (props) => {
	const _onClickItem = (id) => {
		props.onSelect(
			props.revisions.nodes.find(node => node.id === id)
		);
	}
	return(
		<React.Fragment>
			<h5>Revisions <Badge>{props.revisions.totalCount}</Badge></h5>
			<Collapse isOpen={true}>
				<ListGroup>
				{props.revisions.nodes.map(revision => (
					<RevisionItem 
						key={revision.id}
						id={revision.id}
						date={revision.date}
						user={revision.user}
						onClick={_onClickItem}
						active={props.selected === revision.id}
					/>
				))}
				</ListGroup>
			</Collapse>
		</React.Fragment>
	)
}

const RevisionItem = (props) => {
	const id = props.id
	return(
      <ListGroupItem onClick={() => props.onClick(id)} tag="button" action active={props.active}>{props.date} - {props.user}</ListGroupItem>
    )
}





export default RevisionCollapse;