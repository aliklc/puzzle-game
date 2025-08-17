import api from '../axios';
import { AxiosError } from 'axios';

// Sends a POST request to the backend logout endpoint and returns the response.
export async function logout(): Promise<{ message: string }> {
    try {
        const res = await api.post('/auth/logout');
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || 'Logout failed');
        }
        throw new Error('Logout failed');
    }
}
