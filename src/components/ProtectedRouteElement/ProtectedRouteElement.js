import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";


function ProtectedRouteElement({ element }) {
  const user = useSelector((state) => state.user.user);

  const location = useLocation();
  
  return user.name ? element : <Navigate to="/login" state={{from: location}} replace/>;
}

export default ProtectedRouteElement;

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};