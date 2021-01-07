import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row } from 'reactstrap';
import { SaveButton, RevertButton } from '../../components/FormActionButtons';
import EditableTextField from '../../components/EditableTextField';
import WysiwygCard from '../../components/WysiwygCard';
import RevisionCollapse from '../../components/RevisionCollapse';
import { gql, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form'
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
	const [
		updateCategory,
		{
			loading: formIsSaving
		}
	] = useMutation(UPDATE_CATEGORY);

	const defaultValues = {
		name: props.category.name,
		description: props.category.description
	}

	const { handleSubmit, errors, formState, reset, control, setValue } = useForm({
		defaultValues,
		mode: 'onChange'
	});

	const { dirty, dirtyFields, isValid } = formState;

	const onSubmit = data => {
		updateCategory({
			variables: {
				id: props.category.id,
				name: data.name,
				description: data.description,
			}
		});
		reset(data);
	}

	let [currentRevision, setCurrentRevision] = useState('');

	const _loadRevision = (revision) => {
		setCurrentRevision(revision.id);
		setValue([
			{name: revision.name},
			{description: revision.description}
		]);
	}

	const _revert = () => {
		reset(defaultValues);
		setCurrentRevision('');
	}

	const _statusClass = ({error, dirty}) => {
		if(error){ return "card-accent-danger" };
		if(dirty){ return "card-accent-success" };
		return "";
	}

	return(
		<form>
			<PreventTransitionPrompt
	          when={dirty}
	          title="Category Not Saved"
	          message={`Do you want to save the changes made to "${props.category.name}"?`}
	          onSave={handleSubmit(onSubmit)}
	        />
			<Row>
				<Col xs="12">
					<Card className={_statusClass({error: errors.name, dirty: dirtyFields.has("name")})}>
						<CardBody>
						<Controller
							as={EditableTextField}
							name="name"
							control={control}
							rules={{
								required: {value: true, message: "must not be blank"}
							}}
							placeholder = "Enter a category name"
							allowEdit = {true}
							error={errors.name}
							hasChanges={dirtyFields.has("name")}
						/>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col xs="12" sm="8">
					<Controller
						as={WysiwygCard}
						name="description"
						control={control}
						label="Description"
						allowEdit={true} 
						showWordCount={true}
						error={errors.description}
						hasChanges={dirtyFields.has("description")}
						placeholder="Enter a description"
						/>
				</Col>
				<Col xs="12" sm="4">
					<Card className="card-accent-info">
						<CardHeader>
							Status
						</CardHeader>
						<CardBody>
							<SaveButton isNew={false} hasChanges={dirty} canSave={isValid} saving={formIsSaving} onClick={handleSubmit(onSubmit)}/>		
							<RevertButton hasChanges={dirty} onClick={_revert}/>
						</CardBody>
							<RevisionCollapse revisions={props.category.versions} onSelect={_loadRevision} selected={currentRevision}/>

						<CardFooter>
							Owner: {props.category.createdBy}
						</CardFooter>
					</Card>
				</Col>
			</Row>
		</form>
	)
}
export default CategoryForm;