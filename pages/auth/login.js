import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, useMediaQuery } from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';
import classes from './login.module.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Head from 'next/head';

function LoginPage() {
    const [enteredPassword, setEnteredPassword] = useState({
        password: '',
        showPassword: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
    const emailInputRef = useRef();
    const router = useRouter();
    const matches = useMediaQuery('(min-width:600px)');
    const [session, loading] = useSession();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };

    const handleClickShowPassword = () => {
        setEnteredPassword({
            ...enteredPassword,
            showPassword: !enteredPassword.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setEnteredPassword({ ...enteredPassword, [prop]: event.target.value });
    };

    const validateEmailHandler = () => {

        const enteredEmail = emailInputRef.current.value;
        if (!enteredEmail.includes('@') && !enteredEmail.trim().length < 1) {
            setEmailIsValid(false);
            setIsLoading(false);
        } else {
            setEmailIsValid(true);
        }
    }

    const emailInputClicked = () => {
        setEmailIsValid(true);
    }


    const formSubmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const enteredEmail = emailInputRef.current.value;

        if (enteredEmail.trim().length <= 1) {
            setEmailIsValid(false);
            setIsLoading(false);
            return;
        }

        const result = await signIn('credentials', {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword.password
        });

        if (result.ok) {
            if (result.error === 'Could not log you in!') {
                setAlertMessage({ type: 'error', message: result.error + ' - please check your credentials' });
            } else if (result.error === 'No user found') {
                setAlertMessage({ type: 'error', message: result.error + ' - please check your credentials' });
            } else {
                setAlertMessage({ type: 'success', message: 'Login success! - Please wait...' });
            }
            setShowAlert(true);
            setIsLoading(false);
        }

        if (!result.error) {
            console.log(result)
            // router.replace('/');
        }

    }

    useEffect(() => {
        if (session && session.user.name === 'admin') {
            // admin page
            router.replace('/admin');
        } else if (session && session.user.name !== 'admin') {
            router.replace('/');
        }
    }, [session])

    const emailInputValid = <TextField id="email" label="Email address" variant="outlined" onBlur={validateEmailHandler} inputRef={emailInputRef} />;

    const emailInputInValid = <TextField id="email" error helperText="Incorrect entry." onClick={emailInputClicked} onBlur={validateEmailHandler} label="Email address" variant="outlined" inputRef={emailInputRef} />;

    const alert = (
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
            <Alert variant="filled" severity={alertMessage.type} onClose={handleClose} className={classes.alert} sx={{ width: '100%' }}>
                {alertMessage.message}
            </Alert>
        </Snackbar>
    );

    return (
        <Fragment>
            <Head>
                <title>BBH | Login</title>
                <meta
                    name='description'
                    content='Login untuk berbelanja berbagai macam produk hidroponik...'
                />
            </Head>
            <div className={classes.container}>
                {alert}
                {matches && (
                    <div className={classes.banner}>
                        <Link href='/' >
                            <a><img className={classes.img} src='/images/Logo.jpg' alt='logo BBH' /></a>
                        </Link>
                        <h1>Hi, Welcome Back</h1>
                        <img className={classes.welcomeImg} src='/images/login.jpg' alt='banner' />
                    </div>
                )}
                <div className={classes.contentWrapper}>
                    <div className={classes.header}>
                        <h2>Sign in to BBH.</h2>
                        <p>Enter your details below.</p>
                    </div>
                    <form className={classes.form} onSubmit={formSubmitHandler}>
                        {emailIsValid ? emailInputValid : emailInputInValid}
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={enteredPassword.showPassword ? 'text' : 'password'}
                                value={enteredPassword.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {enteredPassword.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
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
        </Fragment>
    )
}

export default LoginPage;