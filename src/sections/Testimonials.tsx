import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mariana Martinez',
    text: 'Me encantooo. No puedo creerlo, es el mismo aroma, y dura un montòn. Ademas me atendieron raàpido, mi pedido llego supèr ràpido',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ignacio',
    text: 'El erba pura, es buenisimo. Me gustò mucho el olor, hasta mi novia lo usa, tengo que volver a comprar',
    rating: 5,
  },
  {
    id: 3,
    name: 'Carolina',
    text: 'Excelente atención y calidad. Los perfumes son originales y duran todo el día. Muy recomendable!',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ¡Opiniones sobre nosotros!
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="font-bold mb-2">{testimonial.name}</h3>
              <p className="text-gray-600 text-sm">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
