import React from 'react';
import './EditableStatusIndicator.css';

const EditableStatusIndicator = ({editable}) => (
	<i className={`fa ${editable ? "fa-pencil" : "fa-lock"} editableStatusIndicator`}/>
)

export default EditableStatusIndicator;