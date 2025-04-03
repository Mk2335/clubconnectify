
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to gracefully handle runtime errors
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 border rounded-md bg-red-50 space-y-4 text-red-800 min-h-[200px]">
          <AlertCircle className="h-10 w-10" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-sm text-red-600">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button 
            variant="outline" 
            onClick={this.handleReset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Fallback component for showing when content fails to load
 */
export function LoadingErrorFallback({ 
  message, 
  onRetry 
}: { 
  message?: string; 
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-md bg-slate-50 space-y-4 min-h-[200px]">
      <AlertCircle className="h-10 w-10 text-amber-500" />
      <h3 className="text-lg font-medium">Unable to load content</h3>
      <p className="text-sm text-muted-foreground">
        {message || "We couldn't load this content. Please try again."}
      </p>
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  );
}

export { ErrorBoundary };
