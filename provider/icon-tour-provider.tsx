"use client";
import { FunctionComponent, ReactNode } from "react";
import { IconContext, IconType } from "react-icons";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
interface IconTourProviderProps {
  children: ReactNode;
  background?: string;
  iconColorClass?: string;
}

const IconTourProvider: FunctionComponent<IconTourProviderProps> = ({
  children,
  iconColorClass,
  background,
}) => {
  return (
    <div
      className={cn("p-2 rounded-medium", iconColorClass ?? "text-primary")}
      style={{ background: background ?? "#0d4d915c" }}
    >
      <IconContext.Provider value={{ size: "15px", className: iconColorClass }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0.52 },
            visible: {
              opacity: 1,
              scale: 1.0,
              transition: {
                duration: 1.2,
              },
            },
          }}
        >
          {children}
        </motion.div>
      </IconContext.Provider>
    </div>
  );
};

export default IconTourProvider;
