import { Button, Menu, Input, Dropdown } from "semantic-ui-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { DisplayType } from "../pages/home";

export const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState<DisplayType>(DisplayType.Movies);
    const isLoggedIn = localStorage.getItem("guest_session_id") != null;
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("guest_session_id");
        navigate("/auth");
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&type=${searchType}`);
        }
    };

    const handleTypeChange = (type: DisplayType) => {
        setSearchType(type);
        if (searchQuery.trim() && location.pathname === "/search") {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&type=${type}`);
        }
    };

    return (
        <Menu fixed="top" size="huge" style={{ backgroundColor: '#f8f9fa' }}>
            <Menu.Item as={Link} to="/" style={{ fontSize: "1.2rem", color: '#6a1b9a' }}>
                Home
            </Menu.Item>
            <Menu.Item as={Link} to="/rated" style={{ fontSize: "1.2rem", color: '#6a1b9a' }}>
                Rated
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', margin: 0 }}>
                        <Dropdown
                            value={searchType}
                            options={[
                                { key: DisplayType.Movies, text: 'Movies', value: DisplayType.Movies },
                                { key: DisplayType.TvShows, text: 'TV Shows', value: DisplayType.TvShows }
                            ]}
                            onChange={(_, data) => handleTypeChange(data.value as DisplayType)}
                            style={{ minWidth: '100px' }}
                        />
                        <Input
                            icon="search"
                            placeholder={`Search ${searchType}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '250px' }}
                        />
                    </form>
                </Menu.Item>
                {isLoggedIn ? (
                    <Menu.Item>
                        <Button
                            color="purple"
                            onClick={logout}
                            style={{
                                borderRadius: '20px',
                                padding: '8px 20px',
                                fontWeight: 'bold'
                            }}
                        >
                            Logout
                        </Button>
                    </Menu.Item>
                ) : (
                    <Menu.Item>
                        <Button
                            as={Link}
                            to="/auth"
                            color="purple"
                            style={{
                                borderRadius: '20px',
                                padding: '8px 20px',
                                fontWeight: 'bold'
                            }}
                        >
                            Login
                        </Button>
                    </Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
    );
};