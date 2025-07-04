import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import NavBar from '@/components/NavBar';
import { useState } from 'react';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const { user, userLoading } = useAuth();
  const [ openNavbar, setOpenNavbar ] = useState(false)

  if (userLoading) {
    return <Loading />;
  }

  if (user) {
    return (
      <>
        <NavBar toggled={openNavbar} />
        <button onClick={() => setOpenNavbar(!openNavbar)}
          style={{
            position: 'fixed',
            outline: 'none',
            boxShadow: 'none',
            left: openNavbar ? '300px' : '0',
            zIndex: 1100,
            padding: '0.5rem 1rem',
            border: 'none',
            backgroundColor: '#da8804',
            color: 'white',
            borderRadius: '0% 65% 65% 0%',
            fontSize: '1.2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'left 0.3s ease-in-out', 
            height: '15%', 
          }}
        >
          {openNavbar && (
            <>{'<'}</>
          )}
          {!openNavbar && (
            <>{'>'}</>
          )}
        </button> 
        {children}
      </>
    );
  }

  return <SignIn />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
