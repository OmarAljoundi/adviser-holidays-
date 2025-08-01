"use client";
import cn from "clsx";
import Image from "next/image";
import { useState } from "react";
import type { ComponentProps } from "react";

type ImageProps = ComponentProps<typeof Image> & {
  containerClassName?: string;
};

export default function BlurImage({ containerClassName, ...rest }: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={cn(containerClassName)}>
      <Image
        {...rest}
        alt={rest.alt}
        className={cn(
          rest.className,
          "duration-700 ease-in-out rounded-medium",
          isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
