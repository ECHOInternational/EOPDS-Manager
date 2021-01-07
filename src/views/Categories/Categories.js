import React from 'react';
import useStickyState from '../../components/hooks/useStickyState';
import { ListGroupItem, Card, CardBody } from 'reactstrap';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import ListControlNavbar from '../../components/ListControlNavbar';
import { gql, useQuery, useMutation } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroller';
import ListItemLoader from '../../loaders/ListItemLoader';
import TileLoader from '../../loaders/TileLoader';
import TileGridLoader from '../../loaders/TileGridLoader';
import { useTranslation } from 'react-i18next';
import './categories.scss';

const GET_CATEGORIES = gql`
	query Categories($cursor: String, $sortDirection: SortDirection, $name: String, $language: String){
		categories(first: 4, after: $cursor, sortDirection: $sortDirection, name: $name, language: $language) @connection(key: "categories"){
		    totalCount
		    edges{
		   	  node {
		        id
		        name
		      }
		    }
	    	pageInfo {
	    		endCursor
	    		hasNextPage
	    	}
	    }
	}
`

const DELETE_CATEGORY = gql`
	mutation DeleteCategory($id: ID!){
		deleteCategory(categoryId: $id){
			categoryId
		}
	}
`

const Categories = (props) => {
	const [alphaSortDirection, setAlphaSortDirection] = useStickyState('ASC', 'categoryListSort');
	const [listMode, setListMode] = useStickyState('list', 'categoryListMode');
	const [searchText, setSearchText] = useStickyState('', 'categoryListSearchText');

	const { i18n } = useTranslation('languages');

	const _onCategoryClick = (id) => {
		props.history.push(`/categories/${id}`);
	}

	const _onAddCategoryClick = () => {
		props.history.push('categories/new');
	}

	return(
		<React.Fragment>
			<ListControlNavbar
				title="Plant Categories"
				alphaSort={alphaSortDirection}
				listMode={listMode}
				addButtonText="Add Category"
				onSetAlphaSort={setAlphaSortDirection}
				onAddButtonClick={_onAddCategoryClick}
				onSetMode={setListMode}
				onSearchTextChange={setSearchText}
				searchText={searchText}
			/>
			<CategoriesList
				onClick={_onCategoryClick}
				alphaSort={alphaSortDirection}
				mode={listMode}
				name={searchText}
				language={i18n.language}
			/>
			
		</React.Fragment>
	);
};


const CategoriesList = (props) => {

	// console.log(currentLanguage);
	const {loading, error, data, fetchMore } = useQuery(
		GET_CATEGORIES,
		{
			variables: {
				sortDirection: props.alphaSort,
				name: props.name,
				language: props.language
			},
			fetchPolicy: 'network-only',
			context: {
				debounceKey: 'listsearchdebounce',
				debounceTimeout: 100,
			}
		}
	);

	const [deleteCategory] = useMutation(
		DELETE_CATEGORY,
		{
			update(cache, { data: { deleteCategory } }) {
				const { categories } = cache.readQuery({ query: GET_CATEGORIES });
				cache.writeQuery({
					query: GET_CATEGORIES,
					data: { categories:
						{
							totalCount: categories.totalCount - 1,
							edges: categories.edges.filter((edge) => edge.node.id !== deleteCategory.categoryId),
							pageInfo: categories.pageInfo
						}
					},
				});
			}
		}
	);


	if (loading && props.mode === 'grid') return <TileGridLoader />;
	if (loading) return <ListItemLoader />;

	if (error) return `Error! ${error.message}`

	const _onCategoryDelete = (id) => {
		deleteCategory({variables: {id}});
	}

	const onLoadMore = () => {
        fetchMore({
          variables: {
            cursor: data.categories.pageInfo.endCursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.categories.edges;
            const pageInfo = fetchMoreResult.categories.pageInfo;
            const totalCount = fetchMoreResult.categories.totalCount
            return newEdges.length
              ? {
                  // Put the new categories at the end of the list and update `pageInfo`
                  // so we have the new `endCursor` and `hasNextPage` values
                  categories: {
                    __typename: previousResult.categories.__typename,
                    edges: [...previousResult.categories.edges, ...newEdges],
                    pageInfo,
                    totalCount
                  }
                }
              : previousResult;
          }
        })
      }

	if(props.mode === 'grid'){
		return (
				<InfiniteScroll
					loadMore={onLoadMore}
					hasMore={data.categories.pageInfo.hasNextPage}
					loader={<TileLoader key={0}/>}
					className="card-grid mb-4"
				>
						{data.categories.edges.map(category => (
							<CategoryCard
								key={category.node.id}
								id={category.node.id}
								name={category.node.name}
								onClick={props.onClick}
								onDelete={_onCategoryDelete}
							/>
						))}
				</InfiniteScroll>
		)
	}else{
		return(
				<InfiniteScroll
					loadMore={onLoadMore}
					hasMore={data.categories.pageInfo.hasNextPage}
					loader={<ListItemLoader key={0} />}
					className='mb-4 list-group list-group-flush'
					element='ul'
				>
					{data.categories.edges.map(category => (
						<CategoryListGroupItem
							key={category.node.id}
							id={category.node.id}
							name={category.node.name}
							onClick={props.onClick}
							onDelete={_onCategoryDelete}
						/>
					))}
				</InfiniteScroll>
		)
	}
}

const CategoryListGroupItem = (props) => {
	return(
		<ListGroupItem onClick={() => props.onClick(props.id) } className="d-flex justify-content-between animated fadeIn" tag="a" style={{cursor: 'pointer'}} action>
			{props.name}
			<DeleteConfirmationModal
				itemName={props.name}
				onConfirmDelete={() => props.onDelete(props.id)}
			/>
		</ListGroupItem>
	)
}

const CategoryCard = (props) =>{
	return(
		<Card className="card-grid-item animated fadeIn" onClick={() => props.onClick(props.id) } style={{cursor: 'pointer'}}>
			<img className="card-img-top animated fadeIn" src={`https://picsum.photos/seed/${props.id}/600/360`} alt='' />
			<CardBody>
				<h5 className="card-title">{props.name}</h5>
				<DeleteConfirmationModal
					itemName={props.name}
					onConfirmDelete={() => props.onDelete(props.id)}
				/>
			</CardBody>
		</Card>
	)
}



export default Categories;