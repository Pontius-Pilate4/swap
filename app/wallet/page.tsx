import Image from "next/image";
import Form from "@/components/Form";

const Page = () => {
  return (
    <div className="  bg-white min-h-screen pt-[25px] pb-[100px] justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <a
          href="/"
          className=" hover:scale-110 active:scale-105 transition-all duration-200 hover:text-white cursor-pointer"
        >
          <Image
            src={`/piLogo.png`}
            alt="logo"
            width={100}
            height={100}
            quality={90}
            priority
            className="lg:w-[200px] lg:h-[200px] object-cover"
          />
        </a>
        <p className=" font-work text-[16px] sm:text-[20px] text-gray-700 font-semibold text-center px-2">
          Unlock wallet to Swap π
        </p>
      </div>

      <div className="flex justify-center mt-[50px]">
        <Form />
      </div>
    </div>
  );
};
export default Page;
