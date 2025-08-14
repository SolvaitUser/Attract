import React from 'react';
import { addToast } from '@heroui/react';

// Define user types
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  country: string;
  mobile?: string;
  profilePicture?: string;
  profileCompleted: number;
  resume?: string;
  resumeParsed: boolean;
  jobPreferences?: JobPreferences;
  education?: Education[];
  workExperience?: WorkExperience[];
  skills?: string[];
  certifications?: Certification[];
  languages?: Language[];
  linkedInProfile?: string;
  createdAt: Date;
}

interface JobPreferences {
  jobTypes: string[];
  locations: string[];
  departments: string[];
  minimumSalary?: number;
  remote: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  description?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  description?: string;
}

interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialID?: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited' | 'Professional' | 'Full Professional' | 'Native';
}

// Define auth context types
interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<UserProfile> & { password: string }) => Promise<void>;
  logout: () => void;
  googleSignIn: () => Promise<void>;
  linkedInSignIn: () => Promise<void>;
  appleSignIn: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadResume: (file: File) => Promise<string>;
  resetPassword: (email: string) => Promise<void>;
}

// Create the context
export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  googleSignIn: async () => {},
  linkedInSignIn: async () => {},
  appleSignIn: async () => {},
  updateProfile: async () => {},
  uploadResume: async () => '',
  resetPassword: async () => {},
});

// Mock user data for demonstration
const MOCK_USER: UserProfile = {
  id: 'user123',
  fullName: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  country: 'United States',
  mobile: '+1 (555) 123-4567',
  profilePicture: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=123',
  profileCompleted: 85,
  resumeParsed: true,
  jobPreferences: {
    jobTypes: ['Full-time', 'Contract'],
    locations: ['New York', 'Remote'],
    departments: ['Technology', 'Product'],
    minimumSalary: 100000,
    remote: true,
  },
  education: [
    {
      id: 'edu1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2018-09-01',
      endDate: '2020-06-30',
      ongoing: false,
      description: 'Specialized in Artificial Intelligence and Machine Learning',
    },
    {
      id: 'edu2',
      institution: 'University of Michigan',
      degree: 'Bachelor of Science',
      field: 'Software Engineering',
      startDate: '2014-09-01',
      endDate: '2018-05-30',
      ongoing: false,
    },
  ],
  workExperience: [
    {
      id: 'exp1',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      startDate: '2020-07-01',
      endDate: '',
      ongoing: true,
      description: 'Working on machine learning algorithms for search optimization.',
    },
    {
      id: 'exp2',
      company: 'Microsoft',
      position: 'Software Engineer',
      location: 'Seattle, WA',
      startDate: '2018-06-01',
      endDate: '2020-06-30',
      ongoing: false,
      description: 'Developed features for Office 365 suite and collaborated with cross-functional teams.',
    },
  ],
  skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'AWS', 'Docker', 'Kubernetes', 'Data Science', 'SQL'],
  certifications: [
    {
      id: 'cert1',
      name: 'AWS Certified Solutions Architect',
      organization: 'Amazon Web Services',
      issueDate: '2021-05-15',
      expiryDate: '2024-05-15',
      credentialID: 'AWS-123456',
    },
    {
      id: 'cert2',
      name: 'Google Cloud Professional Developer',
      organization: 'Google Cloud',
      issueDate: '2022-01-10',
      credentialID: 'GCP-789012',
    },
  ],
  languages: [
    {
      id: 'lang1',
      name: 'English',
      proficiency: 'Native',
    },
    {
      id: 'lang2',
      name: 'Spanish',
      proficiency: 'Professional',
    },
    {
      id: 'lang3',
      name: 'French',
      proficiency: 'Limited',
    },
  ],
  linkedInProfile: 'https://www.linkedin.com/in/alexjohnson/',
  createdAt: new Date('2023-01-15'),
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Check if user is logged in on initial load
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check for a valid token here
        const savedUser = localStorage.getItem('user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Authentication check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, simple validation
      if (email && password) {
        // Store user in state and localStorage
        setUser(MOCK_USER);
        localStorage.setItem('user', JSON.stringify(MOCK_USER));
        
        addToast({
          title: 'Login Successful',
          description: 'Welcome back to Wise Recruitment.',
          severity: 'success',
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      addToast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'An error occurred during login.',
        severity: 'danger',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: Partial<UserProfile> & { password: string }) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new user object
      const newUser: UserProfile = {
        ...MOCK_USER,
        id: `user_${Date.now()}`,
        fullName: userData.fullName || 'New User',
        email: userData.email || 'user@example.com',
        country: userData.country || 'United States',
        mobile: userData.mobile,
        profileCompleted: 40, // Basic registration completes 40% of profile
        resumeParsed: false,
        createdAt: new Date(),
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      addToast({
        title: 'Registration Successful',
        description: 'Your account has been created successfully.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Registration error:', error);
      addToast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An error occurred during registration.',
        severity: 'danger',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    addToast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      severity: 'success',
    });
  };

  // OAuth sign-in functions
  const googleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful sign-in
      setUser(MOCK_USER);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      
      addToast({
        title: 'Login Successful',
        description: 'You have been signed in with Google.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
      addToast({
        title: 'Sign-in Failed',
        description: error instanceof Error ? error.message : 'An error occurred during sign-in.',
        severity: 'danger',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const linkedInSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful sign-in
      setUser(MOCK_USER);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      
      addToast({
        title: 'Login Successful',
        description: 'You have been signed in with LinkedIn.',
        severity: 'success',
      });
    } catch (error) {
      console.error('LinkedIn sign-in error:', error);
      addToast({
        title: 'Sign-in Failed',
        description: error instanceof Error ? error.message : 'An error occurred during sign-in.',
        severity: 'danger',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const appleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful sign-in
      setUser(MOCK_USER);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      
      addToast({
        title: 'Login Successful',
        description: 'You have been signed in with Apple.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Apple sign-in error:', error);
      addToast({
        title: 'Sign-in Failed',
        description: error instanceof Error ? error.message : 'An error occurred during sign-in.',
        severity: 'danger',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        // Update user object
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        addToast({
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully.',
          severity: 'success',
        });
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      addToast({
        title: 'Update Failed',
        description: error instanceof Error ? error.message : 'An error occurred while updating your profile.',
        severity: 'danger',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload resume function
  const uploadResume = async (file: File): Promise<string> => {
    try {
      setIsLoading(true);
      
      // Simulate file upload and AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful upload with resume URL
      const resumeUrl = 'https://example.com/resume.pdf';
      
      if (user) {
        // Update user with resume information
        const updatedUser = { 
          ...user, 
          resume: resumeUrl,
          resumeParsed: true,
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        addToast({
          title: 'Resume Uploaded',
          description: 'Your resume has been uploaded and processed by AI.',
          severity: 'success',
        });
      }
      
      return resumeUrl;
    } catch (error) {
      console.error('Resume upload error:', error);
      addToast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An error occurred while uploading your resume.',
        severity: 'danger',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast({
        title: 'Password Reset Email Sent',
        description: 'Check your email for password reset instructions.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Password reset error:', error);
      addToast({
        title: 'Reset Failed',
        description: error instanceof Error ? error.message : 'An error occurred while resetting your password.',
        severity: 'danger',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    googleSignIn,
    linkedInSignIn,
    appleSignIn,
    updateProfile,
    uploadResume,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
