import React from 'react';
import { Button } from 'reactstrap';


const CollapseToggle = (props) => {
  const icon = props.isOpen === true ? "fa-chevron-up" : "fa-chevron-down"
  const classes = `fa ${icon} fa-lg`

  return(
    <Button onClick={props.toggleClickHandler}>
      <i className={classes}></i>
    </Button>
  )
}

export default CollapseToggle;