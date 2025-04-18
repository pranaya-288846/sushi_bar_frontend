import {useState} from 'react';
import {Box, Button, Card, CardContent, Checkbox, FormControl, TextField, Typography} from '@mui/material';

const RegistrationScreen = () => {
    const [formData, setFormData] = useState({
        clientName: '',
        seats: 1,
        hasMembership: false
    });
    const [errors, setErrors] = useState({
        clientName: ''
    });

    const validateName = (name: string) => {
        if (!name.trim()) return 'Client name is required';
        if (/\d/.test(name)) return 'Numbers are not allowed in name';
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Validate immediately when typing in name field
        if (name === 'clientName') {
            setErrors(prev => ({
                ...prev,
                clientName: validateName(value)
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation check
        const nameError = validateName(formData.clientName);
        setErrors({clientName: nameError});

        if (!nameError) {
            console.log('Form submitted:', formData);
            // Here you would typically send data to your backend
            alert('Registration successful!');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                p: 2
            }}
        >
            <Card sx={{width: '100%', maxWidth: 500}}>
                <CardContent>
                    <Typography variant="h5" component="h1" gutterBottom align="center">
                        Client Registration
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Client Name"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                error={Boolean(errors.clientName)}
                                helperText={errors.clientName}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Number of Seats"
                                name="seats"
                                type="number"
                                value={formData.seats}
                                onChange={handleChange}
                                inputProps={{min: 1, max: 20}}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Checkbox
                                    name="hasMembership"
                                    checked={formData.hasMembership}
                                    onChange={handleChange}
                                />
                                <Typography>Has Membership</Typography>
                            </Box>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{mt: 3}}
                        >
                            Register
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegistrationScreen;