import React from "react";
import ReactPlayer from "react-player/lazy";

export default function InfoProduct(props){
    const { product } = props;
    return(
        <div className="info-product">

            <ReactPlayer className="info-product__video" url={product.video}/>
        </div>

    );
}