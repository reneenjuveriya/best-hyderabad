'use client';
import { TbBeach, TbHotelService, TbPool } from "react-icons/tb";
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { MdTableRestaurant } from "react-icons/md";
import { GiForestCamp } from "react-icons/gi";


export const categories = [
    {
        label:'Beach',
        icon: TbBeach,
        description:'Beach'
    },
    {
        label:'Hotel',
        icon: TbPool,
        description:'Beach'
    },
    {
        label:'Malls',
        icon: MdTableRestaurant,
        description:'Beach'
    },
    {
        label:'Parks',
        icon: TbBeach,
        description:'Beach'
    },
    {
        label:'Cafes',
        icon: MdTableRestaurant,
        description:'Beach'
    },
    {
        label:'Restaurant',
        icon: MdTableRestaurant,
        description:'Beach'
    },
    {
        label:'Camping',
        icon: GiForestCamp,
        description:'Beach'
    }
]

const Categories = () => {
    const params= useSearchParams();
    const category=params?.get('category');
    const pathname= usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage){
        return null;
    }

  return (
   <Container>
        <div
            className="
            pt-4 flex flex-row items-center justify-between overflow-x-auto"
        >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))
                }

        </div>
   </Container>
  )
}

export default Categories
