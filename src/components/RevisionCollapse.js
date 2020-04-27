import React, {useState} from 'react';
import { Badge, Collapse, ListGroup, ListGroupItem, Button } from 'reactstrap';
import './RevisionCollapse.scss';


const RevisionCollapse = (props) => {
	const [toggle, setToggle] = useState(false);


	const _onClickItem = (id) => {
		props.onSelect(
			props.revisions.nodes.find(node => node.id === id)
		);
	}
	return(
		<React.Fragment>
			<div className="collapse-header">
				<span>Revisions <Badge>{props.revisions.totalCount}</Badge></span>
				<CollapseButton open={toggle} onClick={() => {setToggle(!toggle)}} />
			</div>
			<Collapse isOpen={toggle}>
				<ListGroup flush>
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

const CollapseButton = (props) => {
	return <Button size="sm" color="link" onClick={props.onClick}><i class={`fa fa-${props.open ? "angle-double-up" : "angle-double-down"}`}></i></Button>
}

const RevisionItem = (props) => {
	const id = props.id
	return(
      <ListGroupItem onClick={() => props.onClick(id)} tag="button" action active={props.active}>{props.date} - {props.user}</ListGroupItem>
    )
}





export default RevisionCollapse;