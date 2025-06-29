import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex justify-center">
      <Image 
        src="/resumlyApp-logo.svg" 
        alt="Resumly Logo" 
        width={120}
        height={32}
        className="h-6 sm:h-7 md:h-8 w-auto"
      />
    </div>
  );
} 