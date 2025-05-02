import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`max-w-[1320px] w-full mx-auto px-[30px] ${className}`.trim()}>
    {children}
  </div>
);

export default Container;
