import React, { useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { searchName } from "../../redux/actions/"


export default function DropdownComponent(props) {

    const categories = useSelector((state) => state.categories)
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()

    const openDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <div>
            <Dropdown isOpen={dropdown} toggle={openDropdown} size="lr" >
                <DropdownToggle className="dropdown" caret>
                    Categorias
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                    {
                        props.products && categories.map((e) => <DropdownItem key={e}className="dropdown" value={e} onClick={async (e) => {dispatch(searchName("aklsjdhlaksjdaskldazzzz")); props.setCategoryFilter(e.target.value); props.setBrandFilter("")}}
                        > {e}
                        </DropdownItem>)
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
