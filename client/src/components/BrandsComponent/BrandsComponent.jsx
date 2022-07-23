import React, { useState} from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../redux/actions"

export default function CategoriesBar(props) {

    const brands = useSelector((state) => state.brands)
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const openDropdown = () => {
        setDropdown(!dropdown)
    }

  return (
    <div>
         <Dropdown isOpen={dropdown} toggle={openDropdown} size="lr" >
                <DropdownToggle caret>
                    Marcas
                </DropdownToggle>
                <DropdownMenu >
                    {
                        props.products && brands?.filter((j) => props.products.includes(j)).map((e) => <DropdownItem value={e} onClick={(e) => props.setBrandFilter(e.target.value)}
                        > {e}
                        </DropdownItem>)
                    }
                </DropdownMenu>
            </Dropdown>
    </div>
  )
}
