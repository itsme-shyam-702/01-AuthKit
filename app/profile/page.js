'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  const initials = user.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
              {initials}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-y-4 text-sm border-t border-gray-100 pt-4">
            <dt className="text-gray-500">Role</dt>
            <dd className="text-gray-900 font-medium capitalize">{user.role}</dd>

            <dt className="text-gray-500">Sign-in method</dt>
            <dd className="text-gray-900 font-medium capitalize">{user.provider}</dd>

            <dt className="text-gray-500">Joined</dt>
            <dd className="text-gray-900 font-medium">{user.createdAt}</dd>
          </dl>
        </div>
      </section>
    </div>
  );
}
