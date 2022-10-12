import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setProcess('loading');

        try {
            const responce = await fetch(url, { method, body, headers });

            if (!responce.ok) {
                throw new Error(`Fetch error ${url}. Status ${responce.status}`);
            }

            const data = await responce.json();
            return data;
        } catch (error) {
            setProcess('error');
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading');
    }, []);

    const setProcessConfirmed = useCallback(() => {
        setProcess('confirmed');
    }, []);

    return { request, clearError, process, setProcessConfirmed };
}