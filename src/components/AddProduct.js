import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct(props){
    const [name,setName] = useState("")
    const [img,setImg] = useState("")
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [nameError,setNameError] = useState("")
    const [stockError, setStockError] = useState("")
    const [priceError, setPriceError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")

    const navigate = useNavigate()

    function validate(){
        let isValidate = true;
        if(name === ""){
            setNameError("Name CAN NOT be blank")
            isValidate = false
        }
        else
            setNameError("")

        if(stock<=0){
            setStockError("Stock CAN NOT be negative or zero")
            isValidate = false
        }
        else    
            setStockError("")

        if(price<=0){
            setPriceError("Price CAN NOT be negative or zero")
            isValidate = false
        }
        else
            setPriceError("")

        if(description ===""){
            setDescriptionError("Description CAN NOT be blank")
            isValidate = false
        }
        else
            setDescriptionError("")

        return isValidate
    }
    
    async function addItem(){
        await axios.post("https://smarket-backend.vercel.app/items", {
            name : name,
            price : price,
            stock : stock,
            image : img,
            seller : props.user.username,
            description : description
        })
    }

    async function handlesubmit(event){
        event.preventDefault()
        if(validate()){
            await addItem()
            navigate("/user/sale")
        }
    }

    return(
        <form className="addproduct" onSubmit={handlesubmit}>
            <label>name <input type="text" value={name} onChange={ e => setName(e.target.value)}/></label><br></br><br></br>
            <label>image url <input type="text" value={img} onChange={ e => setImg(e.target.value)}/></label><br></br><br></br>
            <label>stock <input type="number" value={stock} onChange={ e => setStock(e.target.value)}/></label><br></br><br></br>
            <label>price <input type="number" value={price} onChange={ e => setPrice(e.target.value)}/></label><br></br><br></br>
            <label>description <input type="text" value={description} onChange={ e => setDescription(e.target.value)}/></label><br></br>
            <input type="submit" value="Submit"/>
            <div className="form-error">
                <p>{nameError}</p>
                <p>{stockError}</p>
                <p>{priceError}</p>
                <p>{descriptionError}</p>
            </div>
        </form>
    )
}
