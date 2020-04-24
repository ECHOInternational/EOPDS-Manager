import React from 'react';
import {Button} from 'reactstrap';

export function SaveButton(props){
	const text = props.saving ? "Saving..." : "Save";
	const color = props.canSave ? "success" : "danger";


	return(
		<Button 
			onClick={props.onClick}
			disabled={!props.hasChanges || !props.canSave || props.saving}
			outline={!props.hasChanges || !props.canSave} 
			color={color}
		>
			{text}
		</Button>
	)
}

export function RevertButton(props){
	if(props.hasChanges){
		return <Button onClick={props.onClick} color="link">Revert Changes</Button>
	}else {
		return <span></span>
	}
}