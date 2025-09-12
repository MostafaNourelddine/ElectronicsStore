import React from "react";
import { FaRegLightbulb, FaArrowRight } from "react-icons/fa";
const HomeHeader = () => {
  return (
    <div className="flex  justify-around items-center py-20 bg-[#eaedf2]">
      <div>
        <div className="text-[#04369a] flex items-center  gap-1 bg-[#d5dbe6] w-fit px-4 py-0.5 rounded-xl text-l font-bold mb-8">
          <FaRegLightbulb className=" font-bold" />
          <span>Latest Tech Collection</span>
        </div>

        <div className="text-6xl font-bold">
          Premium <span className="text-[#04369a]">Electronics</span>
        </div>
        <div className="text-6xl font-bold">For Everyone</div>
        <div className="mt-4 max-w-lg leading-relaxed text-[#767e8f] text-lg">
          Discover cutting-edge technology with unbeatable prices. From
          smartphones to smart homes.
        </div>

        <div className="flex gap-6 mt-10">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">1K+</div>
            <div className="text-gray-600">Happy customers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">200+</div>
            <div className="text-gray-600">Orders Delivered</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>

      <div className="bg-[#04369a] rounded-lg flex items-center justify-center overflow-hidden w-[500px] h-[350px] shadow-[0_4px_100px_rgba(4,54,154,0.4)] ">
        <img
          className="w-full h-full object-cover"
          src="https://id-preview--cbf82ff0-1283-49fd-8129-802a4ec5ea1c.lovable.app/assets/smartphone-hero-D-jb-vH5.jpg"
          alt="Smartphone"
        />
      </div>
    </div>
  );
};

export default HomeHeader;
