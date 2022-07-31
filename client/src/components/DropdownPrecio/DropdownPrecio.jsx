import { sortPrice } from '../../redux/actions'
import React, { useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch } from 'react-redux';

export default function DropdownPrecio() {
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()

    const openDropdown = () => {
        setDropdown(!dropdown)
    }
  return (
    <div>
        <Dropdown isOpen={dropdown} toggle={openDropdown} size="lr" >
            <DropdownToggle className="dropdown" caret>
                Precio
            </DropdownToggle>
            <DropdownMenu className="dropdownMenu">      
                   <DropdownItem className="dropdown" value="Ascending" onClick={(e) => dispatch(sortPrice(e.target.value))}>
                    Menor precio
                    </DropdownItem>
                     <DropdownItem className="dropdown" value="Descending" onClick={(e) => dispatch(sortPrice(e.target.value))}>
                        Mayor precio
                     </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
)
}
