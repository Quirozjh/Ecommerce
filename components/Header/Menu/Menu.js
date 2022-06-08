import React, {useState, useEffect} from "react";
import { Container, Menu, Grid, Icon, GridColumn, Label} from "semantic-ui-react";
import Link from "next/link"; 
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {getMeApi} from "../../../api/user";
import {getPlatformsApi} from "../../../api/platform";

export default function Menuweb (){

    const [platforms, setPlatforms] = useState([]);
    const [showModal, setShowModal]= useState(false);
    const [titleModal, setTitleModal]= useState("Inicia Sesión");
    const [user, setUser]= useState(undefined);
    const { auth,logout } = useAuth();


    useEffect (() => {
        (async () =>{
            const response = await getMeApi(logout);
            setUser(response);
        })();
    }, [auth]);

    useEffect(() =>{
        (async ()=>{
            const response = await getPlatformsApi();
            setPlatforms(response || []);
        })();
    }, []);


    const onShowModal = () => setShowModal(true);
    const onCloseModal = () => setShowModal(false);

    return(
    <div className="menu">
        <Container>
            <Grid>
                <GridColumn className=" menu__left" width={6}>
                    <MenuPlatforms platforms={platforms}/>
                </GridColumn>
                <GridColumn className="menu__right" width={10}>
                    {user !==undefined && (
                            <MenuOptions 
                            onShowModal = {onShowModal}
                            user = {user}
                            logout = {logout}
                        />
                    )}  
                </GridColumn>
            </Grid>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size="small">
            <Auth onCloseModal= {onCloseModal} setTitleModal={setTitleModal}/>
        </BasicModal>
    </div>
 );
}

function MenuPlatforms(props){
    const { platforms } = props;
return (
    <Menu>
         {map(platforms, (platform) => (
        <Link href={`/products/${platform.url}`} key={platform._id}>
          <Menu.Item as="a" name={platform.url}>
            {platform.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>   
    );
}



function MenuOptions(props){
    const {onShowModal, user, logout} = props;
    const { productsCart } = useCart();
    return(
        <Menu>
            {user ? (
                <>

                <Link href="/orders">
                    <Menu.Item as="a">
                    <Icon name="laptop"/>
                    Mis pedidos
                    </Menu.Item>
                </Link>

              
                <Link href="/account">
                    <Menu.Item as="a">
                    <Icon name="user outline"/>
                    {user.name} {user.lastname}
                    </Menu.Item>
                </Link>

                <Link href= "/cart">
                    <Menu.Item as="a" className="m-0">
                        <Icon name="cart"/>
                        {productsCart > 0 && (
                            <Label color="red" floating circular>
                            {productsCart}
                            </Label>
                         )}
                    </Menu.Item>
                </Link>


               
                <Menu.Item className="m-0" onClick={logout}> 
                <Icon name= "power off"/>
                </Menu.Item>
                </>
            ):(
           
             <Menu.Item onClick={onShowModal}>
                <Icon name=" user outline" />
                Mi Cuenta
            </Menu.Item>
         )}
        </Menu>
    );   
 
}