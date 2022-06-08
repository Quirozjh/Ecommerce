import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchProductsApi} from "../api/product";
import  ListProducts from "../components/ListProducts";
import Seo from "../components/Seo";

   
const Search = () =>{

    const [ products, setProducts ] = useState(null);
    const { query } = useRouter();

     
    useEffect(() => {
        document.getElementById("search-product").focus();
    }, []); 

    useEffect(() => {
        (async() => {
            if(size(query.query) > 0){
                const response = await searchProductsApi(query.query);
                if (size(response) > 0) setProducts(response);
                else setProducts([]);

            }else{
                setProducts([]);
            }
        })()
    }, [query]);




    return(
        <BasicLayout className="search">
            <Seo title={ `Buscando: ${query.query}`} />
            {!products && <Loader active>Buscando Productos</Loader>}
      {products && size(products) === 0 && (
        <div className="def">
          <h3>¡NO SE ENCONTRARON PRODUCTOS SIMILARES A TU BUSQUEDA! </h3>
        </div>
      )}
      {size(products) > 0 && <ListProducts products={products} />}
        </BasicLayout>
    );

} 
export default Search;