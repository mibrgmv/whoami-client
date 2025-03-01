import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);
    const { user, logout } = useAuth();

    return (
        <div className='absolute top-0 min-h-20 w-full flex justify-between items-center text-sm text-white bg-black'>
            <div>
                <span className='text-3xl my-5 ms-5 md:ms-[5vw]'>.testapp</span>
            </div>

            <ul className='hidden md:flex justify-center list-none'>
                <li className='my-5 me-[5vw] no-underline cursor-pointer hover:underline'>
                    <RouterLink to='/'>Home</RouterLink>
                </li>
                <li className='my-5 me-[5vw] no-underline cursor-pointer hover:underline'>
                    <RouterLink to='/users'>Users</RouterLink>
                </li>
                <li className='my-5 me-[5vw] no-underline cursor-pointer hover:underline'>
                    <RouterLink to='/profile'>Profile</RouterLink>
                </li>
                {user ? (
                    <li className='my-5 me-[5vw] no-underline cursor-pointer hover:underline'>
                        <button className='inline' onClick={logout}>Logout</button>
                    </li>
                ) : (
                    <li className='my-5 me-[5vw] no-underline cursor-pointer hover:underline'>
                        <RouterLink to='/login'>Login</RouterLink>
                    </li>
                )}
            </ul>

            <div onClick={handleClick} className='md:hidden z-10 cursor-pointer my-5 me-5'>
                {!nav ? <FaBars /> : <FaTimes />}
            </div>

            <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-black text-white flex flex-col justify-center items-center'}>
                <li className='my-6 text-4xl cursor-pointer hover:underline'>
                    <RouterLink onClick={handleClick} to='/'>Home</RouterLink>
                </li>
                <li className='my-6 text-4xl cursor-pointer hover:underline'>
                    <RouterLink onClick={handleClick} to='/users'>Users</RouterLink>
                </li>
                <li className='my-6 text-4xl cursor-pointer hover:underline'>
                    <RouterLink onClick={handleClick} to='/profile'>Profile</RouterLink>
                </li>
                {user ? (
                    <li className='my-6 text-4xl cursor-pointer hover:underline'>
                        <button onClick={logout}>Logout</button>
                    </li>
                ) : (
                    <li className='my-6 text-4xl cursor-pointer hover:underline'>
                        <RouterLink onClick={handleClick} to='/login'>Login</RouterLink>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;