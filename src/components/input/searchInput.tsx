import React, { ChangeEvent, useState,  KeyboardEvent } from "react";
import styles from "./searchInput.module.scss"

interface PropsType {
    name: string
    type: string
    placeholder: string
    addItem: (value: string)=>void
}

const Input =({addItem, name, type, placeholder, ...props}:PropsType)=>{

    const [value, setValue] = useState('');

    const onChanged = (e: ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value);   
    };
    
   const onKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem(value);
            setValue('')
        }
    };

    return (
        <input
            className={styles.searchInput}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChanged}
            onKeyPress={onKeyPress}
        />
         
    )
};

export default Input