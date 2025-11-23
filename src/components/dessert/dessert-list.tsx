import { DessertCard } from './dessert-card';
import desserts from '@/data/desserts.json';

export function DessertList() {
  return (
    <div className="grid md:grid-cols-3 gap-x-6 gap-y-8">
      {desserts.map((dessert, index) => (
        <DessertCard
          key={index}
          id={dessert.id}
          name={dessert.name}
          category={dessert.category}
          price={dessert.price}
          imageUrls={dessert.image}
          imageAlt={dessert.name}
        />
      ))}
    </div>
  );
}
