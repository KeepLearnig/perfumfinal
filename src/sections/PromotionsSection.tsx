import { Button } from '@/components/ui/button';
import { Truck, CreditCard, Shield, MessageCircle } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

const benefits = [
  { icon: Truck, title: '¡Enviamos tu compra!', description: 'Entregas a todo el país, tiempo de entrega 7 días aprox' },
  { icon: CreditCard, title: 'Pagá como quieras', description: 'Aceptamos tarjetas, transferencia o efectivo' },
  { icon: Shield, title: 'Comprá con seguridad', description: 'Tus datos siempre protegidos' },
  { icon: MessageCircle, title: '¡Comunícate con nosotros!', description: '¡No dudes en escribirnos!' },
];

export function PromotionsSection() {
  const { promoCards } = useSite();
  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {benefits.map((b, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#f5a9a9] rounded-full flex items-center justify-center">
                <b.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-sm mb-2">{b.title}</h3>
              <p className="text-xs text-gray-600">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Aprovecha nuestros descuentos</h2>
          <p className="text-center text-gray-600 mb-8">Promociones MINORISTAS exclusivas</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {promoCards.map(promo => (
              <div key={promo.id} className="relative overflow-hidden rounded-lg aspect-square">
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                {promo.agotado && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                    <span className="text-white font-black text-lg tracking-widest border-2 border-white px-3 py-1">AGOTADO</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold">{promo.title}</h3>
                  <p className="text-xs">{promo.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button className="bg-black hover:bg-gray-800">VER MÁS</Button>
          </div>
        </div>

        <div className="bg-[#1a1a1a] text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Querés emprender?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Comunicaté con nuestros asesores y preguntá por precios mayoristas</p>
          <Button className="bg-[#f5a9a9] hover:bg-[#e08080] text-white">Contactanos</Button>
          <p className="text-sm text-gray-400 mt-6">ENVIOS GRATIS en compras mayores a $50.000</p>
        </div>
      </div>
    </section>
  );
}
