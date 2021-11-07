import classes from './category-card.module.css';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { GiGroundSprout, GiFertilizerBag } from 'react-icons/gi';
import { FaSeedling } from 'react-icons/fa';
import { GoTools } from 'react-icons/go';
import { RiPlantFill } from 'react-icons/ri';
import { checkedCategoriesTagsHandler } from '../../store/product-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

const InitialCategories = [
    { title: 'Media Tanam', checked: false, sum: 0 },
    { title: 'Bibit Tanaman', checked: false, sum: 0 },
    { title: 'Pupuk', checked: false, sum: 0 },
    { title: 'Alat Bantu', checked: false, sum: 0 },
    { title: 'Wadah Tanam', checked: false, sum: 0 },
];


function CategoryCard() {

    const dispatch = useDispatch();
    const router = useRouter();

    const categoryClicked = (e) => {
        const checkbox = e.target.innerText
        dispatch(checkedCategoriesTagsHandler(InitialCategories, checkbox));
        router.push('/shop')
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <span><BiCategoryAlt /></span>
                <h2>Categories</h2>
            </div>
            <div className={classes.content}>
                <div className={classes.category} onClick={categoryClicked} >
                    <div className={classes.categoryName}>
                        <GiGroundSprout />
                        <p>Media Tanam</p>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className={classes.category} onClick={categoryClicked}>
                    <div className={classes.categoryName}>
                        <FaSeedling />
                        <p>Bibit Tanaman</p>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className={classes.category} onClick={categoryClicked}>
                    <div className={classes.categoryName}>
                        <GiFertilizerBag />
                        <p>Pupuk</p>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className={classes.category} onClick={categoryClicked}>
                    <div className={classes.categoryName}>
                        <GoTools />
                        <p>Alat Bantu</p>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className={classes.category} onClick={categoryClicked}>
                    <div className={classes.categoryName}>
                        <RiPlantFill />
                        <p>Wadah Tanam</p>
                    </div>
                    <IoIosArrowForward />
                </div>
            </div>
        </div>
    )
}

export default CategoryCard;