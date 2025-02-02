import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Modal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Recipe, addRecipe } from '../../store/recipesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { styleForm, styleIconClose } from '../../style/style';
import { validationSchema } from '../../formSchemas/schemas';
import { UserContext } from '../../reducer/userContext';

const AddRecipe = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(true);
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
            description: '',
            ingredients: [],
            instructions: '',
        },
    });

        
    const onSubmit = (data: Omit<Recipe, 'authorId' | 'id'>) => {
        dispatch<createType>(addRecipe({ recipe: {...data,id:0,authorId:0}, authorId: user.id }));
        close()
    };
    const close = () => {
        setOpen(false);
        navigate('/recipe');
    }

    return (
        <>
            <Modal open={open} onClose={() => { close(); }}>
                <Box sx={styleForm}>
                    <Box sx={ styleIconClose } onClick={close}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Title" fullWidth variant="outlined" />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Description" fullWidth variant="outlined" multiline rows={4} />
                            )}
                        />
                        <Controller
                            name="ingredients"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Ingredients (list each ingredient on a new line)"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    onChange={(e) => field.onChange(e.target.value.split(','))}
                                />
                            )}
                        />
                        <Controller
                            name="instructions"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Instructions" fullWidth variant="outlined" multiline rows={4} />
                            )}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Submit Recipe
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default AddRecipe;