import { UserTupe } from "../../store/slices/userSlice"
import iconPerson from "../../assets/images/social.svg"
import iconTwoPerson from "../../assets/images/social-group.svg"
import styles from "./aboutUser.module.scss"
type PropsType = {
    user: UserTupe
}

const AboutUser = ({user, ...props}: PropsType)=>{

    const help = (n:number)=>{
        let res = ''
        const length = String(n).split('').length   
        if(length === 5 || length === 4 || length === 3){
            res = parseFloat(String((n)/1000)).toFixed(1)+'k' 
        } else if(length === 6 || length === 7 || length === 8){
            res = parseFloat(String((n)/1000000)).toFixed(1)+'m'
        }else{
            res=String(n)
        }
        return res
    }

    const followers = help(user.followers)
    
   return( 
   <div className={styles.aboutUserContainer}>
        <img src={user?.avatar_url} alt="userIcon" className={styles.iconUser} />
        <h1 className={styles.userName} >{user?.name}</h1>
        <a href={user.html_url} target="_blank" rel="noreferrer" className={styles.userLogin} >{user?.login}</a>
        <div  className={styles.userFollowContainer}>
            <span className={styles.userFollowBox}>
                <img src={iconTwoPerson} alt="icon" />
                <span className={styles.userFollow}>{followers} followers</span>
            </span>
            <span  className={styles.userFollowBox}>
                <img src={iconPerson} alt="icon" />
                <span className={styles.userFollow}>{user?.following} following</span>
            </span>
        </div>
    </div>)
}

export default AboutUser