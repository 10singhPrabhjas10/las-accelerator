import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

// Define the shape of the context state
interface ErrorContextType {
  error: string | null;
  showError: (message: string, request?: any) => void;
  clearError: () => void;
  retryRequest: () => Promise<void>;
}

// Create the context with a default value
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}
export const ErrorProvider: React.FC<ErrorProviderProps> = ({children}) => {
  const [error, setError] = useState<string | null>(null);
  const [failedRequest, setFailedRequest] = useState<any>(null);

  const showError = (message: string, request?: any) => {
    setError(message);
    setFailedRequest(request);
  };

  const clearError = () => {
    setError(null);
    setFailedRequest(null);
  };

  const retryRequest = async () => {
    if (failedRequest) {
      try {
        clearError();
        // await axiosClient(failedRequest);
      } catch (error) {
        // Handle retry failure
      }
    }
  };

  return (
    <ErrorContext.Provider value={{error, showError, clearError, retryRequest}}>
      {children}
    </ErrorContext.Provider>
  );
};

export const withErrorHandler = (WrappedComponent: React.FC<any>) => {
  return (props: any) => {
    const context = useContext(ErrorContext);

    // Check if context is undefined
    // if (!context) {
    //   throw new Error('withErrorHandler must be used within an ErrorProvider');
    // }

    return <WrappedComponent {...props} />;
  };
};
