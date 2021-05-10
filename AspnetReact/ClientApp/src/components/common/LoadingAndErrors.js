import React from 'react'

export default function LoadingAndErrors({ data, isLoading, error }) {
    if (error)
        return <div>Error: {error.message}</div>;
    else if (isLoading)
        return <div>Loading...</div>;
    else if (!data || data === {} || data === [])
        return <div>There is no any data yet</div>;
}
