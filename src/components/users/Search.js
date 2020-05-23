import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ searchedUsers, clearInput, setAlert }) => {
    const githubContext = useContext(GithubContext);
    const [text, setText] = useState('');



    const onChange = (e) => setText(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please Enter the Name', 'light');
        }
        else {
            githubContext.searchUsers(text);
            setText('')
        }

    }
    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' name='text' placeholder='Search Users...'
                    value={text} onChange={onChange} />
                <input type='submit' value='search' className='btn btn-dark btn-block' />
            </form>
            {searchedUsers && <button className='btn btn-light btn-block' onClick={clearInput}>Clear</button>}
        </div>
    )
}
Search.propTypes = {
    clearInput: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    searchedUsers: PropTypes.bool.isRequired
}

export default Search;
