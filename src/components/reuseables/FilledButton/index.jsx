import style from "./index.module.css"

const FilledButton =({textColor,backgroundColor,text})=>{
    return (
        <button style={{color:textColor,backgroundColor:backgroundColor}} className={style.filledButton}>{text}</button>
    )
}

export default FilledButton