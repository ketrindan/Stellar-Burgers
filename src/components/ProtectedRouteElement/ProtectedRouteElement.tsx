import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "../../services/hooks";
import { IProtectedRoute } from '../../utils/types';

const ProtectedRouteElement: FC<IProtectedRoute> = ({ element, onlyUnAuth }) => {
  const user = useSelector((state) => state.user.user);

  const location = useLocation();

  if (onlyUnAuth) {
    return !user ? element : ((location.state && location.state.from) ? <Navigate to={location.state.from.pathname} /> : <Navigate to='/'/>);
  } else {
    return user ? element : <Navigate to="/login" state={{from: location}} replace/>;
  }
}

export default ProtectedRouteElement;