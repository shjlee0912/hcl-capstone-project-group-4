import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';

export const AuthRoute = ({role, path, children}) => {
    const user = useSelector(state => state.auth.user);

    return (<>
        {user&&user.roles.includes(role)
            ?<Route path={path}>
                {children}
            </Route>
            :<h4>You have not authenticated with the proper role to access this page</h4>
        }
    </>)
}