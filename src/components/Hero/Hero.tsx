/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import DoctorImage from "../../../public/assests/bruno-rodrigues-279xIHymPYY-unsplash-removebg-preview.png";

const Hero = () => {
  const HeroData = [
    {
      name: "43+",
      description: "Years of Experience",
    },
    {
      name: "100+",
      description: "Specialist Doctors",
    },
  ];

  return (
    <div className="common h-[740px] md:flex items-center ">
      {/* welcome */}
      <div className="font-inter my-[20px] md:my-0 flex flex-col h-[400px] justify-around">
        <p className="text-primary md:text-[20px] text-[16px] font-semibold">
          WELCOME TO BIRDEM CDiC
        </p>
        <p className="font-poppins md:text-[45px] text-[15px] md:w-[550px]">
          “Smiles on the faces of the little ones afflicted by diabetes makes
          our efforts worthwhile”
        </p>
        <p className="md:w-[500px] text-gray-[400px] font-poppins text-gray-500">
          Provide total healthcare including rehabilitation for all diabetics
          irrespective of gender, economic and social status through different
          institutions of Diabetic Associations of Bangladesh.
        </p>

        <div className="flex w-full gap-5 my-[10px]">
          <button className="appointmentButton">Get Start</button>
          <button className="px-[20px] py-[10px]  rounded-xl border-2 scale-100 hover:scale-110 ease-in duration-100 ">
            Contact Us
          </button>
        </div>
      </div>

      {/* image */}

      <div className="hidden md:block">
        <Image
          src={DoctorImage}
          alt=""
          width={500}
          height={600}
          className="md:mt-[90px] md:max-w-[550px] md:h-[650px]"
        />
      </div>

      {/* card */}
      <div className="flex flex-col gap-5">
        {HeroData.map((data, i) => (
          <div
            key={i}
            className="card flex flex-col items-center justify-center bg-white p-4 md:w-[250px]  rounded-xl shadow-xl"
          >
            <p className="text-[40px] font-semibold">{data.name}</p>
            <p className="text-[18px] text-gray-500">{data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
