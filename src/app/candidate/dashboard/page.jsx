'use client';

import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useRouter } from 'next/navigation';

export default function CandidateDashboard() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the user is logged in but hasn't completed onboarding, redirect them
    if (!loading && currentUser && !currentUser.firestoreData?.onboarding_complete) {
      router.push('/candidate/onboarding');
    }
  }, [currentUser, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
      <p>Welcome back, {currentUser?.firestoreData?.fullName || 'Talent'}!</p>
    </div>
  );
}