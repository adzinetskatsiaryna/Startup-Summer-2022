import { useAppDispatch, useAppSelector } from "../components/hooks/hooks";
import { getRepos, RepoTupe, setPage } from "../store/slices/userSlice";
import userNotFoundIcon from "../assets/images/person.svg"
import serchIcon from "../assets/images/search.svg"
import repoIcon from "../assets/images/rep.svg"
import styles from "./startPage.module.scss"
import AboutUser from "../components/aboutUserBlock/aboutUserBlock";
import RepoBlock from "../components/pageElements/repoBlock";
import { Pagination } from "../components/paginator/pagination";
import PageBox from "../components/pageElements/pageBox";

const StartPage =()=>{
 
    const { user } = useAppSelector((state) => state.user);
    const {reposTotalCount} = useAppSelector((state)=>state.user);
    const { userRepos } = useAppSelector((state)=>state.user);
    const {page} = useAppSelector((state)=>state.user);
    const {pageCount} = useAppSelector((state)=>state.user);
    const totalPages = Math.ceil(reposTotalCount/pageCount);
    const onPageChanged = (page: number) => {
        dispatch(setPage({page:page}));
        dispatch(getRepos(user ? user.login  : '', page))
    };
  
    const dispatch = useAppDispatch();
    return (
        <div className={styles.container}>
         {user && reposTotalCount ? 
            <div className={styles.userPage}>
                <div className={styles.userPageContainer}><AboutUser user={user} />
                 <div className={styles.reposBlock}>
                    <h2 className={styles.allRepos}>Repositories {reposTotalCount}</h2>
                    {userRepos.map((r:RepoTupe, i)=>{return(
                    <RepoBlock html_url={r.html_url} key={i} name={r.name} description={r.description} />)})}
                 </div>
                </div>
                {reposTotalCount > 3 ? <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePagination={onPageChanged}
                    totalCount={reposTotalCount}
                    pageCount = {pageCount}
                />: ''}
            </div> 
         : user===undefined
         ?  <div className={styles.userNotFoundPage}><PageBox src={userNotFoundIcon} alt='icon' text="User not found" /></div> 
         : user && userRepos.length===0
         ? <div className={styles.emptyRepoPage}>
             <div className={styles.emptyRepoPageContainer}>
                <AboutUser user={user} />
                <PageBox src={repoIcon} alt='icon' text="Repository list is empty" />
             </div>
            </div> 
         : <div className={styles.startPage}>
             <PageBox src={serchIcon} alt='icon' text="Start with searching a GitHub user" />
            </div>
         
         }
       </div> 
    )
};

export default StartPage