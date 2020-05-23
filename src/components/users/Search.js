import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = ({ setAlert }) => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

    const { searchUsers, searchedUsers, clearInput } = githubContext;

    const onChange = (e) => setText(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            alertContext.setAlert('Please Enter the Name', 'light');
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

export default Search;
