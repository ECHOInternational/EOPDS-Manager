import React from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from 'reactstrap';
import { useReactiveVar } from '@apollo/client';
import { currentUser } from '../cache'
import LoginButton from './LoginButton'

const UserMenu = (props) =>{
  const userData = useReactiveVar(currentUser);

  if(userData === undefined){
    return(<LoginButton />)
  }

  return (
    <UncontrolledDropdown nav direction="down">
      <DropdownToggle nav>
        <img src={userData.avatar} className="img-avatar" alt={userData.email} />
      </DropdownToggle>
      <DropdownMenu right>
        
        <DropdownItem header tag="div" className="text-center"><strong>{userData.name}</strong></DropdownItem>
        {/* <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
        <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
        <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
        <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
        <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
        <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
        <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
        <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
        <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
        <DropdownItem divider />
        <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
    
        <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserMenu;





