import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import  BasicLayout  from "../../layouts/BasicLayout";
import {getProductsPlatformApi, getTotalProductsPlatformApi } from "../../api/product";
import ListProducts from "../../components/ListProducts";
import Pagination from "../../components/Pagination";

const limitPerPage = 20;

export default function Platform(){
    const { query } = useRouter();
    const [products, setProducts] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null);


    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if (!query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage - limitPerPage;
      };
   

    useEffect(() => {
        (async () => {
            if (query.platform) {
            const response = await getProductsPlatformApi(
              query.platform,
              limitPerPage,
              getStartItem()
            );
            setProducts(response);
            }
        })();
      }, [query]);


      useEffect(() => {
        (async () => {
          const response = await getTotalProductsPlatformApi(query.platform);
          setTotalProducts(response);
        })();
      }, [query]);
    


    return(

        <BasicLayout  className="platform">
      {!products && <Loader active>Cargando Productos</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No hay produstos</h3>
        </div>
      )}
        {size(products) > 0 && <ListProducts products={products} />}

        {totalProducts ? (
        <Pagination
          totalProducts={totalProducts}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
        ) : null}
        </BasicLayout>
    );
}