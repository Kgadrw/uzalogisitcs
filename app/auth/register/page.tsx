'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCurrentUser } from '@/lib/auth';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhone, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

export default function ClientRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Register client
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'client',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Auto-login after registration
      if (data.data?.user) {
        setCurrentUser(data.data.user);
        router.push('/dashboard/client');
      } else {
        // Redirect to login if auto-login not available
        router.push('/auth/login/client?registered=true');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-primary border-opacity-20 p-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image 
            src="/logo.png" 
            alt="Logistics" 
            width={48} 
            height={48}
            className="flex-shrink-0"
          />
          <h1 className="text-primary text-3xl">Logistics</h1>
        </div>
        
        <h2 className="text-primary text-xl mb-2 text-center">Create Client Account</h2>
        <p className="text-primary text-sm text-opacity-70 mb-6 text-center">
          Sign up to start managing your shipments
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlineUser className="w-4 h-4" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlineEnvelope className="w-4 h-4" />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlinePhone className="w-4 h-4" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
              placeholder="+1234567890"
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlineLockClosed className="w-4 h-4" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
              minLength={6}
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlineLockClosed className="w-4 h-4" />
              <span>Confirm Password</span>
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
              minLength={6}
              placeholder="Re-enter password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-secondary py-3 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-primary text-sm text-opacity-70">
            Already have an account?{' '}
            <Link href="/auth/login/client" className="text-primary underline hover:text-opacity-70">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
