import React, { useState } from 'react';
import css from './SearchBar.module.css';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    const userInput = event.currentTarget.value.toLowerCase().trim();
    setQuery(userInput);

    console.log(query);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query === '') {
      Notify.info('Please enter a search query');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <FaSearch />
        </button>
        <input
          name="text-search"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default SearchBar;
