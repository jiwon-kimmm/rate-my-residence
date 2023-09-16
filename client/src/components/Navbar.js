import { Link, Navigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { NavbarContainer, LeftContainer, RightContainer, NavbarInnerContainer, NavbarLinkContainer, NavbarLink } from "./styles/Navbar.styled"

function Navbar() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    return (
        /*
        <NavbarContainer>
            <NavbarInnerContainer>
                <LeftContainer>
                    <Link to="/" class="text-white">RATEMYRESIDENCE</Link>
                </LeftContainer>
                <RightContainer>
                    <Link to="/add-uni">Add University</Link>
                    <NavbarLinkContainer>
                        {!cookies.access_token ? (<NavbarLink to="/auth"> Login/Register </NavbarLink>) : <button onClick={logout}> Logout </button>}
                    </NavbarLinkContainer>
                </RightContainer>
            </NavbarInnerContainer>
        </NavbarContainer>
        */

        <nav className="nav">
            <Link to="/" className="site-name" class="font-dmsans text-3xl p-3">
                RateMyResidence
            </Link>
            <ul>
                <div class="flex space-x-8 pt-4">
                <li class="font-dmsans text-xl">
                    <Link to="/add-uni">Add University</Link>
                </li>
                <li class="font-dmsans text-xl ">
                    {!cookies.access_token ? (<Link to="/auth"> Login/Register </Link>) : <button onClick={logout}> Logout </button>}
                </li>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;