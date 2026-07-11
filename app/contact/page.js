import Navbar from '@/components/Navbar';
import { Mail, MessageCircle, Github } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact</h1>
        <p className="text-gray-500 mb-10">
          Questions about AuthKit? Here&apos;s how to reach us.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Mail, title: 'Email', desc: 'support@authkit.dev' },
            { icon: MessageCircle, title: 'Community', desc: 'Join the discussion forum' },
            { icon: Github, title: 'GitHub', desc: 'github.com/authkit/authkit' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-100 p-5 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
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
