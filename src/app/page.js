import AvailableCar from "@/components/AvailableCar";
import Banner from "@/components/Banner";
import CarBrandsMarquee from "@/components/CarBrandsMarquee";
import NextDestinationBanner from "@/components/NextDestinationBanner";
import WhyChoiceMatters from "@/components/WhyChoiceMatters";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <AvailableCar></AvailableCar>
     <WhyChoiceMatters></WhyChoiceMatters>
     <CarBrandsMarquee></CarBrandsMarquee>
     <NextDestinationBanner></NextDestinationBanner>
     
    </div>
  );
}
