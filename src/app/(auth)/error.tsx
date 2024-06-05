'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import UnexpectedError from '@/core/components/UnExpectedError';
import { isDevelopment } from '@/core/utils/check-environment';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  if (isDevelopment()) {
    throw error;
  }

  return (
    <UnexpectedError
      title="Un Expected Error"
      content="Seems the cat found the cables"
      onResetError={reset}
    />
  );
}
