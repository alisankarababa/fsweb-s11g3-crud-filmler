import axios from "axios";
import { useState } from "react";

export const useAxiosMethods = Object.freeze({

    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete"
});

export function useAxios(baseURL, method, url) {

    const instance = axios.create({
			baseURL: baseURL,
			timeout: 1000,
	});

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({});
    const [error, setError] = useState({});


    function sendAxiosRequest(body=null, header=null ) {

        setLoading(true);

        instance[method](url, body, header)
            .then( res => {
                setResponse(res);
                console.log(res);
            })
            .catch( err => {
                setError(err);
                console.error(err);
            })
            .finally(() => {

                setLoading(false);
            })
    }

    return { sendAxiosRequest, response, error, loading };
}