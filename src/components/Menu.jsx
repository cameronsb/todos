import React from "react";
import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverHeading,
    PopoverClose,
} from "./Popover";

export const UncontrolledMenu = () => {
    return (
        <div className="App">
            <Popover>
                <PopoverTrigger>My trigger</PopoverTrigger>
                <PopoverContent className="Popover">
                    <PopoverHeading>My popover heading</PopoverHeading>
                    <PopoverDescription>
                        My popover description
                    </PopoverDescription>
                    <PopoverClose>Close</PopoverClose>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export const ControlledMenu = ({
    options = [
        {
            label: "Option 1",
            value: "Option 1",
            onClick: () => alert("Option 1"),
        },
        {
            label: "Option 2",
            value: "Option 2",
            onClick: () => alert("Option 2"),
        },
        {
            label: "Option 3",
            value: "Option 3",
            onClick: () => alert("Option 3"),
        },
    ],
    triggerMarkup = "My trigger",
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="App">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger onClick={() => setOpen((v) => !v)}>
                    {triggerMarkup}
                </PopoverTrigger>
                <PopoverContent className="bg-white rounded-md border">
                    {/* <PopoverHeading>My popover heading</PopoverHeading> */}
                    <PopoverDescription className="flex flex-col p-2">
                        {/* Menu Items */}
                        {options.map((option) => (
                            <button
                                type="button"
                                key={option.value}
                                onClick={() => {
                                    option.onClick();
                                }}
                                className="p-2 hover:bg-gray-100 rounded-md"
                            >
                                {option.label}
                            </button>
                        ))}
                    </PopoverDescription>
                    {/* <PopoverClose>Close</PopoverClose> */}
                </PopoverContent>
            </Popover>
        </div>
    );
};

const Menu = {
    UncontrolledMenu,
    ControlledMenu,
};

export default Menu;
