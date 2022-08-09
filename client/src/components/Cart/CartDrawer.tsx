import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteCartButton from '../DeleteCartButton/DeleteCartButton';
import { Link } from "react-router-dom";
import Style from "./Cart.module.css";
import { useJwt } from 'react-jwt'


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer(props: any) {
  const [state, setState] = React.useState<any>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { decodedToken } = useJwt<any>(localStorage.getItem("usuario") || "")
  let autho = decodedToken?.role
  let googleUser = decodedToken?.email_verified

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
        <List>
          {props.cart?.map((text: any, index: any) => (
            <ListItem key={text.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {<img width="75px" src={text.image[0].url} alt="HDP" />}
                </ListItemIcon>
                <ListItemText className={Style.text} primary={text.name.length > 20 ? text.name.slice(0, 20) + "..." : text.name} secondary={`$${text.price}`} />
                <DeleteCartButton id={text._id} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {
          props.cart.length > 0 && (autho || googleUser) ?
            <div style={{ display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
              <div>Total: ${props.cart.map((e: any) => (e.price * e.quantity)).reduce((a: any, b: any) => a + b, 0)}</div>
              <hr className={Style.hrTotal} />
              <br />
              <Link to="/paymentMethod">
                <button className='button' onClick={toggleDrawer(anchor, false)}>Comprar</button>
              </Link>
            </div>
            : props.cart.length > 0 && !autho ? <div style={{ display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
              <div>Total: ${props.cart.map((e: any) => (e.price * e.quantity)).reduce((a: any, b: any) => a + b, 0)}</div>
              <hr className={Style.hrTotal} />
              <h6 className={Style.cartText}>Para completar tu compra debes estar logueado, puedes registrarte o si ya tienes una cuenta, puedes iniciar sesión</h6>
              <div className={Style.buttonsCart}><Link to="/register">
                <button className="button" >Registrarse</button>
              </Link>
                <Link to="/login">
                  <button className="button" >Iniciar Sesión</button>
                </Link></div></div>
              :
              <div className={Style.emptyCartText}>No tienes productos en tu carro de compras, agregá alguno para verlo aquí</div>
        }

      </div>
    </Box>
  );

  return (
    <div>
      {(['Cart'] as const).map((anchor: any) => (
        <React.Fragment key={anchor}>
          <Button sx={{ minWidth: "0", position: "relative", padding: "5px" }} onClick={toggleDrawer(anchor, true)}><ShoppingCartIcon sx={{ fontSize: '30px' }} />
            <h6 className={Style.cartNumber}>+{props.cart.length}</h6></Button>
          <SwipeableDrawer
            anchor={"right"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}