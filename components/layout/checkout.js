import { IoCloseSharp } from 'react-icons/io5';
import { Alert, Button, Divider, FormControl, InputLabel, MenuItem, Select, Snackbar, Step, StepButton, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import CheckoutCard from '../card/checkout-card';
import classes from './checkout.module.css';
import { Fragment, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkoutItems, getAllItems as getAllCartItems } from '../../store/cart-actions';
import { useSession } from 'next-auth/client';
import { getAllItems } from '../../store/product-actions';

const steps = ['Cart', 'Details', 'Payment'];

function CartItems(props) {
    return (
        <Fragment>
            {props.items.length > 0 && props.items[0].items.map((item => <CheckoutCard key={item.id} title={item.name} id={item.id} price={item.price} amount={item.amount} />))}
        </Fragment>
    )
}


function Checkout() {

    const cartItems = useSelector(state => state.cart.items);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ type: 'success', message: 'Please check your email for the invoice 😊' });
    const [activeStep, setActiveStep] = useState(0);
    const [shippingName, setShippingName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [city, setCity] = useState();
    const [postalCode, setPostalCode] = useState();
    const [address, setAddress] = useState();
    const [duration, setDuration] = useState('');
    const dispatch = useDispatch();
    const [session, loading] = useSession();
    const productItems = useSelector(state => state.product.items);

    let totalPrice = 0;
    let quantity = 0;
    let tax = 0;
    let subTotal = 0;
    let readableTotalPrice = 0;

    const currentDate = new Date()
    const humanReadableDate = new Date(currentDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });


    if (cartItems.length > 0) {

        for (const item of cartItems[0].items) {
            totalPrice = totalPrice + item.price
            quantity = quantity + item.amount
        }
    }

    const handleChange = (event) => {
        setDuration(event.target.value);
    };

    const formSubmitHandler = async () => {
        if (!shippingName || !phoneNumber || !city || !postalCode || !address || !duration) {
            setActiveStep(1)
            return;
        }


        const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

        if (session && cartItems[0].items.length !== 0) {
            const items = { name: shippingName, phoneNumber: phoneNumber, city: city, postalCode: postalCode, address: address, shippingType: duration, date: date, email: session.user.email, items: cartItems[0].items, totalPrice: totalPrice, status: 'pending' };

            // console.log(items)
            await dispatch(getAllItems());
            await dispatch(checkoutItems(items, productItems));
            await setShowAlert(true);
            await dispatch(getAllCartItems(session.user.email));
        }
    }

    const handleNext = () => {

        if (activeStep >= 2) {
            formSubmitHandler()
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    tax = totalPrice * (10 / 100)
    subTotal = formatMoneyOne(tax + totalPrice)
    tax = formatMoneyOne(totalPrice * (10 / 100))
    readableTotalPrice = formatMoneyOne(totalPrice);


    // const allCartItems = (cartItems.length > 0 && cartItems[0].items.map((item => <CheckoutCard key={item.id} title={item.name} id={item.id} price={item.price} amount={item.amount} />)))

    const inputChangeHandler = (e) => {
        const value = e.target.value;

        if (e.target.id === 'name') {
            setShippingName(value)
            return
        }

        if (e.target.id === 'number') {
            setPhoneNumber(value)
            return
        }

        if (e.target.id === 'city') {
            setCity(value)
            return
        }
        if (e.target.id === 'postalCode') {
            setPostalCode(value)
            return
        }
        if (e.target.id === 'address') {
            setAddress(value)
            return
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };

    const alert = (
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
            <Alert variant="filled" severity={alertMessage.type} onClose={handleClose} className={classes.alert} sx={{ width: '100%' }}>
                {alertMessage.message}
            </Alert>
        </Snackbar>
    );

    return (
        <div className={classes.container}>
            {alert}
            <div className={classes.itemWrapper}>
                <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label} >
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 0 && (
                    <Fragment>
                        <div className={classes.itemHeader}>
                            <p>Products</p>
                            <div className={classes.labelWrapper}>
                                <div className={classes.label}>
                                    <p>Quantity</p>
                                    <span>{quantity}</span>
                                </div>
                                <div className={classes.label}>
                                    <p>Total</p>
                                    <span>Rp {readableTotalPrice}</span>
                                </div>
                                <div className={classes.label}>
                                    <p>Clear All</p>
                                    <span><IoCloseSharp /></span>
                                </div>
                            </div>
                        </div>
                        <CartItems items={cartItems} />
                    </Fragment>
                )}
                {activeStep === 1 && (
                    <form className={classes.shippingContainer} onSubmit={formSubmitHandler} >
                        <h2>Shipping Address</h2>
                        <div className={classes.shippingWrapper}>
                            <div className={classes.shippingInput}>
                                <TextField sx={{ width: '50%' }} id="name" value={shippingName} label="Recipient Name" variant="outlined" onChange={inputChangeHandler} placeholder='eg. I Wayan Pande' />
                                <TextField sx={{ width: '50%' }} id="number" value={phoneNumber} label="Phone Number" variant="outlined" placeholder='eg. 081220012' onChange={inputChangeHandler} />
                            </div>
                            <div className={classes.shippingInput}>
                                <TextField sx={{ width: '80%' }} id="city" value={city} onChange={inputChangeHandler} label="City or District" variant="outlined" placeholder='eg. Bali, Kota Denpasar, Denpasar Barat' />
                                <TextField id="postalCode" value={postalCode} onChange={inputChangeHandler} label="Postal Code" variant="outlined" placeholder='eg. 80111' />
                            </div>
                            <TextField sx={{ width: '100%' }} id="address" value={address} onChange={inputChangeHandler} label="Address" variant="outlined" placeholder='eg. Jl. Pulau Batanta no.11' />
                        </div>
                        <h2>Choose Duration</h2>
                        <FormControl sx={{ width: '50%' }}>
                            <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={duration}
                                label="Duration"
                                onChange={handleChange}
                                sx={{ borderRadius: 0 }}
                            >
                                <MenuItem value={'next-day'}>
                                    <div className={classes.durationWrapper}>
                                        <div className={classes.durationHeader}>
                                            <p>Next Day</p>
                                            <span>Rp 100.000</span>
                                        </div>
                                        <span>Estimasi tiba besok - {humanReadableDate}</span>
                                        <Divider sx={{ marginTop: '.7rem' }} />
                                    </div>
                                </MenuItem>
                                <MenuItem value={'reguler'}>
                                    <div className={classes.durationWrapper}>
                                        <div className={classes.durationHeader}>
                                            <p>Reguler</p>
                                            <span>Rp 56.000</span>
                                        </div>
                                        <span>Estimasi tiba  - {humanReadableDate} </span>
                                        <Divider sx={{ marginTop: '.7rem' }} />
                                    </div>
                                </MenuItem>
                                <MenuItem value={'economy'}>
                                    <div className={classes.durationWrapper}>
                                        <div className={classes.durationHeader}>
                                            <p>Economy</p>
                                            <span>Rp 48.000</span>
                                        </div>
                                        <span>Estimasi tiba  - {humanReadableDate}</span>
                                        <Divider sx={{ marginTop: '.7rem' }} />
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                )}
            </div>
            <div className={classes.priceWrapper}>
                <div className={classes.priceContent}>
                    <h2>Rp {readableTotalPrice}</h2>
                    <p>Total</p>
                </div>
                <Divider />
                <div className={classes.priceContent}>
                    <p>Tax</p>
                    <span>Rp {tax}</span>
                </div>
                <Divider />
                <div className={classes.priceContent}>
                    <p>Sub total</p>
                    <span>Rp {subTotal}</span>
                </div>
                <Divider />
                <div className={classes.priceContent}>
                    <p>Qty</p>
                    <span>{quantity}</span>
                </div>
                <Divider />
                {cartItems[0].items.length !== 0 && <Button className={classes.payBtn} onClick={handleNext} variant="contained">Pay</Button>}
            </div>
        </div>
    )
}

export default Checkout;