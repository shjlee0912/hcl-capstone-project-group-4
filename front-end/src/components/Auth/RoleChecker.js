import React from 'react';
import { useSelector } from 'react-redux';

export const RoleChecker = ({role, children}) => {
    const user = useSelector(state => state.auth.user);

    return <>{user&&user.roles.includes(role)?children:null}</>
}