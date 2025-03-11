import { useState } from "react";

type ImageWithFallbackProps = {
  src: string | undefined;
  alt: string;
  fallbackSrc: string;
  className: string;
};

export default function ImageWithFallback(props: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(props.src);

  const handleError = () => {
    setImgSrc(props.fallbackSrc);
  };

  return (
    <img
      className={props.className}
      src={imgSrc ?? props.fallbackSrc}
      alt={props.alt}
      onError={handleError}
    />
  );
}
