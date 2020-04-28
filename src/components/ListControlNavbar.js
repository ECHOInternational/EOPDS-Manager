import React from 'react';
import { Button, Badge,  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  ButtonGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
 } from 'reactstrap';

const ListControlNavbar = (props) => {
	const _handleSearchTextChange = (evt) => {
		props.onSearchTextChange(evt.value);
	} 
	return(
		<Navbar light className="mb-4">
			<NavbarBrand>{props.title} {props.listSize ? <Badge>{props.listSize}</Badge> : <span></span>}</NavbarBrand>
			<Form inline style={{flex: "1 1 auto"}} className="mr-2">
				<InputGroup style={{width: "100%"}} className="m-auto">
					<InputGroupAddon addonType="prepend">
						<InputGroupText>
							<i className="fas fa-search"></i>
						</InputGroupText>
					</InputGroupAddon>
					<Input type="search" name="search" id="listSearch" onChange={_handleSearchTextChange} value={props.searchText}/>
				</InputGroup>
			</Form>
			<Nav>
				<AlphaSortNavItem reverse={props.alphaSort === 'DESC'} className="mr-2" onChange={props.onSetAlphaSort}/>
				<ListModeNavItem grid={props.listMode === 'grid'} className="mr-2" onChange={props.onSetMode} />
			</Nav>
			<Nav navbar>
			  
			  <NavItem>
			    <Button color="link" onClick={props.onAddButtonClick}><i className="fas fa-plus"></i> {props.addButtonText}</Button>
			  </NavItem>
			</Nav>
		</Navbar>
	)
}

const AlphaSortNavItem = (props) => {
	return(
		<NavItem className={props.className}>
			<ButtonGroup>
				<Button active={!props.reverse} onClick={() => props.onChange('ASC')}>
					<i className="fas fa-sort-alpha-up"></i>
				</Button>
				<Button active={props.reverse} onClick={() => props.onChange('DESC')}>
					<i className="fas fa-sort-alpha-down-alt"></i>
				</Button>
			</ButtonGroup>
		</NavItem>
	)
}

const ListModeNavItem = (props) => {
	return(
		<NavItem className={props.className}>
			<ButtonGroup>
			    <Button active={!props.grid} onClick={() => props.onChange('list')}>
			    	<i className="fas fa-list"></i>
			    </Button>
			    <Button active={props.grid} onClick={() => props.onChange('grid')}>
			    	<i className="fas fa-th"></i>
			    </Button>
			</ButtonGroup>
		</NavItem>
	)
}

export default ListControlNavbar;