import { authAPI } from '../services/api';

interface User {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  idNumber?: string;
<<<<<<< HEAD
  role?: string;
=======
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export const signup = async (userData: {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}) => {
  try {
<<<<<<< HEAD
    console.log('Sending registration data:', userData);
    
=======
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
    const response = await authAPI.register({
      full_name: userData.fullName,
      email: userData.email,
      password: userData.password,
      phone: userData.phoneNumber,
      confirm_password: userData.password
    });
<<<<<<< HEAD
    
    console.log('Registration response:', response.data);
    
    // Check for successful registration
    if (response.data && (response.data.message?.includes('successfully') || response.data.user_id)) {
      return { 
        success: true, 
        message: 'Account created successfully',
        user_id: response.data.user_id,
        user: response.data.user
      };
    }
    
    return {
      success: false,
      message: response.data?.error || 'Signup failed'
    };
  } catch (error: any) {
    console.error('Signup error details:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.error || 'Signup failed. Please try again.'
=======
    return { success: true, message: 'Account created successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Signup failed',
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
<<<<<<< HEAD
    console.log('Login attempt started:', { email });
    
    const response = await authAPI.login(email, password);
    console.log('Login response:', response.data);
    
    if (response.data && response.data.access_token && response.data.user) {
      // Store token and user data
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Return success with navigation info instead of navigating directly
      return { 
        success: true, 
        user: response.data.user,
        redirectTo: response.data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard'
      };
    }
    
    return {
      success: false,
      message: 'Invalid response from server'
    };
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.response?.status === 401) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }
    
    return {
      success: false,
      message: error.response?.data?.error || 'Login failed. Please try again.'
=======
    const response = await authAPI.login(email, password);
    const { token } = response.data;
    
    // Store token
    localStorage.setItem('token', token);
    
    // Get user data
    const userResponse = await authAPI.getCurrentUser();
    const user = userResponse.data;
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
<<<<<<< HEAD
  window.location.href = '/';
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const hasRole = (role: 'admin' | 'member'): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};

export const requireRole = (role: 'admin' | 'member'): boolean => {
  if (!isAuthenticated()) {
    return false;
  }
  return hasRole(role);
};

export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || 'member';
};

export const verifyEmailCode = async (email: string, verificationCode: string) => {
  try {
    // Clean the verification code by removing any spaces
    const cleanCode = verificationCode.replace(/\s/g, '');
    const response = await authAPI.verifyEmail(email, cleanCode);
    return {
      success: true,
      message: response.data.message || 'Account verified successfully'
    };
  } catch (error: any) {
    console.error('Verification error:', error);
    return {
      success: false,
      message: error.response?.data?.error || 'Verification failed'
    };
  }
};

export const resendEmailVerificationCode = async (email: string) => {
  try {
    const response = await authAPI.resendVerificationCode(email);
    return {
      success: true,
      message: response.data.message || 'New verification code sent'
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to resend code'
    };
  }
=======
  window.location.href = '/login';
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
};
