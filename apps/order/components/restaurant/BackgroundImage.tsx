import Image from "next/image";
import React from "react";

type Props = {
  restaurantImage: string;
};

function BackgroundImage({ restaurantImage }: Props) {
  return (
    <div className="absolute top-0 right-0 left-0 ">
      <div className="relative h-56 w-full brightness-50 xl:h-[500px] xl:brightness-75">
        <Image
          src={restaurantImage}
          fill
          className="object-cover"
          priority
          alt="Restaurant header image"
        />
      </div>
    </div>
  );
}

export default BackgroundImage;
