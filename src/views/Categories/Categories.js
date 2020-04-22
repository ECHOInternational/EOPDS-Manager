import React, { Component } from 'react';
// import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { Card, CardHeader, CardBody, Table, Button} from 'reactstrap';
// import EditableTextField from '../../components/EditableTextField';
// import WysiwygCard from '../../components/WysiwygCard';
// import CategoriesTable from './CategoriesTable';

class Categories extends Component {
  _selectCategory = (id) => {
  	console.log('Category Selected', id);
  }

  _deleteCategory = (id) => {
  	console.log('Category To Delete', id);
  }

  render(){
  	return(
  		<div>Not yet implemented.</div>
    )
  };
}


export default Categories;