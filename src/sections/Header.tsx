import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { CartItem } from '@/types';
import { EditableLogo } from '@/components/EditableLogo';
import { useSite } from '@/context/SiteContext';

interface HeaderProps {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalTransferPrice: number;
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

function normalizeWhatsApp(phone: string) {
  return phone.replace(/\D/g, '');
}

export function Header({ cartItems, totalItems, totalPrice, onRemoveFromCart, onUpdateQuantity }: HeaderProps) {
  const { socials } = useSite();

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return '';
    let msg = '¡Hola! Quiero realizar el siguiente pedido:\n\n';
    cartItems.forEach((item, i) => {
      msg += `${i + 1}. ${item.name}\n   Cantidad: ${item.quantity}\n   Precio: $${(item.price * item.quantity).toLocaleString('es-AR')}\n\n`;
    });
    msg += `*Total: $${totalPrice.toLocaleString('es-AR')}*\n\nMétodo de pago: _____________\nForma de envío: _____________\n\n¡Gracias!`;
    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    const msg = generateWhatsAppMessage();
    const phone = normalizeWhatsApp(socials.whatsapp || '542975003159');
    if (msg && phone) window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <header className="bg-white py-4 px-4 md:px-8 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <a href="/" className="shrink-0" aria-label="Ir al inicio">
          <EditableLogo dark size="md" />
        </a>

        <div className="hidden md:block text-center flex-1">
          <p className="text-sm text-gray-500">Catálogo administrable y sincronizado con el panel</p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 min-w-[124px] justify-end">
              <ShoppingCart className="w-6 h-6" />
              <div className="flex flex-col items-start text-sm">
                <span>Carrito ({totalItems})</span>
                <span className="font-semibold">${totalPrice.toLocaleString('es-AR')}</span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader><SheetTitle>Carrito de Compras</SheetTitle></SheetHeader>
            <div className="mt-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-lg font-bold">${item.price.toLocaleString('es-AR')}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                          <Button size="sm" variant="ghost" className="text-red-500 ml-auto" onClick={() => onRemoveFromCart(item.id)}>Eliminar</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${totalPrice.toLocaleString('es-AR')}</span>
                    </div>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={handleCheckout}>
                      Finalizar Compra por WhatsApp
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
