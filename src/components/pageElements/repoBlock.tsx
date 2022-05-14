import styles from "./repoBlock.module.scss"

type PropsType = {
    name: string
    description: string
    html_url:string
}

 const RepoBlock = ({name, description, html_url, ...props}: PropsType)=>{
    return(
        <div className={styles.repoContainer}>
             <h2 className={styles.repoTitle}><a href={html_url} target="_blank" rel="noopener noreferrer">{name}</a></h2>
            <p className={styles.repoDescription}>{description}</p>
        </div>
    )
}
export default RepoBlock