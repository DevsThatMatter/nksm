import Image from "next/image";
const ImageCard = () => {
  return (
    <Image
      alt="Product Image"
      className="w-full h-auto rounded-md"
      height="400"
      src="/Categories/Bicycle.png"
      style={{
        aspectRatio: "800/600",
        objectFit: "cover",
      }}
      width="600"
    />
  );
};
export default ImageCard;
