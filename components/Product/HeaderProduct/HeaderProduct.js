import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

export default function HeaderProduct(props){
    const { product } = props;
    const { poster, title } = product;
    console.log(product);

    return(

      
            <Grid className="header-product">
              <Grid.Column mobile={16} tablet={6} computer={5}>
              <Image src={poster.url} alt={title} fluid />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info product={product}/>
              </Grid.Column>
            </Grid>
        
    );

}

function Info( props ){
  const { product } = props;
  const { title,summary, price, discount, url, stock } = product;
  const { addProductCart} = useCart();


  return (
   
    <>
      <div className="header-product__title">
        {title}    
      </div>
      <div className="header-product__delivery">¡Entrega hasta en 24 horas!</div>
      <div
        className="header-product__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-product__buy">
        <div className="header-product__buy-price">
          <p>Precio de venta al publico: ${price}</p>
          <div className="header-product__buy-price-actions">
            <p>-{discount}%</p>
            <p>&nbsp;&nbsp;${price - Math.floor(price * discount) / 100}</p>
          </div>
        </div>
        <Button
          className="header-product__buy-btn"
           onClick={() => addProductCart(url)}
        > 
          Comprar
        </Button>
      </div>
    </>
  );
}




  