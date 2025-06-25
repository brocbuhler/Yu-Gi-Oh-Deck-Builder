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
            left: openNavbar ? '300px' : '0',
            zIndex: 1100,
            padding: '0.5rem 1rem',
            backgroundColor: '#ff8c00',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2rem',
            boxShadow: '1px 1px 4px rgba(0,0,0,0.5)',
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'left 0.3s ease-in-out', 
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
