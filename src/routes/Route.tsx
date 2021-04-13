import React from 'react';
import {
  RouteProps as ReactDomRouteProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDomRouteProps {
  isPravite?: boolean;
  component: React.ComponentType;
}
const Route: React.FC<RouteProps> = ({
  isPravite = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPravite === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPravite ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
