import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";


function ProtectedRouteElement({ element, onlyUnAuth }) {
  const user = useSelector((state) => state.user.user);

  const location = useLocation();

  if (onlyUnAuth) {
    return !user.name ? element : ((location.state && location.state.from) ? <Navigate to={location.state.from.pathname} /> : <Navigate to='/'/>);
  } else {
    return user.name ? element : <Navigate to="/login" state={{from: location}} replace/>;
  }
}

export default ProtectedRouteElement;

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};