import AvailableCar from "@/components/AvailableCar";
import Banner from "@/components/Banner";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <AvailableCar></AvailableCar>
    </div>
  );
}
