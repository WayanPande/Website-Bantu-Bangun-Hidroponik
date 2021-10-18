import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import classes from './register.module.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/auth-actions';


function RegisterPage() {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const dispatch = useDispatch();

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


    const formSubmitHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;

        dispatch(signUp(enteredName, enteredEmail, values.password));
    }

    return (
        <div className={classes.container}>
            <div className={classes.contentWrapper}>
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
                    <Button type='submit' className={classes.btn} variant="contained">Register</Button>
                    <span>By registering, I agree to Minimal Terms of Service and Privacy Policy.</span>
                    <p className={classes.loginLink} >Already have an account?<Link href='/auth/login' > Login</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;