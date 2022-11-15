import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../../../../public/assets/lottie/waiter.json";
import Confetti from "react-confetti";

type Props = {};

function CompletedPaymentComponent({}: Props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Confetti recycle={false} className="h-full w-full text-sm" />
      </div>

      <div className="items-center p-4 text-center	 text-xl font-medium">
        Thank you for your order we will deliver it to you shortly!
      </div>

      <div className="m-auto w-10/12">
        <div className="h-[400px] w-[300px]">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </>
  );
}

export default CompletedPaymentComponent;
