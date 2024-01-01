import React from "react";
import { twMerge } from "tailwind-merge";

const CategoryCard = ({
    category = null,
    handleCategoryClick = () => {},
    // TODO: categories should be their own stored objects with icons in the data
    icon = null,
}) => {
    return (
        <button
            key={category}
            onClick={handleCategoryClick.bind(this, category)}
            className={twMerge(`flex items-center justify-center text-xl cursor-pointer p-2
                                      border-2 border-gray-500 rounded-md bg-white hover:bg-gray-100`)}
        >
            {icon && <span className="block mr-2">{icon}</span>}
            <h3 className="text-left pl-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
        </button>
    );
};

export default CategoryCard;
