import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Collapse, Badge} from 'reactstrap';
import CollapseToggle from './CollapseToggle';


const CollapsableCard = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleClick = () => {
    setIsOpen(!isOpen)
  }

  const badge = props.badge == '' ? '' : <Badge>{props.badge}</Badge>

  return(
    <Card>
      <CardHeader className="d-flex flex-row justify-content-between">
        <h2>{props.title} {badge}</h2>
        <CollapseToggle
          isOpen={isOpen}
          toggleClickHandler={handleToggleClick}
        />
      </CardHeader>
      <CardBody>
        <Collapse isOpen={isOpen}>
          {props.children}
        </Collapse>
      </CardBody>
    </Card>
  )
}

export default CollapsableCard;