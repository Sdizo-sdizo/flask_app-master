import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
<<<<<<< HEAD
  // Remove any baseURL to use relative URLs with the Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor with better logging
api.interceptors.request.use((config) => {
  // Log the full URL being requested
  const fullUrl = config.url;
  console.log('Making API request:', {
    url: fullUrl,
    method: config.method,
    data: config.data,
    headers: config.headers
  });
  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor with better error logging
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('API error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } else if (error.response?.status === 403) {
      console.error('Access denied:', error.response.data.error);
=======
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Important for CORS with credentials
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
    }
    return Promise.reject(error);
  }
);

// Auth API calls matching your Flask endpoints
export const authAPI = {
<<<<<<< HEAD
  register: (userData: any) => {
    console.log('API register request:', userData); // Debug log
    return api.post('/api/auth/register', userData);
  },
  
  login: (email: string, password: string) => {
    return api.post('/api/auth/login', {
      email: email.trim(),
      password: password
    });
  },
  
  getCurrentUser: () => api.get('/api/auth/current-user'),
  
  verifyEmail: (email: string, verificationCode: string) => {
    return api.post('/api/verify-email', {
      email: email,
      verification_code: verificationCode
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  
  resendVerificationCode: (email: string) =>
    api.post('/api/resend-verification', { email: email }),
=======
  register: (userData: {
    full_name: string;
    email: string;
    password: string;
    phone: string;
    confirm_password: string;
  }) => api.post('/auth/register', userData),
  
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  getCurrentUser: () => api.get('/auth/me'),
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
};

// User API calls
export const userAPI = {
<<<<<<< HEAD
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/me', data),
  getUserStats: () => api.get('/api/user/stats'),
  getAvailableGroups: () => api.get('/api/user/groups'),
=======
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
};

// Stokvel API calls
export const stokvelAPI = {
<<<<<<< HEAD
  getStokvels: () => api.get('/groups'),
  createStokvel: (data: any) => api.post('/groups', data),
  getStokvelDetails: (id: string) => api.get(`/groups/${id}`),
  joinStokvel: (id: string) => api.post(`/groups/${id}/join`),
};

// Admin API calls
export const adminAPI = {
  getStats: () => api.get('/api/admin/stats'),
  getGroups: () => api.get('/api/admin/groups'),
  createGroup: (data: any) => api.post('/admin/groups', data),
};

const getPolls = async () => {
  const response = await api.get('/polls');
  return response.data;
};

const createPoll = async (pollData: any) => {
  const response = await api.post('/polls', pollData);
  return response.data;
};

const getMeetings = async () => {
  const response = await api.get('/meetings');
  return response.data;
};

const createMeeting = async (meetingData: any) => {
  const response = await api.post('/meetings', meetingData);
  return response.data;
};

const getWithdrawals = async () => {
  const response = await api.get('/withdrawals');
  return response.data;
};

const createWithdrawal = async (withdrawalData: any) => {
  const response = await api.post('/withdrawals', withdrawalData);
  return response.data;
};

const approveWithdrawal = async (withdrawalId: number) => {
  const response = await api.post(`/withdrawals/${withdrawalId}/approve`);
  return response.data;
};

const rejectWithdrawal = async (withdrawalId: number) => {
  const response = await api.post(`/withdrawals/${withdrawalId}/reject`);
  return response.data;
};

export {
  getPolls,
  createPoll,
  getMeetings,
  createMeeting,
  getWithdrawals,
  createWithdrawal,
  approveWithdrawal,
  rejectWithdrawal
};

export const dashboardAPI = {
  // Admin endpoints
  getUsers: () => api.get('/api/dashboard/users'),
  manageGroups: () => api.get('/dashboard/groups'),
  
  // Common endpoints (accessible by both roles)
  getProfile: () => api.get('/dashboard/profile'),
  updateProfile: (data: any) => api.put('/dashboard/profile', data),
  
  // Member endpoints
  getMyGroups: () => api.get('/dashboard/my-groups'),
  getContributions: () => api.get('/dashboard/contributions'),
=======
  getStokvels: () => api.get('/stokvels'),
  createStokvel: (data: any) => api.post('/stokvels', data),
  getStokvelDetails: (id: string) => api.get(`/stokvels/${id}`),
  joinStokvel: (id: string) => api.post(`/stokvels/${id}/join`),
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
};

export default api; 