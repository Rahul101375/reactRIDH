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

const ApiCallComponent = ({ endpoint, render,method,payload }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `${BASE_API_URL}${endpoint}`;

        const fetchData = async () => {
            try {
               // eslint-disable-next-line default-case
               let response
               switch(method){
                case 'post':  
                 response = await axios.post(apiUrl,payload);
                setData(response.data);
                break;
                case 'put':  
                 response = await axios.put(apiUrl);
                setData(response.data);
                break;
                case 'delete':  
                 response = await axios.delete(apiUrl);
                setData(response.data);
                break;
                default:  
                 response = await axios.get(apiUrl);
                setData(response.data);
                break;
               }
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
