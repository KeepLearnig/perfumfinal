import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  features: string[];
  image: string;
}

export const defaultSlides: SlideData[] = [
  {
    id: 1,
    title: 'PERFUMES QUE ENAMORAN, PRECIOS QUE SORPRENDEN',
    subtitle: 'FRAGANCIAS EXCLUSIVAS',
    features: [
      'Envios GRATIS a todo el país',
      '12 hs de persistencia',
    ],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'DESCUBRÍ TU FRAGANCIA IDEAL',
    subtitle: 'HASTA 40% OFF',
    features: [
      'Tester originales',
      'Garantía de calidad',
      'Envíos a todo el país',
    ],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=500&fit=crop',
  },
  {
    id: 3,
    title: 'EMPRENDÉ CON ICONIC',
    subtitle: 'PRECIOS MAYORISTAS',
    features: [
      'Sin inversión inicial',
      'Atención personalizada',
      'Catálogo exclusivo',
    ],
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=1200&h=500&fit=crop',
  },
];

interface HeroBannerProps {
  slides?: SlideData[];
}

export function HeroBanner({ slides = defaultSlides }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-100">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 max-w-4xl">
                {slide.title}
              </h1>
              <p className="text-xl md:text-4xl font-bold text-[#f5a9a9] mb-4 md:mb-6">
                {slide.subtitle}
              </p>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-lg">
                {slide.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
        onClick={goToPrev}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
        onClick={goToNext}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
