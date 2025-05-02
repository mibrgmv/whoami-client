import { useState } from "react";
import { Logo } from "./Logo.tsx";
import { ToggleButton } from "./ToggleButton.tsx";
import { NavLinks } from "./NavLinks.tsx";
import { useAuth } from "../../../AuthContext.tsx";

interface RouteData {
  name: string;
  path: string;
}

const routes: RouteData[] = [
  { name: "Home", path: "/" },
  { name: "Quizzes", path: "/quizzes" },
  { name: "Users", path: "/users" },
  { name: "Profile", path: "/profile" },
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const { authTokens, logout } = useAuth();

  return (
    <div>
      <Logo />
      <ToggleButton nav={nav} handleClick={handleClick} />
      <NavLinks
        nav={nav}
        routes={routes}
        handleClick={handleClick}
        token={authTokens?.accessToken}
        logout={logout}
      />
    </div>
  );
};
