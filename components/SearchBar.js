import { useState } from "react";
import styled from 'styled-components';

// Styled button using Styled Components
const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.5);
    }
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
`;

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    // Function to sanitize input by removing special characters
    const sanitizeQuery = (input) => {
        return input.replace(/[^\w\s]/gi, ''); // Remove all non-alphanumeric characters except whitespace
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const sanitizedQuery = sanitizeQuery(query.trim()); // Sanitize and trim the query
        if (sanitizedQuery) {
            onSearch(sanitizedQuery); // Trigger search with the sanitized query
            setQuery(""); // Clear input
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit">
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
