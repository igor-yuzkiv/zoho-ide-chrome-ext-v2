import axios from 'axios'

export const isMockApiEnabled = (): boolean => {
    return import.meta.env.VITE_MOCK_API_ENABLED === 'true'
}

export const mockApi = axios.create({
    baseURL: import.meta.env.VITE_MOCK_API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export async function saveMockData(fileName: string, data: Array<unknown>) {
    await mockApi.post(fileName, { data }).catch(console.error)
}

export async function fetchMockData<T>(fileName: string): Promise<T | null> {
    return mockApi
        .get<T>(fileName)
        .then((response) => response.data)
        .catch(() => null)
}
