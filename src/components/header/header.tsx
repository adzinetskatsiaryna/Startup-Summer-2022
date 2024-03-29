import styles from "./header.module.scss";
import github from '../../assets/images/github.svg'
import Input from "../input/searchInput";
import { getRepos, getUser, setPage} from "../../store/slices/userSlice";
import { useAppDispatch } from "../hooks/hooks";

const Header = () => {
    const dispatch = useAppDispatch();
    const addItem =(username: string)=>{    
        dispatch(getUser(username))
        dispatch(getRepos(username, 1))
        dispatch(setPage({page: 1})); 
    }
    
    return (
        <div className={styles.header}>
         <div className={styles.container}>
          <span className={styles.icon}><img src={github} alt="github-icon" /></span>
            <Input 
            type='text'
            name='search'
            placeholder='Enter GitHub username'
            addItem = {addItem}
             /> 
         </div>      
       </div>
    )
};

export default Header