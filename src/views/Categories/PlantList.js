import React from 'react';
import { Card, CardBody, CardHeader, Badge, ListGroup, ListGroupItem } from 'reactstrap';
import CollapsableCard from '../../components/CollapsableCard';

const PlantList = (props) => {

  const plants = props.plants.map(
    (plant) => <ListGroupItem key={plant.node.id}>{plant.node.primaryCommonName} <em>{plant.node.scientificName}</em></ListGroupItem>
  )

	return(
    <CollapsableCard title="Plants" badge={props.count}>
      <ListGroup>
        {plants}
      </ListGroup>
    </CollapsableCard>
	)
}
export default PlantList;