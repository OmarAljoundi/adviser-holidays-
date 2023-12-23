"use client";
import { FunctionComponent, ReactNode } from "react";
import { IconContext, IconType } from "react-icons";
import { motion } from "framer-motion";
interface IconTourProviderProps {
  children: ReactNode;
  background?: string;
  size?: string;
}

const IconSocialProvider: FunctionComponent<IconTourProviderProps> = ({
  children,
  background,
  size = "15px",
}) => {
  return (
    <div className="p-2 rounded-medium bg-primary">
      <IconContext.Provider value={{ size: size, className: "text-white" }}>
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

export default IconSocialProvider;
