import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { StoreType } from '../../store/store';
import { Box, Typography, List, ListItem } from '@mui/material';

const RecipeDetail = () => {
    const { id } = useParams();
    const selectedRecipe = useSelector((store: StoreType) =>
        store.recipes.list.find((r) => r.id.toString() === id),
    );

    if (!selectedRecipe) {
        return (
            <Box>
                <Typography variant="h6">Recipe not found!</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                {selectedRecipe.title}
            </Typography>
            <Typography variant="body1"><strong>Author ID:</strong> {selectedRecipe.authorId}</Typography>
            <Typography variant="body1"><strong>Description:</strong> {selectedRecipe.description}</Typography>
            <Typography variant="body1"><strong>Instructions:</strong> {selectedRecipe.instructions}</Typography>

            <Typography variant="h6" gutterBottom>Ingredients:</Typography>
            <List>
                {selectedRecipe.ingredients?.map((ingredient, index) => (
                    <ListItem key={index}>
                        <Typography variant="body2">{ingredient}</Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default RecipeDetail;
