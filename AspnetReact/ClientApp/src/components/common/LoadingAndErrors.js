import React from 'react'
import { Spinner } from 'react-bootstrap';

export default function LoadingAndErrors({ data, isLoading, error, children }) {
    if (error)
        return <div>Error: {error.message}</div>;
    else if (isLoading)
        return <Spinner animation="border" />;
    else if (!data || data === {} || data === [])
        return <div>There is no any data yet</div>;
    else if (data?.status >= 400)
        return <strong>{data}</strong>;
    else return children;
}
