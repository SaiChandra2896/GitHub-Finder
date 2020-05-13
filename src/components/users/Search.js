import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearInput: PropTypes.func.isRequired,
        searchedUsers: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Please Enter the Name', 'light');
        }
        else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' })
        }

    }

    render() {
        const { searchedUsers } = this.props;
        return (
            <div>
                <form className='form' onSubmit={this.onSubmit}>
                    <input type='text' name='text' placeholder='Search Users...'
                        value={this.state.text} onChange={this.onChange} />
                    <input type='submit' value='search' className='btn btn-dark btn-block' />
                </form>
                {searchedUsers && <button className='btn btn-light btn-block' onClick={this.props.clearInput}>Clear</button>}
            </div>
        )
    }
}

export default Search;
