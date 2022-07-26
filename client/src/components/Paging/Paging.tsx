import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationOutlined(props) {

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        props.setPage1((value - 1) * 18);
        props.setPage2(value * 18);
    };

    return (
        <Stack spacing={2}>
            <Pagination onChange={handleChange} count={props.filtereds} color="primary" />
        </Stack>
    );
}