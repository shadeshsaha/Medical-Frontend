import Image from "next/image";
import aboutImageTwo from "../../../public/assests/about_doctor-2.jpg";
import aboutImageOne from "../../../public/assests/about_doctor_female.jpg";

const About = () => {
  return (
    <div className="common md:flex w-full justify-between md:py-[200px] my-[30px] items-center border-b-2">
      <div className="flex flex-col md:flex-row gap-[50px]">
        <Image
          src={aboutImageOne}
          alt="Picture of the author"
          width={500}
          height={500}
          className="rounded-xl md:w-[300px] md:h-[600px] border-2 md:-mt-[50px] "
        />

        <Image
          src={aboutImageTwo}
          alt="Picture of the author"
          width={500}
          height={500}
          className="rounded-xl md:w-[300px] md:h-[600px] border-2  "
        />
      </div>

      {/* About Section */}
      <div className="font-inter my-[20px] md:my-0 flex flex-col h-[400px] justify-around md:w-[400px]">
        <p className="text-primary md:text-[20px] text-[16px] font-semibold">
          ABOUT CDiC
        </p>
        <p className="font-poppins md:text-[45px] text-[35px] md:w-[550px]">
          We Collaborate for Better Healthcare
        </p>
        <p className="md:w-[500px] text-gray-[400px] font-poppins text-gray-500">
          “Interacting with other people with type 1 diabetes, type 2 diabetes
          has inspired us to manage our diabetes better and improved our quality
          of life.”
        </p>

        <div className="flex w-full gap-5 my-[10px]">
          <button className="appointmentButton">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
