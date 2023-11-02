/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Care from "../../../public/assests/eye.png";
import Phone from "../../../public/assests/phone-removebg-preview.png";
import doctor from "../../../public/assests/vecteezy_doctor-3d-icon-illustration_28238992_258.png";

const Banner = () => {
  const BannerData = [
    {
      title: "Expert Doctors",
      description:
        "Our doctors are highly qualified and experienced in their respective fields.",
      image: doctor,
    },
    {
      title: "Eye Care",
      description:
        "Our Eye Specialists Doctors are highly qualified and experienced. They are always available to give support to patients",
      image: Care,
    },
    {
      title: "Insulin Support",
      description:
        "Our team is always available to help you with any queries about insulin.",
      image: Phone,
    },
  ];

  return (
    <div className="common bg-primary flex flex-col md:flex-row md:gap-3 gap-10  justify-between py-[50px] text-white font-inter border-b-2 border-t-2  border-blue-200">
      {BannerData?.map((data, i) => (
        <div className="flex items-center gap-4 px-[20px]" key={i}>
          <Image
            src={data.image}
            alt="Picture of the author"
            width={80}
            height={80}
            className="bg-white rounded-full object-cover"
          />

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[20px]">{data.title}</h3>
            <p>{data.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
