import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/recipesSlice";
import { StoreType } from "../../store/store";
import RecipeNavBar from "./recipeSideBar";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router";
import { UserContext } from "../../reducer/userContext";

const RecipeList = () => {
    const { user } = useContext(UserContext);
    const recipesList = useSelector((store: StoreType) => store.recipes.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch,recipesList.length]);

    return (
        <>
        <Box
            sx={{
                position: 'fixed',
                right: 0,
                top: 50,
                bottom: 50,
                 width: '400px', 
                bgcolor: 'background.paper',
                borderRight: '1px solid #ccc',
                overflowY: 'auto', 
                padding: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Recipes
            </Typography>
            {recipesList.length === 0 ? (
                <Typography>No recipes available</Typography>
            ) : (
                recipesList.map((recipe, index) => (
                    <RecipeNavBar
                        key={`${recipe.id}-${index}`}
                        id={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                    />
                ))
            )}

        </Box>
        {user.email&& 
                <Link to={'form'}>
                    <Button variant="contained" color="secondary" 
                    sx={{ marginTop: 2,
                        position: 'fixed',
                        right: 20,
                        bottom: 10,
                        bgcolor: 'secondary',
                        borderRight: '1px solid #ccc',
                        padding: 2,
                    }}>
                        Add Recipe
                    </Button>
                </Link>
            }
        </>
    );
};

export default RecipeList
