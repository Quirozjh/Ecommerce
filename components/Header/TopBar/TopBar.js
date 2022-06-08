import React, {useState, useEffect} from "react";
import { Container, Grid, GridColumn, Image, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar(){
    return(

        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Grid.Column width={8} className="top-bar__left">
                        <Logo/>
                    </Grid.Column>
                    <GridColumn width={8} className="top-bar__right">
                     <Search/>
                    </GridColumn>
                </Grid>
            </Container>
            
        </div>
    );
}


function Logo(){
    return(
        <Link href="/">
            <a>
            <Image src="/Logo.png" alt="Gamming"/>
            </a>
        </Link>

    );    
}

function Search (){
     const [ searchStr, setSearchStr ] = useState("");
     const [ load, setLoad ] = useState(false);
     const router = useRouter(); 

     useEffect(() => {
         if (load) {
             router.push(`/search?query=${searchStr}`);
         }
         setLoad(true);
     }, [searchStr]);

    
    return (
    <Input 
    id="search-product" 
    icon={{ name: "search"}} 
    value={router.query.query}
    onChange={(_,data) => setSearchStr(data.value)}
    
    
    />
    );
}