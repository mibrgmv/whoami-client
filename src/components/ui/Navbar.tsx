import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);
    const { token, logout } = useAuth();

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                ./whoami
            </div>

            <ul className={styles.navLinks}>
                <li>
                    <RouterLink to='/'>Home</RouterLink>
                </li>
                <li>
                    <RouterLink to='/users'>Users</RouterLink>
                </li>
                <li>
                    <RouterLink to='/profile'>Profile</RouterLink>
                </li>
                {token ? (
                    <li>
                        <button className='inline' onClick={logout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <RouterLink to='/login'>Login</RouterLink>
                    </li>
                )}
            </ul>

            <div onClick={handleClick} className={styles.mobileIcon}>
                {!nav ? <FaBars /> : <FaTimes />}
            </div>

            <ul className={!nav ? 'hidden' : styles.navLinksMobile}>
                <li>
                    <RouterLink onClick={handleClick} to='/'>Home</RouterLink>
                </li>
                <li>
                    <RouterLink onClick={handleClick} to='/users'>Users</RouterLink>
                </li>
                <li>
                    <RouterLink onClick={handleClick} to='/profile'>Profile</RouterLink>
                </li>
                {token ? (
                    <li>
                        <button className='inline' onClick={logout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <RouterLink onClick={handleClick} to='/login'>Login</RouterLink>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;