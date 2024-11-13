'use client';

export default function Protected() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
      <p className="text-gray-600">
        This is a protected page that can only be accessed with a valid API key.
      </p>
    </div>
  );
} 