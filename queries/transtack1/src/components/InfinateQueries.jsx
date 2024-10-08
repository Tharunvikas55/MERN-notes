import React from 'react';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchFruits = ({ pageParam }) => {
    return axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${pageParam}`);
};

const InfiniteQueries = () => {
    const { data, isError, isLoading, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['fruits'],
        queryFn: fetchFruits,
        initialPageParam: 1,
        getNextPageParam: (_lastPage, allPages) => {
            if (allPages.length < 14)
                return allPages.length + 1;
            else
                return undefined;
        }
    });

    if (isLoading) return <div className="text-center py-5">Loading...</div>;
    if (isError) return <div className="text-danger py-5">{error.message}</div>;

    return (
        <div className="container mt-4">
            {data?.pages?.map(page => {
                return page?.data.map(fruit => {
                    return (
                        <div key={fruit.id} className="mb-3"> {/* Bootstrap margin bottom */}
                            <div className="card shadow-sm border-0"> {/* Bootstrap card */}
                                <div className="card-body">
                                    <h5 className="card-title fw-bold text-primary">{fruit.name}</h5>
                                    <p className="card-text text-muted">
                                        {fruit.name} is a popular fruit known for its rich flavor and numerous health benefits.
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-top-0">
                                    <small className="text-muted">Fruit ID: {fruit.id}</small>
                                </div>
                            </div>
                        </div>
                    );
                });
            })}
            <div className="text-center mt-3">
                <button onClick={fetchNextPage} className="btn btn-primary" >
                    Load More...
                </button>
            </div>
        </div>
    );
};

export default InfiniteQueries;
