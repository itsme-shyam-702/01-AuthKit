import Navbar from '@/components/Navbar';
import { Shield, Lock, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">About AuthKit</h1>
        <p className="text-gray-500 mb-10">
          AuthKit is a lightweight, no-frills authentication starter built with Next.js.
          It ships with everything you need to register, log in, and protect pages with
          JWT-based sessions — nothing more, nothing less.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Secure by default', desc: 'Passwords are hashed and sessions use httpOnly JWT cookies.' },
            { icon: Lock, title: 'Protected routes', desc: 'Pages like the dashboard and profile only load for signed-in users.' },
            { icon: Zap, title: 'Minimal footprint', desc: 'Just the auth flow — no extra clutter to wade through.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
