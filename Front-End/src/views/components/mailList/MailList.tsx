import { Input } from "@/components/ui";

export const MailList = () => {
  return (
    <div className="mail w-full mt-24 bg-blue-800 text-white flex flex-col items-center gap-4 p-10">
      <h1 className="mailTitle text-3xl font-bold">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer flex items-center gap-4">
        <Input size="lg" className="text-black" placeholder="Your Email" />
        <button className="h-12 px-6 bg-blue-600 text-white font-semibold rounded-md cursor-pointer">
          Subscribe
        </button>
      </div>
    </div>
  );
};
