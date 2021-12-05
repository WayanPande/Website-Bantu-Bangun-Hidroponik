import { CardCartBtn } from '../ui/button';
import classes from './item-card.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { addItemsCart, getAllItems } from '../../store/cart-actions';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function ItemCard(props) {

    const dispatch = useDispatch();
    const cost = formatMoneyOne(props.cost);
    const cartItems = useSelector(state => state.cart.items)
    const [addToCartBtn, setAddToCartBtn] = useState(false)
    const [session, loading] = useSession();
    const router = useRouter();
    const [imgSrc, setImgSrc] = useState(`/images/produk/${props.id}.jpg`)
    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])

    useEffect(() => {
        if (session && addToCartBtn) {
            (async () => {
                await dispatch(addItemsCart({
                    id: props.id,
                    name: props.title,
                    amount: 1,
                    price: props.cost
                }, session.user.email, cartItems));
                await setAddToCartBtn((prevState) => !prevState)
                await dispatch(getAllItems(session.user.email))
            })()
        }
    }, [addToCartBtn, cartItems])

    const addToCart = async () => {
        if (!session) {
            router.push('/auth/login');
        } else {
            await dispatch(getAllItems(session.user.email))
            await setAddToCartBtn((prevState) => !prevState)
        }

    }

    const imgErrorHandler = () => {
        setImgSrc(`/images/fallbackImg.png`)
    }

    const goToDetailPage = () => {
        // const url = props.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/\d+/g, '-');
        router.push('/shop/' + props.id)
    }

    return (
        <div className={`${props.isShopPage && classes.shop} ${classes.wrapper}`}>
            <div className={classes.img} onClick={goToDetailPage} >
                <Image src={imgSrc} onError={imgErrorHandler} alt={props.title} width={185} height={150} />
                {/* <img src={imgSrc} onError={imgErrorHandler} alt={props.title} /> */}
            </div>
            <div className={classes.test}>
                <p className={classes.title}>{props.title}</p>
            </div>
            <div className={classes.footer}>
                <p>Rp {cost}</p>
                <CardCartBtn onClick={addToCart}>
                    <AiOutlineShoppingCart />
                </CardCartBtn>
            </div>
        </div>
    )
}

export function ItemCardLoading() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.imgLoading}>
                <Skeleton variant="rectangular" animation="wave" className={classes.skeletonImg} />
            </div>
            <div className={classes.titleLoading}>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
            </div>
            <div className={classes.Skeletonfooter}>
                <Skeleton variant="text" animation="wave" className={classes.skeletonPrice} />
                <Skeleton variant="rectangular" animation="wave" className={classes.skeletonCart} />
            </div>
        </div>
    )
}

export default ItemCard;