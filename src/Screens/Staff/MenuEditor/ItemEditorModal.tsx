import React, {useEffect, useState} from 'react';
import {Box, Button, Modal, Stack, TextField} from '@mui/material';
import {MenuData} from '../../../Api/types/MenuData';

interface ItemEditorModalProps {
    open: boolean;
    onClose: () => void;
    onUpdate: (updatedItem: MenuData) => void;
    menuData?: MenuData;
}

const ItemEditorModal: React.FC<ItemEditorModalProps> = ({
                                                             open,
                                                             onClose,
                                                             onUpdate,
                                                             menuData
                                                         }) => {
    const [formData, setFormData] = useState<Partial<MenuData>>({
        name: '',
        description: '',
        availability: 0,
        imageUrl: ''
    });

    useEffect(() => {
        if (menuData) {
            setFormData({
                name: menuData.name,
                description: menuData.description,
                availability: menuData.availability,
                imageUrl: menuData.imageUrl
            });
        }
    }, [menuData]);

    const handleInputChange = (field: keyof MenuData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = () => {
        if (menuData) {
            onUpdate({
                ...menuData,
                ...formData
            });
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="menu-item-editor"
            aria-describedby="menu-item-editor-form"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                width: 400,
                borderRadius: 2
            }}>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        value={formData.description}
                        onChange={handleInputChange('description')}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <TextField
                        label="Image URL"
                        value={formData.imageUrl}
                        onChange={handleInputChange('imageUrl')}
                        fullWidth
                    />
                    <TextField
                        fullWidth
                        label="Availability"
                        name="availability"
                        type="number"
                        value={formData.availability || ''}
                        onChange={handleInputChange('availability')}
                        margin="normal"
                        required
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={onClose} color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained">
                            Update
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ItemEditorModal;