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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteCartButton from '../DeleteCartButton/DeleteCartButton';
import { Link, useNavigate } from "react-router-dom";
import Style from "./Cart.module.css"



type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
      <div style={{alignItems:"center", display:"flex", flexDirection:"column"}}>
        <List>
          {props.cart?.map((text, index) => (
            <ListItem key={text.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {<img width="75px" src={text.image[0].url} />}
                </ListItemIcon>
                <ListItemText className={Style.text} primary={text.name.length > 20 ? text.name.slice(0, 20) + "..." : text.name} secondary={`$${text.price}`} />
                <DeleteCartButton id={text._id} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {
          props.cart.length > 0 ? <Link to="/paymentCheckout">
          <button className='button'>Comprar</button>
        </Link>
        :
        <div className={Style.emptyCartText}>No tienes productos en tu carro de compras, agregá alguno para verlo aquí</div>
        }
        
      </div>
    </Box>
  );

  return (
    <div>
      {(['Cart'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><ShoppingCartIcon /></Button>
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