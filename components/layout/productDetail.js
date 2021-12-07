import { Button } from "@mui/material";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import ReactImageMagnify from "react-image-magnify";
import { useDispatch, useSelector } from "react-redux";
import { formatMoneyOne } from "../../helpers/moneyFormat-util";
import { addItemsCart, getAllItems } from "../../store/cart-actions";
import { getProductDetail } from "../../store/product-actions";
import ItemCarousel from "../carousel/item-carousel";
import WavesSvg from "../svg/waves";
import classes from './productDetail.module.css'

function findItem(items, slug) {

    console.log(slug.replace(/\-/g, ' ').replace(/(\d)/g, '1'))
    console.log(new RegExp('box plastik \\(38x12x32 cm\\)'))

    // return items.filter(item => item.nama.toLowerCase().includes(/arang sekam | 500 gr/))
}


function ProductDetail(props) {

    const [quantity, setQuantity] = useState(1);
    const detailItem = useSelector(state => state.product.detailItem);
    const [item, setItem] = useState()
    const dispatch = useDispatch();
    const [addToCartBtn, setAddToCartBtn] = useState(false)
    const cartItems = useSelector(state => state.cart.items)
    const [session, loading] = useSession();
    const router = useRouter();

    const quantityChangeHandler = (e) => {
        if (e.target.innerHTML === '+') {
            if (quantity === item.stok) {
                return;
            } else {
                setQuantity(prevState => prevState + 1)
            }
        } else {
            if (quantity === 1) {
                return;
            } else {
                setQuantity(prevState => prevState - 1)
            }
        }
    }

    useEffect(() => {
        if (session && addToCartBtn) {
            (async () => {
                await dispatch(addItemsCart({
                    id: item.id,
                    name: item.nama,
                    amount: quantity,
                    price: item.harga * quantity
                }, session.user.email, cartItems));
                await setAddToCartBtn((prevState) => !prevState)
                await dispatch(getAllItems(session.user.email))
                setQuantity(1)
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

    useEffect(() => {
        // console.log(findItem(productItems, props.slug))
        // console.log(productItems)
        dispatch(getProductDetail(props.slug))
    }, [props.slug])

    useEffect(() => {
        if (detailItem) {

            if (detailItem.error) {
                router.replace('/404');
            }

            setItem(detailItem)
        }
    }, [detailItem])

    const harga = item && formatMoneyOne(item.harga ? item.harga : 0)

    return (
        <Fragment>
            <div className={classes.Wave} >
                <WavesSvg />
            </div>
            <div className={classes.content} >
                <div className={classes.productWrapper}>
                    <div className={classes.imgWrapper} >
                        {/* <img src={`/images/produk/${props.slug}.jpg`} alt='awsdf' /> */}
                        <ReactImageMagnify enlargedImageContainerClassName={classes.imgBig} {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: `/images/produk/${props.slug}.jpg`
                            },
                            largeImage: {
                                src: `/images/produk/${props.slug}.jpg`,
                                width: 1200,
                                height: 1800
                            },
                            enlargedImageContainerDimensions: {
                                width: '135%',
                                height: '150%'
                            },
                        }} />
                    </div>
                    <div className={classes.productDetailWrapper} >
                        <h1>{item && item.nama}</h1>
                        <ul>
                            <li>Only {item && item.stok} left in stock</li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus libero nulla, a fringilla ante posuere ut. Suspendisse commodo enim eget nulla fringilla placerat. Curabitur eu felis a purus cursus luctus vitae nec quam. Duis ultrices imperdiet erat, ac convallis odio aliquam vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed rutrum velit leo</p>
                        <div className={classes.productDetailFooter} >
                            <span>Rp {harga}</span>
                            <div className={classes.buttonWrapper}>
                                <button onClick={quantityChangeHandler} >-</button>
                                <input readOnly type='number' value={quantity} min='0' />
                                <button onClick={quantityChangeHandler} >+</button>
                            </div>
                            <Button onClick={addToCart} variant="contained" className={classes.btn} startIcon={<BsFillCartFill style={{ color: "#fff" }} />} >Add to cart</Button>
                        </div>
                    </div>
                </div>
                <div className={classes.carousel} >
                    <ItemCarousel key='Similar products' title='Similar products' type='similar-product' category={item && item.kategori} />
                </div>
            </div>
        </Fragment>
    )
}

export default ProductDetail;