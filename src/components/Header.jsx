import { Link } from "react-router-dom";

function Header() {

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/" className="logo">Createrra</Link>
            </div>
        </header>
    )
}

export default Header;