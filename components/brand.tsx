import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link className={`brand-lockup ${compact ? "brand-lockup-compact" : ""}`} href="/" aria-label="Tare Cover home">
      <Image src="/msulogo.jpeg" alt="MSU logo" width={38} height={38} priority />
      <span><strong>Tare</strong>Cover</span>
    </Link>
  );
}