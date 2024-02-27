import React from "react"
import '../App.css'
import { MdClose } from "react-icons/md";

function EditForm({handleOnChange, handleSubmit, handleClose, rest}){
    return(
<div className = "addContainer">
          <form onSubmit={handleSubmit}>
          <div className = "close-btn" onClick={handleClose}><MdClose/></div>
            <label htmlFor = "name">Name : </label>
            <input type = "text" id = "name" name="name" onChange={handleOnChange} value = {rest.name}/>
            <label htmlFor = "email">Email : </label>
            <input type = "text" id = "email" name = "email" onChange={handleOnChange} value = {rest.email}/>
            <label htmlFor = "mobile">Mobile : </label>
            <input type = "number" id = "mobile" name = "mobile" onChange={handleOnChange} value = {rest.mobile}/>
            <button className = "btn" type = "submit">submit</button>
          </form>
</div>
    )
}

export default EditForm