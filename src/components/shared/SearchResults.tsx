import { Models } from 'appwrite';
import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document;
}

const SearchResults = ({isSearchFetching, searchedPosts}: SearchResultProps) => {
    
    if(searchedPosts && isSearchFetching) return <Loader/>
    if(searchedPosts.documents.length > 0){
        return (
        <GridPostList posts={searchedPosts.documents}/>
    )
    }
    return (
    <p className='text-light-4 mt-10 text-center w-full'> No Results Found </p>

  )
}

export default SearchResults