import {useState} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import {Link as RouterLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import {useAuth} from "../../AuthContext.tsx";

interface RouteData {
    name: string;
    path: string;
}

const routes: RouteData[] = [
    {name: "Home", path: "/"},
    {name: "Quizzes", path: "/quizzes"},
    {name: "Users", path: "/users"},
    {name: "Profile", path: "/profile"},
];

const LoginLogout: React.FC<{ token: string | null; logout: () => void }> = ({token, logout}) => (
    <>
        {token ? (
            <li>
                <button className="inline" onClick={logout}>
                    Logout
                </button>
            </li>
        ) : (
            <li>
                <RouterLink to="/login">Login</RouterLink>
            </li>
        )}
    </>
);

export const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);
    const {token, logout} = useAuth();

    return (
        <div className={styles.navbar}>
            <RouterLink to="/" className="absolute top-4 left-8 text-3xl">
                ./whoami
            </RouterLink>

            <div onClick={handleClick} className={styles.toggle}>
                {!nav
                    ? <FaBars className='text-black'/>
                    : <FaTimes className='text-white'/>}
            </div>

            <ul className={!nav ? 'hidden' : styles.navLinks}>
                {routes.map((route, index) => (
                    <li key={index}>
                        <RouterLink to={route.path} onClick={handleClick}>
                            {route.name}
                        </RouterLink>
                    </li>
                ))}
                <LoginLogout token={token} logout={logout}/>
            </ul>
        </div>
    );
};