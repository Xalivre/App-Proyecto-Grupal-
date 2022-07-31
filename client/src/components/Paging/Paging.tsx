import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './Paging.module.css'

export default function PaginationOutlined(props: any) {

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        props.setPage1((value - 1) * 20);
        props.setPage2(value * 20);
    };

    return (
        <div className={styles.container}>
            {page && null}
        <Stack spacing={2}>
            <Pagination onChange={handleChange} count={props.filtereds} color="primary" />
        </Stack>
        </ div>
    );
}