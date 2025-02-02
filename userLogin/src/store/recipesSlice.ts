import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Recipe = {
    id: number;
    title: string;
    description: string;
    authorId: number;
    ingredients: string[];
    instructions: string;
};

export const fetchData: any = createAsyncThunk(
    "recipes/fetch",
    async (_, thunkAPI) => {
        try {
            console.log("in async thunk");
            const response = await axios.get("http://localhost:3000/api/recipes");
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addRecipe = createAsyncThunk(
    "recipes/add",
    async ({recipe,authorId}: {recipe:Recipe,authorId:number}, thunkAPI) => {
        console.log(authorId);
        
        try {
            const response = await axios.post(
                "http://localhost:3000/api/recipes",
                {
                    descripton: recipe.description,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    title: recipe.title
                },
                {
                    headers: {
                        'user-id': authorId
                    }
                }
            );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const recipesSlice = createSlice({
    name: "recipes",
    initialState: { list: [] as Recipe[], loading: true, selectedRecipe: null as null | Recipe, },
    reducers: {
        // add: (state, action) => {
        //     console.log(state);
        //     console.log(action);
        //     console.log(state.list);           
        //     state.list.push({
        //         id: state.list.length,
        //         title: action.payload.title || "new recipe",
        //         description: action.payload.description || "",
        //         authorId: action.payload.authorId || 0,
        //         ingredients: action.payload.ingredients || [],
        //         instructions: action.payload.instructions || "",
        //     });
        // },
        // get: (state, action) => {
        //     // const recipe = state.list.find((r) => r.id === action.payload.id);
        //     const recipe = state.list.find((r) => r.id === action.payload);
        //     if (recipe) {
        //         state.selectedRecipe = recipe;
        //     } else {
        //         console.log("Recipe not found");
        //     }
        // },
    },




    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                console.log("fulfilled");
                // state.list = [...state.list, ...action.payload];
                state.list = [...action.payload];
                state.loading = false;
            })
            .addCase(fetchData.rejected, (state) => {
                console.log("failed");
                state.loading = false;
            })
            .addCase(fetchData.pending, (state) => {
                console.log("loading...");
                state.loading = true;
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                console.log("Recipe added successfully");
                state.list = [...state.list, { ...action.payload }];
                //state.list.push(action.payload); // מוסיף את המתכון החדש שנשלח לשרת
                state.loading = false;
            })
            .addCase(addRecipe.rejected, (state, action) => {
                console.error("Failed to add recipe:", action.payload);
                state.loading = false;
            })
            .addCase(addRecipe.pending, (state) => {
                console.log("Adding recipe...");
                state.loading = true;
            });
    },
});

// export const { add, get } = recipesSlice.actions;
export default recipesSlice;