"use client";
import { useGetServicesQuery } from "@/Redux/features/serviceApi/serviceApi";
import { IServiceTypes } from "@/types/Service";
import Link from "next/link";
import Skeleton from "../Loader/Skeleton";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const { data, isLoading } = useGetServicesQuery("");

  const serviceData = data?.slice(0, 6);
  return (
    <div className="common pb-[100px]">
      <p className="text-primary md:text-[20px] text-[16px] font-semibold">
        OUR SERVICES
      </p>
      <p className="font-poppins md:text-[45px] text-[35px] md:w-[550px] py-[30px] ">
        Amazing Medical Facilities Just for You
      </p>

      {/* service card */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 justify-between">
        {isLoading ? (
          <Skeleton />
        ) : (
          serviceData?.map((service: IServiceTypes, index: number) => (
            <ServiceCard key={index} service={service} />
          ))
        )}
      </div>

      {/* button */}
      {data?.length > 6 && (
        <Link
          href={"/services"}
          className="flex justify-center items-center mt-5"
        >
          <button className="appointmentButton">More Service</button>
        </Link>
      )}
    </div>
  );
};

export default Services;
