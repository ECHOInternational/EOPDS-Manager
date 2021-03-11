import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row } from 'reactstrap';
import { SaveButton, RevertButton } from '../../components/FormActionButtons';
import EditableTextField from '../../components/EditableTextField';
import WysiwygCard from '../../components/WysiwygCard';
import TranslationSelector from '../../components/TranslationSelector';
import { gql, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form'
import PreventTransitionPrompt from "../../components/PreventTransitionPrompt";
import { languages } from '../../languages';
import { useTranslation } from 'react-i18next';



const UPDATE_CATEGORY = gql`
	mutation UpdateCategory($input: UpdateCategoryInput!){
		updateCategory(input: $input){
			category{
				id
				name
				description
				translations{
					locale
					name
					description
				}
			}
		}
	}
`

const CategoryTranslationsForm = (props) => {
	const { i18n } = useTranslation('languages');
	const currentLanguage = languages.find(l => l.id === i18n.language) || languages.find(l => l.id === "en");

	const [
		updateCategory,
		{
			loading: formIsSaving,
		}
	] = useMutation(UPDATE_CATEGORY);

	const defaultValues = {
		language: 'es',
		name: props.category.name,
		description: props.category.description
	}

	const { handleSubmit, errors, formState, reset, control } = useForm({
		defaultValues,
		mode: 'onChange'
	});

	const { dirty, dirtyFields, isValid } = formState;

	const onSubmit = data => {
			updateCategory({
				variables: {
					input:{
						language: data.language,
						categoryId: props.category.id,
						name: data.name,
						description: data.description
					}
				}
			}).catch((res) => {
				console.log("Error was here.")
			}).then((res) => {
				reset(data);
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
			{/* <PreventTransitionPrompt
	          when={dirty}
	          title="Category Not Saved"
	          message={`Do you want to save the changes made to "${props.category.name}"?`}
	          onSave={handleSubmit(onSubmit)}
	        /> */}
			<Card>
				<CardHeader>
					<Controller
						control={control}
						name="Language"
						render={({ onChange, onBlur, value }) => (
							<TranslationSelector
								onChange={onChange}
								onBlur={onBlur}
								selected={value}
								translations={props.category.translations}
								currentLanguage={i18n.language}
							/>
						)}
					/>
				</CardHeader>
				<CardBody>
					<Row>
						<Col xs="12">
							<Card className={_statusClass({error: errors.name, dirty: dirtyFields.hasOwnProperty("name")})}>
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
											allowEdit = {true}
											error={errors.name}
											hasChanges={dirtyFields.hasOwnProperty("name")}
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
								allowEdit={true} 
								showWordCount={true}
								error={errors.description}
								hasChanges={dirtyFields.hasOwnProperty("description")}
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

export default CategoryTranslationsForm;
