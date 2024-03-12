// import { useState, useEffect } from 'react';
// import { environment } from '../../environments/environment';

// const BASE_API_URL = environment.baseURL;

// const ApiCallComponent = ({ endpoint, render }) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     console.log("endpoint",endpoint)

//     useEffect(() => {
//         const apiUrl = `${BASE_API_URL}${endpoint}`;
//         const fetchData = async () => {
//             try {
//                 fetch(apiUrl).then(async(res)=>{
//                     let result = await res.json();
//                     setData(result)
//                 })
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     },[]);

//     return render({ data, loading, error });
// };

// export default ApiCallComponent;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { environment } from '../../environments/environment';

const BASE_API_URL = environment.baseURL;

const ApiCallComponent = ({ endpoint, render }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `${BASE_API_URL}${endpoint}`;

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setData(response.data);
            } catch (err) {
                console.log("error",err)
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);  // Include 'endpoint' in the dependencies array to react to changes

    return render({ data, loading, error });
};

export default ApiCallComponent;
