import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#f5a9a9] rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
        <p className="text-gray-600 mb-6">
          ¿Querés recibir nuestras ofertas? ¡Registrate ya mismo y comenzá a disfrutarlas!
        </p>
        
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg">
            ¡Gracias por suscribirte! Pronto recibirás nuestras ofertas.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Ingresá tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-black hover:bg-gray-800">
              Suscribirme
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
