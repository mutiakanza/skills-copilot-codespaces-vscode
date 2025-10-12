import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      window.location.href = '/id/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  
  ssoLogin: (ssoId: string, email: string, name: string) =>
    apiClient.post('/auth/sso', { ssoId, email, name }),
  
  logout: () => {
    localStorage.removeItem('access_token');
  },
};

// Courses API
export const coursesAPI = {
  getAll: () => apiClient.get('/courses'),
  getOne: (id: string) => apiClient.get(`/courses/${id}`),
  create: (data: any) => apiClient.post('/courses', data),
  update: (id: string, data: any) => apiClient.put(`/courses/${id}`, data),
  delete: (id: string) => apiClient.delete(`/courses/${id}`),
};

// Users API
export const usersAPI = {
  getAll: () => apiClient.get('/users'),
  getOne: (id: string) => apiClient.get(`/users/${id}`),
  updateRole: (id: string, role: string) => 
    apiClient.put(`/users/${id}/role`, { role }),
};

export default apiClient;
