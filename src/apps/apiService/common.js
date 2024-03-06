import React, { useState, useEffect } from 'react';
import { environment } from '../../environments/environment';

const BASE_API_URL = environment.baseURL;

const ApiCallComponent = ({ endpoint, render }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("endpoint",endpoint)

    useEffect(() => {
        const apiUrl = `${BASE_API_URL}${endpoint}`;
        const fetchData = async () => {
            try {
                fetch(apiUrl).then(async(res)=>{
                    let result = await res.json();
                    setData(result)
                })
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[]);

    return render({ data, loading, error });
};

export default ApiCallComponent;
