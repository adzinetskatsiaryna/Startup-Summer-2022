import styles from "./header.module.scss";
import github from '../../assets/images/github.svg'
import Input from "../input/searchInput";
import { useDispatch } from "react-redux";
import { getRepos, getUser } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const Header = () => {
    const dispatch = useAppDispatch();
    const addItem =(username: string)=>{
        dispatch(getUser(username))
        dispatch(getRepos(username, 1))
    }

    return (
        <div className={styles.header}>
          <span className={styles.icon}><img src={github} alt="github-icon" /></span>
        <Input 
            type='text'
            name='search'
            placeholder='Enter GitHub username'
            addItem = {addItem}
             />       
       </div>
    )
};

export default Header