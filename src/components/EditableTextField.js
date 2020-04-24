import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Input } from 'reactstrap';
import EditableStatusIndicator from './EditableStatusIndicator';
import './EditableTextField.css';

const EditableTextField = (props) => {
	let [isEditing, setIsEditing] = useState(props.allowEdit && props.value === '');
	
	const _handleClick = () => {
		setIsEditing(props.allowEdit);
	}

	const _handleBlur = () => {
		setIsEditing(props.value === '')
	}

	const _handleChange = (evt) => {
		props.onChange(evt.target.value);
	}

	if(isEditing){
		return(
			<div className="EditableTextField" >
				<Input
					autoFocus
					value={props.value}
					bsSize="lg"
					type="text"
					id="name"
					name={props.name}
					className="input-lg"
					placeholder={props.placeholder}
					onChange={_handleChange}
					onBlur={_handleBlur}
				/>
			</div>
		)
	} else {
		return(
			<div className="EditableTextField" onClick={_handleClick}>
				<EditableStatusIndicator editable={props.allowEdit} />
				{props.value}
			</div>
		)
	}
}

EditableTextField.propTypes = {
	allowEdit: PropTypes.bool,
	value: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}

EditableTextField.defaultProps = {
	allowEdit: true,
}

export default EditableTextField;