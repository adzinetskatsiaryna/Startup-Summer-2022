import styles from "../../pages/startPage.module.scss"
type PropsType = {
    src: string
    alt: string
    text: string
}
const PageBox = ({src, alt, text, ...props}:PropsType)=>{
    return(
        <div className={styles.pageBox}>
            <img className={styles.pageBoxIcon} src={src} alt={alt} />
            <p className={styles.text}>{text}</p>
        </div>
    )
}
export default PageBox