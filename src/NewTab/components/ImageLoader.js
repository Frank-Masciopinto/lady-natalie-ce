import React, { useEffect, useState } from "react";

const ImageLoader = ({
  imageLoaded,
  imageLoadedRef,
  setImageLoaded,
  imageUrl,
  smallImageUrl,
  className = "",
  loadedClassName = "img-loaded",
  loadingClassName = "img-loading",
  onClick,
  alt,
}) => {
  useEffect(() => {
    setSmallImageClass("blurred");
  }, [imageUrl]);

  const [smallImageClass, setSmallImageClass] = useState("blurred");
  const onImageLoad = () => {
    setImageLoaded(true);
    imageLoadedRef.current = true;
    setSmallImageClass("hidden");
  };

  // Use loading classnames plus user-supplied className for the image
  const mergedClassName = `${
    imageLoaded ? loadedClassName : loadingClassName
  } ${className}`;

  const imageNodes = document.querySelectorAll("img");
  imageNodes.forEach((node, index) => {
    const imageLoaded = node.complete && node.naturalHeight !== 0;

    // The larger image is the second element on the page, at index 1
    if (imageLoaded && index === 1 && smallImageClass !== "hidden")
      setSmallImageClass("hidden");
  });

  return (
    <div style={{ userSelect: 'none' }}>
      <img
        src={smallImageUrl}
        onClick={onClick}
        alt={alt}
        className={`img-loading ${smallImageClass}`}
      />
      <img
        src={imageUrl}
        onClick={onClick}
        className={mergedClassName}
        onLoad={onImageLoad}
        alt={alt}
      />
    </div>
  );
};

export default ImageLoader;
