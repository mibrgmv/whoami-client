import {useState} from 'react';
import {useAuth} from "../../AuthContext.tsx";
import {Logo} from "./navbar/Logo.tsx";
import {ToggleButton} from "./navbar/ToggleButton.tsx";
import {NavLinks} from "./navbar/NavLinks.tsx";

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

export const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);
    const {authTokens, removeAuthTokens} = useAuth();

    return (
        <div>
            <Logo/>
            <ToggleButton nav={nav} handleClick={handleClick}/>
            <NavLinks
                nav={nav}
                routes={routes}
                handleClick={handleClick}
                token={authTokens?.accessToken}
                logout={removeAuthTokens}
            />
        </div>
    );
};