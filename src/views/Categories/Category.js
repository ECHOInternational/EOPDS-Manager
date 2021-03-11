import React, {useState} from 'react';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { TabContent, Nav, NavItem, NavLink, TabPane} from 'reactstrap';
import classnames from 'classnames';
import CategoryForm from './CategoryForm';
import CategoryTranslationsForm from './CategoryTranslationsForm'
import PlantList from './PlantList'
import { userCurrentLanguage } from '../../cache';

const GET_CATEGORY = gql`
  query Category($id: ID!, $language: String, $afterCursor: String) {
    category(id: $id, language: $language) {
			id
			name
			description
			createdBy
			translations {
				locale
				name
				description
			}
			plants(first: 4, after: $afterCursor){
				totalCount
				edges{
					node{
						id
						primaryCommonName
						scientificName
					}
				}
			}
		}
  }
`

const Category = (props) => {
	const language = useReactiveVar(userCurrentLanguage);

	const [userCanEdit, setUserCanEdit] = useState(false);

	const {match: {params} } = props;
	const {id} = params;

	const [activeTab, setActiveTab] = useState('edit');

	const toggle = tab => {
		if(activeTab !== tab) setActiveTab(tab);
	}

	const { loading, error, data } = useQuery(GET_CATEGORY, {
		variables: {
			id,
			language: language,
		},
		// fetchPolicy: 'network-only',
		onCompleted: (data) => {
			setUserCanEdit(true); //TODO! This needs to check if user can edit. 
		},
	});

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`
	if (!data) return 'Category Not Found.'

	return (
		<div>
		<Nav tabs>
			<NavItem>
				<NavLink
					className={classnames({active: activeTab === 'edit'})}
					onClick={() => { toggle('edit');}}
				>
					View/Edit
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					className={classnames({active: activeTab === 'translate'})}
					onClick={() => { toggle('translate');}}
				>
					Translate
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					className={classnames({active: activeTab === 'plants'})}
					onClick={() => { toggle('plants');}}
				>
					Plants
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					className={classnames({active: activeTab === 'pictures'})}
					onClick={() => { toggle('pictures');}}
				>
					Pictures
				</NavLink>
			</NavItem>
		</Nav>
		<TabContent activeTab={activeTab}>
			<TabPane tabId='edit'>
				<CategoryForm
					category={data.category}
					allowEdit={userCanEdit}
				/>
			</TabPane>
			<TabPane tabId='translate'>
			<CategoryTranslationsForm
					category={data.category}
					allowEdit={userCanEdit}
				/>
				<div>Something</div>
			</TabPane>
			<TabPane tabId='plants'>
				<PlantList
					count={data.category.plants.totalCount}
					plants={data.category.plants.edges}
				/>
			</TabPane>
			<TabPane tabId='pictures'>
				put pictures here.
			</TabPane>
		</TabContent>
		</div>
	);
}

export default Category;