'use client';
import {  TbBuildingMonument, TbCoffee, TbRollercoaster } from "react-icons/tb";
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { MdHiking, MdMovie, MdTableRestaurant } from "react-icons/md";
import { GiShoppingBag  } from "react-icons/gi";
import {FaHotel} from 'react-icons/fa'


export const categories = [
    
    {
        label:'Hotel',
        icon: FaHotel,
        description:'Beach'
    },
    {
        label:'Restaurants',
        icon: MdTableRestaurant,
        description:'Restaurant'
    },
    {
        label:'Cafes & Bakeries',
        icon: TbCoffee,
        description:'Cafes & Bakeries'
    },
    {
        label:'Malls',
        icon: GiShoppingBag,
        description:'Malls'
    },
    {
        label:'Entertainment',
        icon: MdMovie,
        description:'Entertainment'
    },
    {
        label:'Tourist Attractions',
        icon: TbBuildingMonument,
        description:'Beach'
    },
    {
        label:'Amusement & Water Parks',
        icon: TbRollercoaster,
        description:'Beach'
    },
    {
        label:'Weekend Getaways',
        icon: MdHiking,
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
        <div style={{
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  }}
            className="
            pt-8 flex flex-row items-center justify-between scrollbar-none border-b-2 border-grey-10 overflow-x-auto whitespace-nowrap  "
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
