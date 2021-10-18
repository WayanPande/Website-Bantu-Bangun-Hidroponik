import { Alert, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import classes from './login.module.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';

function LoginPage() {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const emailInputRef = useRef();
    const router = useRouter();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    const formSubmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const enteredEmail = emailInputRef.current.value;

        const result = await signIn('credentials', {
            redirect: false,
            email: enteredEmail,
            password: values.password
        });

        if (result.ok) {
            setShowAlert(true);
            setIsLoading(false);
        }



        if (!result.error) {
            router.replace('/');
        }

        console.log(result)
    }


    return (
        <div className={classes.container}>
            <Snackbar open={showAlert} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} className={classes.snackbar} >
                <Alert variant="filled" severity="success" className={classes.alert} sx={{ width: '100%' }}>
                    Login success!
                </Alert>
            </Snackbar>
            <div className={classes.contentWrapper}>
                <div className={classes.header}>
                    <h2>Sign in to BBH.</h2>
                    <p>Enter your details below.</p>
                </div>
                <form className={classes.form} onSubmit={formSubmitHandler}>
                    <TextField id="email" label="Email address" variant="outlined" inputRef={emailInputRef} />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    {!isLoading && <Button type='submit' className={classes.btn} variant="contained">Login</Button>}
                    {isLoading && <Button className={classes.btn} variant="contained" disabled>Loading... </Button>}

                    <p className={classes.loginLink} >Don’t have an account?<Link href='/auth/register' > Get started</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;