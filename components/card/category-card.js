import classes from './category-card.module.css';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { GiGroundSprout, GiFertilizerBag } from 'react-icons/gi';
import { FaSeedling } from 'react-icons/fa';
import { GoTools } from 'react-icons/go';
import { RiPlantFill } from 'react-icons/ri';


function CategoryCard() {
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <span><BiCategoryAlt /></span>
                <h2>Categories</h2>
            </div>
            <div className={classes.content}>
                <div className={classes.category}>
                    <div className={classes.categoryName}>
                        <GiGroundSprout />
                        <p>Media Tanam</p>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className={classes.category}>
                    <div className={classes.categoryName}>
                        <FaSeedling />
                        <p>Bibit Tanaman</p>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className={classes.category}>
                    <div className={classes.categoryName}>
                        <GiFertilizerBag />
                        <p>Pupuk</p>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className={classes.category}>
                    <div className={classes.categoryName}>
                        <GoTools />
                        <p>Alat Bantu</p>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className={classes.category}>
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