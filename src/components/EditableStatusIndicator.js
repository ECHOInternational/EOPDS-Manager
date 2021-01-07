import React from 'react';
import './EditableStatusIndicator.scss';

const EditableStatusIndicator = ({editable, error}) => {
	if(error){
		return (<i className="fa fa-exclamation-triangle editableStatusIndicator"></i>);
	}

	if(editable){
		return(<i className="fa fa-pencil editableStatusIndicator"></i>);
	}

	return(<i className="fa fa-lock editableStatusIndicator"></i>);
}

export default EditableStatusIndicator;