'use client';
import { SessionProvider } from "next-auth/react";

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return (
    <div
        className="
        max-w-[2520px]
        mx-auto
        xl-px-20
        md-px-10
        sm-px-2
        px-4"
    
    >
        <SessionProvider>
        {children} 
        </SessionProvider>
    </div>
);
}


export default Container;