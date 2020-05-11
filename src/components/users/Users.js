import React from 'react';
import PropTypes from 'prop-types';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = ({ loading, users }) => {

    if (loading) {
        return <Spinner />
    }
    else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} login={user.login} avatar_url={user.avatar_url} html_url={user.html_url} />
                ))}
            </div>
        )
    }


}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

Users.propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
}

export default Users;
