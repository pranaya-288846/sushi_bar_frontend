import {useState} from 'react';
import {Box, Button, Card, CardContent, TextField, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const LoginScreen = () => {
    // Static credentials for validation
    const STATIC_CREDENTIALS = {
        username: '1',
        password: '1'
    };

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        form: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // JSON-LD for LoginAction
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LoginAction",
        "agent": {
            "@type": "Person",
            "identifier": formData.username,
            "password": formData.password
        },
        "target": "Login"
    };

    const validateFields = () => {
        let isValid = true;
        const newErrors = {
            username: '',
            password: '',
            form: ''
        };

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors when typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
                form: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (validateFields()) {

            if (formData.username === STATIC_CREDENTIALS.username &&
                formData.password === STATIC_CREDENTIALS.password) {
                navigate('/home-admin');
            } else {
                setErrors(prev => ({
                    ...prev,
                    form: 'Invalid username or password'
                }));
            }
            setIsLoading(false);

        } else {
            setIsLoading(false);
        }
    };

    return (
        <div
            vocab="https://schema.org/"
            typeof="LoginAction"
        >
            <meta property="agent" content={formData.username}/>
            <meta property="target" content="Login"/>
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
                            Login
                        </Typography>

                        {errors.form && (
                            <Typography color="error" align="center" sx={{mb: 2}}>
                                {errors.form}
                            </Typography>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                error={Boolean(errors.username)}
                                helperText={errors.username}
                                fullWidth
                                margin="normal"
                                autoComplete="username"
                                inputProps={{property: "agent"}}
                            />

                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                fullWidth
                                margin="normal"
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{mt: 3}}
                                disabled={isLoading}
                                property="target"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </CardContent>
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

export default LoginScreen;
