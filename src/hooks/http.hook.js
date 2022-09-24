import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setLoading(true);

        try {
            const responce = await fetch(url, { method, body, headers });

            if (!responce.ok) {
                throw new Error(`Fetch error ${url}. Status ${responce.status}`);
            }

            const data = await responce.json();

            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, error, request, clearError };
}