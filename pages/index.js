import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';

export default function Home() {
    return (
        <ErrorBoundary>
            <h1>Welcome to the Contact Management App!</h1>
        </ErrorBoundary>
    );
}
