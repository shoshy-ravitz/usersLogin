import  { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router';

const RecipeSideBar = ({ id, title, description }: { id: number; title: string; description: string }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div>
            <Link to={`/recipe/${id}`} style={{ textDecoration: 'none' }}>
                <Button
                    sx={{ margin: 0, fontSize: 'inherit' }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <h5 style={{ margin: 0 }}>{title}</h5>
                    {hovered && <p style={{ margin: 0 }}>{description}</p>}
                </Button>
            </Link>
        </div>
    );
};

export default RecipeSideBar;
