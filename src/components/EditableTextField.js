import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input } from 'reactstrap';
import EditableStatusIndicator from './EditableStatusIndicator';
import './EditableTextField.css';


class EditableTextField extends Component {
	state = {
		isEditing: (this.props.allowEdit && this.props.value === ''),
	}
	static defaultProps = {
		allowEdit: true,
	}

	static propTypes = {
		allowEdit: PropTypes.bool,
		value: PropTypes.string,
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		onChange: PropTypes.func.isRequired,
	}

	_handleClick = () => {
		this.setState({isEditing: this.props.allowEdit});
	}

	_handleBlur = () => {
		if(this.props.value !== ''){
			this.setState({isEditing: false});
		}
	}



	render(){
		const isEditing = this.state.isEditing;
		if(isEditing){
			return(
				<div className="EditableTextField" >
					<Input
						autoFocus
						value={this.props.value}
						bsSize="lg"
						type="text"
						id="name"
						name={this.props.name}
						className="input-lg"
						placeholder={this.props.placeholder}
						onChange={this.props.onChange}
						onBlur={this._handleBlur}
					/>
				</div>
			)
		}else{
			return(
				<div className="EditableTextField" onClick={this._handleClick}>
					<EditableStatusIndicator editable={this.props.allowEdit} />
					{this.props.value}
				</div>
			)
		}
	}
}

export default EditableTextField;