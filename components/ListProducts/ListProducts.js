import React from "react";
import { Image, Grid, GridColumn } from "semantic-ui-react";
import Link  from "next/link";
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import { breakpointUpSm,breakpointUpMd, breakpointUpLg } from "../../utils/breakpoint";

export default function ListProducts(props){
    const { products } = props;
    const {width} = useWindowSize();
    console.log(width);

    const getColumnsRender = () => {
        switch (true) {
          case width > breakpointUpLg:
            return 5;
          case width > breakpointUpMd:
            return 3;
          case width > breakpointUpSm:
            return 2;
          default:
            return 1;
        }
      };

    return (
        <div className="list-products">
            <Grid>

                <Grid.Row columns={getColumnsRender()}>
                {map(products, (product) => (
                <Product product={product}/>
                ))}
    
                </Grid.Row>
            </Grid>
        </div>
    );
}

function Product(props){
    const { product } = props;
    return(
        <Grid.Column className="list-products__product">
            <Link href={`/${product.url}`}>
                <a>
                    <div className="list-products__product-poster">
                        <Image  src={product.poster.url} alt={product.title}/>
                        <div className="list-products__product-poster-info">
                         {product.discount ? (
                            <span className="discount">-{product.discount}%</span>
                             ) : (
                            <span />
                            )}
                            <span className="price">${product.price}</span>
                     </div>
                    </div>
                    <h2>{product.title}</h2>
                </a>
            </Link>
        </Grid.Column>
    ) 
}