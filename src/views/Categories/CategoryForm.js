import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { SaveButton, RevertButton } from '../../components/FormActionButtons';
import EditableTextField from '../../components/EditableTextField';
import WysiwygCard from '../../components/WysiwygCard';
import { gql, useMutation } from '@apollo/client';
import PreventTransitionPrompt from "../../components/PreventTransitionPrompt";


const UPDATE_CATEGORY = gql`
	mutation UpdateCategory($id: ID!, $name: String, $description: String, $language: String){
		updateCategory(categoryId: $id, name: $name, description: $description, language: $language){
			id
			name
			description
		}
	}
`

const CategoryForm = (props) => {
	const [updateCategory] = useMutation(UPDATE_CATEGORY);

	// Each input gets state to track changes
	const [name, setName] = useState(props.category.name);
	const [description, setDescription] = useState(props.category.description);
	const [nameErr, setNameErr] = useState(props.category.name);
	const [descriptionErr, setDescriptionErr] = useState(props.category.description);


	const [errors, setErrors] = useState([]);

	const [dirtyFields, setDirtyFields] = useState([]);

	const _updateRecordState = () => {
		// Identify changed fields
		let fieldsWithChanges = [];
		if(name !== props.category.name){fieldsWithChanges.push('name')};
		if(description !== props.category.description){fieldsWithChanges.push('description')};
		setDirtyFields(fieldsWithChanges);

		

		setNameErr(validateNotBlank(name));
		setDescriptionErr(validateNotBlank(description));
	};

	const validateNotBlank = (value) => {
		if(!RegExp(/\S/).test(value)){return('cannot be blank.');}
	};

	const _revert = () => {
		setName(props.category.name);
		setDescription(props.category.description);
	};

	const _save = () => {
		updateCategory({variables: { id: props.category.id, }})
	}

	useEffect( _updateRecordState, [name, description]);

	return(
		<div>
			<PreventTransitionPrompt
	          when={dirtyFields.length > 0}
	          title="Category Not Saved"
	          message={`Do you want to save the changes made to "${props.category.name}"?`}
	          onSave={()=> { console.log('save Clicked.')}}
	        />
			<Row>
				<Col xs="12">
					<Card className={dirtyFields.includes('name') ? "card-accent-success" : ""}>
						<CardBody>
							<EditableTextField
								name = "Name"
								value = {name}
								placeholder = "Enter a category name"
								onChange = {setName}
								allowEdit = {props.allowEdit}
								hasChanges = {dirtyFields.includes('name')}
								error={nameErr}
							/>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col xs="12" sm="8">
					<WysiwygCard
						name = "Description"
						value = {description}
						placeholder = "Enter a description"
						onChange = {setDescription}
						allowEdit = {props.allowEdit}
						hasChanges = {dirtyFields.includes('description')}
						showWordCount = {true}
						error={descriptionErr}
					/>
				</Col>
				<Col xs="12" sm="4">
					<Card className="card-accent-info">
						<CardHeader>
							Status
						</CardHeader>
						<CardBody>
							<SaveButton hasChanges={dirtyFields.length > 0} canSave={!(errors.length > 0)} saving={false} onClick={_save}/>
							<RevertButton hasChanges={dirtyFields.length > 0} onClick={_revert}/>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
export default CategoryForm;