import Image from "next/image";

export default function Avatar({
  src,
  alt,
  className,
}: Readonly<{ src: string; alt: string; className?: string }>) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={10000000000}
        height={10000000000}
        className="rounded-full"
      />
    </div>
  );
}
