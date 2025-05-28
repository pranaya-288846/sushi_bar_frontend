import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Box, Button, Card, CardContent, Checkbox, FormControl, TextField, Typography,} from '@mui/material';
import useTable from '../../Hooks/tableHook.ts';

const RegistrationScreen = () => {
    const [formData, setFormData] = useState({
        clientName: '',
        seats: 1,
        hasMembership: false,
    });
    const [errors, setErrors] = useState({
        clientName: '',
    });
    const {registerTable} = useTable();

    const navigate = useNavigate();

    const validateName = (name: string) => {
        if (!name.trim()) return 'Client name is required';
        if (/\d/.test(name)) return 'Numbers are not allowed in name';
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'clientName') {
            setErrors((prev) => ({
                ...prev,
                clientName: validateName(value),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameError = validateName(formData.clientName);
        setErrors({clientName: nameError});

        if (!nameError) {
            try {
                await registerTable({
                    clientName: formData.clientName,
                    numberOfSeats: formData.seats,
                    hasMembership: formData.hasMembership,
                });

                alert('Registration successful!');
                navigate('/menu');
            } catch (error) {
                console.error('Registration failed:', error);
                alert('Registration failed. Please try again.');
            }
        }
    };

    // JSON-LD for Table
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Table",
        "clientName": formData.clientName,
        "numberOfSeats": formData.seats,
        "hasMembership": formData.hasMembership
    };

    return (
        <div
            vocab="https://schema.org/"
            typeof="Table"
        >
            <meta property="clientName" content={formData.clientName}/>
            <meta property="numberOfSeats" content={formData.seats.toString()}/>
            <meta property="hasMembership" content={formData.hasMembership.toString()}/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    p: 2,
                }}
            >
                <Card sx={{width: '100%', maxWidth: 500}}>
                    <CardContent>
                        <Typography variant="h5" component="h1" gutterBottom align="center">
                            Client Registration
                        </Typography>

                        {/* RDFa: Table */}
                        <form
                            onSubmit={handleSubmit}
                        >
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Client Name"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    error={Boolean(errors.clientName)}
                                    helperText={errors.clientName}
                                    inputProps={{property: "clientName"}}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Number of Seats"
                                    name="seats"
                                    type="number"
                                    value={formData.seats}
                                    onChange={handleChange}
                                    inputProps={{property: "numberOfSeats"}}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        name="hasMembership"
                                        checked={formData.hasMembership}
                                        onChange={handleChange}
                                        inputProps={{property: "hasMembership"}}
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

                    {/* Link to login page */}
                    <Box sx={{p: 2, textAlign: 'center'}}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link to="/login" style={{textDecoration: 'none', color: '#1976d2'}}>
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </Card>
                {/* JSON-LD script */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
            </Box>
        </div>
    );
};

export default RegistrationScreen;