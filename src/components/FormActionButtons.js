import React from 'react';
import {Button} from 'reactstrap';

export function SaveButton(props){
	let text = "Save"
	if(props.saving){text = "Saving..."}
	if(!props.isNew && !props.hasChanges){text = "Saved"};

	let color = "success"
	if(!props.canSave){color = "danger"}
	if(!props.isNew && !props.hasChanges){color = "info"};

	return(
		<Button 
			onClick={props.onClick}
			disabled={!props.hasChanges || !props.canSave}
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