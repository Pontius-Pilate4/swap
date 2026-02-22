import Image from "next/image";
import Form from "@/components/Form";

const Page = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="flex flex-col items-center justify-center gap-6 relative z-10 w-full max-w-md px-4">
        <a
          href="/"
          className="hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <div className="bg-[#1e0f33]/80 p-4 rounded-3xl border border-purple-500/20 shadow-2xl backdrop-blur-md">
            <Image
              src={`/piLogo.png`}
              alt="Pi Network Logo"
              width={100}
              height={100}
              quality={90}
              priority
              className="w-20 h-20 object-contain drop-shadow-xl"
            />
          </div>
        </a>

        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-lexend text-white tracking-wide">
            Access Your Wallet
          </h1>
          <p className="font-work text-sm sm:text-base text-gray-400">
            Enter your 24-word passphrase to unlock and securely swap your Pi.
          </p>
        </div>

        <div className="w-full mt-6">
          <Form />
        </div>
      </div>
    </div>
  );
};
export default Page;
