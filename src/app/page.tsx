import { Cart } from '@/components/cart/cart';
import { DessertList } from '@/components/dessert/dessert-list';

export default function Page() {
  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_30%] gap-8">
        <div>
          <h1 className="text-[2.5rem] leading-[1.2] font-bold mb-8">
            Desserts
          </h1>
          <DessertList />
        </div>
        <Cart />
      </div>
    </main>
  );
}
