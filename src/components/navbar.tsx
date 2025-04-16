import { Menu, Input, Dropdown } from "semantic-ui-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("movie");
    const navigate = useNavigate();
    const location = useLocation();

    // Clear search when navigating to home
    useEffect(() => {
        if (location.pathname === "/") {
            setSearchQuery("");
        }
    }, [location.pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}&type=${searchType}`);
        } else {
            navigate("/");
            setSearchQuery("");
        }
    };

    const handleTypeChange = (e: React.SyntheticEvent, { value }: any) => {
        setSearchType(value);
        if (location.pathname === "/search") {
            const searchParams = new URLSearchParams(location.search);
            const query = searchParams.get("q");
            if (query) {
                navigate(`/search?q=${encodeURIComponent(query)}&type=${value}`);
            }
        }
    };

    const menuItemStyle = {
        fontSize: "1.3rem", 
        color: '#fff',
        fontWeight: 'bold',
        padding: '0.8rem 1.2rem',
        transition: 'all 0.3s ease',
        background: 'transparent'
    };

    const buttonStyle = {
        background: 'transparent',
        color: '#fff',
        border: '2px solid #fff',
        borderRadius: '20px',
        padding: '8px 24px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    return (
        <Menu fixed="top" style={{
            background: 'linear-gradient(to right, #6a1b9a, #9c27b0)',
            margin: 0,
            borderRadius: 0,
            border: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '0.5rem 2rem',
            height: '70px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Menu.Item 
                as={Link} 
                to="/" 
                className="nav-link"
                style={menuItemStyle}
            >
                Home
            </Menu.Item>
            <Menu.Item 
                as={Link} 
                to="/rated" 
                className="nav-link"
                style={menuItemStyle}
            >
                Rated
            </Menu.Item>

            <Menu.Menu position="right" style={{ alignItems: 'center', height: '100%' }}>
                <Menu.Item style={{ padding: '0 1rem' }}>
                    <form onSubmit={handleSearch} style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        margin: 0,
                        background: 'rgba(255,255,255,0.15)',
                        padding: '0.5rem 1rem',
                        borderRadius: '25px',
                        alignItems: 'center'
                    }}>
                        <Dropdown
                            value={searchType}
                            options={[
                                { key: "movie", text: 'Movies', value: "movie" },
                                { key: "tv", text: 'TV Shows', value: "tv" }
                            ]}
                            onChange={handleTypeChange}
                            style={{ 
                                minWidth: '120px',
                                background: 'transparent',
                                color: '#fff',
                                border: 'none'
                            }}
                        />
                        <Input
                            icon={{
                                name: 'search',
                                link: true,
                                color: 'white',
                                onClick: () => {
                                    if (!searchQuery.trim()) {
                                        navigate("/");
                                        setSearchQuery("");
                                    }
                                }
                            }}
                            placeholder={`Search ${searchType === "movie" ? "Movies" : "TV Shows"}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                            style={{ width: '300px' }}
                        />
                    </form>
                </Menu.Item>
                {localStorage.getItem("guest_session_id") ? (
                    <Menu.Item style={{ padding: '0 0 0 1rem' }}>
                        <button
                            className="nav-button"
                            onClick={() => {
                                localStorage.removeItem("guest_session_id");
                                window.location.href = "/auth";
                            }}
                            style={buttonStyle}
                        >
                            Logout
                        </button>
                    </Menu.Item>
                ) : (
                    <Menu.Item style={{ padding: '0 0 0 1rem' }}>
                        <Link
                            to="/auth"
                            className="nav-button"
                            style={buttonStyle}
                        >
                            Login
                        </Link>
                    </Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
    );
};