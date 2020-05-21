import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, searchedUsers, clearInput, setAlert }) => {
    const [text, setText] = useState('');



    const onChange = (e) => setText(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please Enter the Name', 'light');
        }
        else {
            searchUsers(text);
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
    searchUsers: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    searchedUsers: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search;
