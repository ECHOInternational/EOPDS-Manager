import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { SaveButton, RevertButton } from '../../components/FormActionButtons';
import EditableTextField from '../../components/EditableTextField';
import WysiwygCard from '../../components/WysiwygCard';
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
	const [updateCategory] = useMutation(UPDATE_CATEGORY);

	const defaultValues = {
		name: props.category.name,
		description: props.category.description
	}

	const { register, handleSubmit, errors, formState, reset, control } = useForm({
		defaultValues,
		mode: 'onChange'
	});

	const { dirty, dirtyFields, isSubmitting, isValid } = formState;
	const onSubmit = data => { console.log(data) }

	return(
		<form onSubmit={handleSubmit(onSubmit)}>
			<PreventTransitionPrompt
	          when={dirty}
	          title="Category Not Saved"
	          message={`Do you want to save the changes made to "${props.category.name}"?`}
	          onSave={handleSubmit(onSubmit)}
	        />
			<Row>
				<Col xs="12">
					<Card>
						<CardBody>
						<Controller
							as={EditableTextField}
							name="name"
							control={control}
							rules={{
								required: true,
								pattern: /\S/
							}}
							placeholder = "Enter a category name"
							allowEdit = {true}
							error={errors.description}
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
						rules={{
							required: true,
							pattern: /\S/
						}}
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
							<SaveButton hasChanges={dirty} canSave={isValid} saving={false} onClick={handleSubmit(onSubmit)}/>
							
							<RevertButton hasChanges={dirty} onClick={() => {reset(defaultValues)}}/>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</form>
	)
}
export default CategoryForm;