"use client"
import { useEffect, useState } from "react";
import CategoryCard from "./widgets/categoryCard";

const Categories = () => {
    const categories = [
        {
            name: "Category 1",
            imgUrl: "/categoriesImages/Bicycle.png"
        },
        {
            name: "Category 2",
            imgUrl: "/categoriesImages/Mattress.png"
        },
        {
            name: "Category 3",
            imgUrl: "/categoriesImages/Cooler.png"
        },
        {
            name: "Category 4",
            imgUrl: "/categoriesImages/Kettle.png"
        },
        {
            name: "Category 5",
            imgUrl: "/categoriesImages/Luggage Bags.png"
        },
        {
            name: "Category 6",
            imgUrl: "/categoriesImages/Stationery.png"
        },
        {
            name: "Category 7",
            imgUrl: "/categoriesImages/Decoratives.png"
        },
        {
            name: "Category 8",
            imgUrl: "/categoriesImages/Electronics.png"
        }
    ]
    const [resolution, setResolution] = useState(1024);
    useEffect(()=>{
        setResolution(window.innerWidth)
    }, [])
    return resolution >= 1024 ? (
        <div className="grid grid-cols-3 sm:flex">
            <div className="col-span-1">
                {categories.slice(0, 2).map((category) => (
                    <CategoryCard key={category.name} name={category.name} imgUrl={category.imgUrl} width="32vw" height="51vh"/>
                ))}
            </div>
            <div className="col-span-1">
                {categories.slice(2, 3).map((category) => (
                    <CategoryCard key={category.name} name={category.name} imgUrl={category.imgUrl} width="38vw" height="68vh" />
                ))}
                <div className="flex justify-center ">
                    {categories.slice(3, 5).map((category) => (
                        <CategoryCard key={category.name} name={category.name} imgUrl={category.imgUrl} width="18vw" height="34vh" />
                    ))}
                </div>
            </div>
            <div className="col-span-1">
                {categories.slice(5, 8).map((category) => (
                    <CategoryCard key={category.name} name={category.name} imgUrl={category.imgUrl} width="20vw" height="32.5vh" />
                ))}
            </div>
        </div>
        ) :
        (
            <div className="grid grid-cols-2">
                {categories.map((category) => (
                    <CategoryCard key={category.name} name={category.name} imgUrl={category.imgUrl} width="100vw" height={resolution>=768 ? '40vh' : '20vh'} />
                ))}
            </div>
        );
}

export default Categories;