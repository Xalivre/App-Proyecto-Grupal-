import React, { useState} from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { filterPerCategory, getProducts } from "../../redux/actions/"


export default function DropdownComponent() {

    const categories = useSelector((state) => state.categories)
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openDropdown = () => {
        setDropdown(!dropdown)
    }

    const handleDropdown = (e) => {
        dispatch(filterPerCategory(e.target.value))
        navigate("/products")
    }

    return (
        <div>
            <Dropdown isOpen={dropdown} toggle={openDropdown} size="lr" >
                <DropdownToggle caret>
                    Categorias
                </DropdownToggle>
                <DropdownMenu >
                    {
                        categories?.map((e) => <DropdownItem value={e} onClick={(e) => handleDropdown(e)}
                        > {e}
                        </DropdownItem>)
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
