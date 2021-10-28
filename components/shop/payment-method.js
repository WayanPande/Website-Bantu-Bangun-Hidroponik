import { Card, CardActionArea, CardMedia } from "@mui/material";
import { Fragment } from "react";
import classes from './payment-method.module.css';

function PaymentMethod() {
    return (
        <Fragment>
            <div className={classes.container}>
                <h2>Mobile Payment</h2>
                <div className={classes.paymentWrapper}>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/applePay.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/GooglePay.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/Paypal.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </div>
            </div>
            <div className={classes.container}>
                <h2>Bank</h2>
                <div className={classes.paymentWrapper}>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/bca.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/bni.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/mandiri.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/danamon.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/permata.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </div>
            </div>
            <div className={classes.container}>
                <h2>Retail Payment</h2>
                <div className={classes.paymentWrapper}>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/alfamart.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '30%' }}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.card}
                                component="img"
                                height="140"
                                image="/images/payment/indomart.png"
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        </Fragment>
    )
}

export default PaymentMethod;