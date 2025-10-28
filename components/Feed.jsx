"use client";
import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';
import { useDebounce } from 'react-use';


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map( (post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}

    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useDebounce(() => setDebouncedSearchText(searchText), 500, [searchText])

  useEffect( () => {
    const fetchPosts = async (query) => {
      const response = query ? await fetch(`/api/prompt/?q=${encodeURIComponent(query)}`) : await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts(searchText);
  }, [debouncedSearchText]);

  const handleTagClick = async (tag) => {
    const response = await fetch(`/api/prompt/?tag=${encodeURIComponent(tag)}`);
    const data = await response.json();
    setPosts(data);
  }
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value= {searchText}
          onChange= {handleSearchChange}
          required
          className="search_input peer"/>
      </form>
      <PromptCardList
        data = {posts}
        handleTagClick={handleTagClick}
        setPosts={setPosts}
        />
    </section>
  )
}

export default Feed