import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row } from 'reactstrap';
import { SaveButton, RevertButton } from '../../components/FormActionButtons';
import EditableTextField from '../../components/EditableTextField';
import WysiwygCard from '../../components/WysiwygCard';
import { gql, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form'
import PreventTransitionPrompt from "../../components/PreventTransitionPrompt";

const UPDATE_CATEGORY = gql`
	mutation UpdateCategory($input: UpdateCategoryInput!){
		updateCategory(input: $input){
			category{
				id
				name
				description
			}
		}
	}
`

const CategoryForm = (props) => {
	const [
		updateCategory,
		{
			loading: formIsSaving,
		}
	] = useMutation(UPDATE_CATEGORY);

	const defaultValues = {
		name: props.category.name,
		description: props.category.description
	}

	const { handleSubmit, errors, formState, reset, control, setError } = useForm({
		defaultValues,
		mode: 'onChange'
	});

	const { isDirty, dirtyFields, isValid } = formState;

	const onSubmit = data => {
			updateCategory({
				variables: {
					input:{
						categoryId: props.category.id,
						name: data.name,
						description: data.description
					}
				}
			}).then((res) => {
				reset(res.data.updateCategory.category)
			}).catch((res) => {
				setError("general", {type: "manual", message: res.message})
				console.log(res.message)
			});
	}


	const _revert = () => {
		reset(defaultValues);
	}

	const _statusClass = ({error, dirty}) => {
		if(error){ return "card-accent-danger" };
		if(dirty){ return "card-accent-success" };
		return "";
	}



	return(
		<form>
			<PreventTransitionPrompt
	          when={isDirty}
	          title="Category Not Saved"
	          message={`Do you want to save the changes made to "${props.category.name}"?`}
	          onSave={handleSubmit(onSubmit)}
	        />
			<Card>
				<CardBody>
			<Row>
				<Col xs="12">
					<Card className={_statusClass({error: errors.name, dirty: dirtyFields.name})}>
						<CardBody>
						<Controller
							name="name"
							control={control}
							rules={{
								required: {value: true, message: "must not be blank"}
							}}
							render={({ onChange, onBlur, value, name, ref }) => (
								<EditableTextField
									onBlur={onBlur}
									onChange={onChange}
									value={value}
									name={name}
									refs={ref}
									placeholder = "Enter a category name"
									allowEdit = {props.allowEdit}
									error={errors.name}
									hasChanges={dirtyFields.name}
								/>
							)}
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
						allowEdit={props.allowEdit} 
						showWordCount={true}
						error={errors.description}
						hasChanges={dirtyFields.description}
						placeholder="Enter a description"
						/>
				</Col>
				<Col xs="12" sm="4">
					<Card className="card-accent-info">
						<CardHeader>
							Status
						</CardHeader>
						<CardBody>
							<SaveButton isNew={false} hasChanges={isDirty} canSave={isValid} saving={formIsSaving} onClick={handleSubmit(onSubmit)}/>		
							<RevertButton hasChanges={isDirty} onClick={_revert}/>
							{errors.general && <p>{errors.general.message}</p>}
						</CardBody>
						<CardFooter>
							Owner: {props.category.createdBy}
						</CardFooter>
					</Card>
				</Col>
			</Row>
			</CardBody>
			</Card>
		</form>
	)
}

export default CategoryForm;
