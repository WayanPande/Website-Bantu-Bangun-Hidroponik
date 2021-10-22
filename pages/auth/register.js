import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import classes from './register.module.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/auth-actions';
import { useRouter } from 'next/router';


function RegisterPage() {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
    const matches = useMediaQuery('(min-width:600px)');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    useEffect(() => {
        const time = setTimeout(() => {
            if (alertMessage.type === 'success' && showAlert) {
                router.replace('/auth/login');
            }
        }, 3000);
        return () => {
            clearTimeout(time);
        }
    }, [alertMessage, showAlert])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;

        setIsLoading(true);
        const result = await dispatch(signUp(enteredName, enteredEmail, values.password));
        setIsLoading(false);

        if (result.message === 'Invalid input - password should also be at least 7 characters long') {
            setAlertMessage({ type: 'error', message: result.message });
        } else if (result.message === 'User exist already!') {
            setAlertMessage({ type: 'error', message: result.message });
        } else {
            setAlertMessage({ type: 'success', message: 'Account has been created!' });
        }

        setShowAlert(true);
    }

    const alert = (
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
            <Alert variant="filled" severity={alertMessage.type} onClose={handleClose} className={classes.alert} sx={{ width: '100%' }}>
                {alertMessage.message}
            </Alert>
        </Snackbar>
    );

    return (
        <div className={classes.container}>
            {matches && (
                <div className={classes.banner}>
                    <Link href='/' >
                        <img className={classes.img} src='/images/Logo.jpg' alt='logo BBH' />
                    </Link>
                    <h1>Buy hydroponics stuff on BBH</h1>
                    <img className={classes.welcomeImg} src='/images/register.png' alt='banner' />
                </div>
            )}
            <div className={classes.contentWrapper}>
                {alert}
                <div className={classes.header}>
                    <h2>Get started absolutely free.</h2>
                    <p>Free forever. No credit card needed.</p>
                </div>
                <form className={classes.form} onSubmit={formSubmitHandler}>
                    <TextField id="name" label="Name" variant="outlined" inputRef={nameInputRef} />
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
                    {!isLoading && <Button type='submit' className={classes.btn} variant="contained">Register</Button>}
                    {isLoading && <Button type='submit' className={classes.btn} disabled variant="contained">Register</Button>}
                    <span>By registering, I agree to Minimal Terms of Service and Privacy Policy.</span>
                    <p className={classes.loginLink} >Already have an account?<Link href='/auth/login' > Login</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;