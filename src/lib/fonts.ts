import localFont from 'next/font/local';

export const RedHatText = localFont({
  src: [
    {
      path: '../../public/fonts/RedHatText-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/RedHatText-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/RedHatText-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ]
});
