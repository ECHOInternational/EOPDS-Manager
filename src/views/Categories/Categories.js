import React from 'react';
import useStickyState from '../../components/hooks/useStickyState';
import { ListGroupItem, Card, CardBody } from 'reactstrap';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import ListControlNavbar from '../../components/ListControlNavbar';
import { useQuery, useMutation } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroller';
import ListItemLoader from '../../loaders/ListItemLoader';
import TileLoader from '../../loaders/TileLoader';
import TileGridLoader from '../../loaders/TileGridLoader';
import { useReactiveVar } from '@apollo/client';
import { userCurrentLanguage } from '../../cache';
import { GET_COUNTS } from '../../queries/counters';
import { GET_CATEGORIES } from '../../queries/categories'
import { DELETE_CATEGORY } from '../../mutations/categories'

import './categories.scss';

const Categories = (props) => {
	const language = useReactiveVar(userCurrentLanguage);

	const [alphaSortDirection, setAlphaSortDirection] = useStickyState('ASC', 'categoryListSort');
	const [listMode, setListMode] = useStickyState('list', 'categoryListMode');
	const [searchText, setSearchText] = useStickyState('', 'categoryListSearchText');

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
				language={language}
			/>
			
		</React.Fragment>
	);
};


const CategoriesList = (props) => {

	const {loading, error, data, fetchMore } = useQuery(
		GET_CATEGORIES,
		{
			variables: {
				sortDirection: props.alphaSort,
				name: props.name,
				language: props.language,
			},
			// fetchPolicy: 'network-only',
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
				const { categories } = cache.readQuery({
					query: GET_CATEGORIES,
					variables: {
						sortDirection: props.alphaSort,
						name: props.name,
						language: props.language,
					}
				});

				cache.writeQuery({
					query: GET_COUNTS,
					data: {
						categories: {
							totalCount: categories.totalCount - 1
						}
					}
				});

				cache.writeQuery({
					query: GET_CATEGORIES,
					variables: {
						sortDirection: props.alphaSort,
						name: props.name,
						language: props.language,
					},
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
		deleteCategory({
			variables: {
				input: {
					categoryId: id
				}
			}
		});
	}

	const onLoadMore = () => {
		fetchMore({
          variables: {
            afterCursor: data.categories.pageInfo.endCursor
          }
    })
	}

	const FirstImage = (image_edges) => {
		const first_image_edge = image_edges[0]
		var img_obj = {url: 'https://picsum.photos/seed/404/600/360', alt: 'placeholder.'}
		if(first_image_edge) {
			img_obj.url = first_image_edge.node.baseUrl || ''
			img_obj.alt = first_image_edge.node.description || ''
		}
		return img_obj
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
								image={FirstImage(category.node)}
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
			<img className="card-img-top animated fadeIn" src={props.image.url} alt={props.image.alt} />
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