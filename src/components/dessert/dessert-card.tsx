import Image from 'next/image';
import { AddToCartButton } from '../cart/add-to-cart-button';

type ImageType = 'thumbnail' | 'mobile' | 'tablet' | 'desktop';

export type DessertProps = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrls: Record<ImageType, string>;
  imageAlt?: string;
};

export function DessertCard({
  id,
  name,
  category,
  price,
  imageUrls,
  imageAlt = 'A photo of a dessert.'
}: DessertProps) {
  return (
    <article>
      <div className="relative mb-9.5 aspect-320/210 md:aspect-320/260">
        <Image
          src={imageUrls.mobile}
          alt={imageAlt}
          width={320}
          height={210}
          loading="lazy"
          className="w-full h-full rounded-lg object-cover md:hidden"
        />
        <Image
          src={imageUrls.tablet}
          alt={imageAlt}
          width={320}
          height={260}
          loading="lazy"
          className="hidden w-full h-full rounded-lg object-cover md:block lg:hidden"
        />
        <Image
          src={imageUrls.desktop}
          alt={imageAlt}
          width={320}
          height={260}
          loading="lazy"
          className="hidden w-full h-full rounded-lg object-cover lg:block"
        />
        <AddToCartButton
          id={id}
          name={name}
          price={price}
          thumbnailUrl={imageUrls.thumbnail}
        />
      </div>
      <DessertDetails name={name} category={category} price={price} />
    </article>
  );
}

function DessertDetails({
  category,
  name,
  price
}: Pick<DessertProps, 'category' | 'name' | 'price'>) {
  return (
    <div className="space-y-1">
      <div className="text-[0.875rem] text-rose-500">{category}</div>
      <h2 className="font-semibold">{name}</h2>
      <div className="font-semibold text-red">${price.toFixed(2)}</div>
    </div>
  );
}
