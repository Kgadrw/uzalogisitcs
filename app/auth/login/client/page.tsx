'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setCurrentUser } from '@/lib/auth';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

export default function ClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - replace with actual auth
    const user = {
      id: '1',
      name: 'John Doe',
      role: 'client' as const,
      email,
    };
    
    setCurrentUser(user);
    router.push('/dashboard/client');
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
        
        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlineEnvelope className="w-4 h-4" />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlineLockClosed className="w-4 h-4" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-secondary py-3 hover:bg-opacity-90"
          >
            <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
}

