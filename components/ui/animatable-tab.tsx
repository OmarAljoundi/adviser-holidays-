"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface AnimatableTabProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  onTabChange?: (tabId: string) => void;
  defaultActiveId?: string;
}

const TabItem = memo(
  ({
    tab,
    isActive,
    onMouseEnter,
    onMouseLeave,
    onClick,
    tabRef,
  }: {
    tab: Tab;
    index: number;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
    tabRef: React.Ref<HTMLDivElement>;
  }) => (
    <div
      key={tab.id}
      ref={tabRef}
      className={cn(
        "px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px]",
        isActive
          ? "text-[#0e0e10] dark:text-white"
          : "text-[#0e0f1199] dark:text-[#ffffff99]"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="text-sm font-medium leading-5 whitespace-nowrap flex items-center justify-center h-full">
        {tab.label}
      </div>
    </div>
  )
);

TabItem.displayName = "TabItem";

const AnimatableTab = React.forwardRef<HTMLDivElement, AnimatableTabProps>(
  (
    { className, tabs, onTabChange, defaultActiveId, children, ...props },
    ref
  ) => {
    // Find initial active index based on defaultActiveId or default to 0
    const initialActiveIndex = defaultActiveId
      ? tabs.findIndex((tab) => tab.id === defaultActiveId)
      : 0;

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(
      initialActiveIndex >= 0 ? initialActiveIndex : 0
    );
    const [hoverStyle, setHoverStyle] = useState({});
    const [activeStyle, setActiveStyle] = useState({
      left: "0px",
      width: "0px",
    });

    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
      tabRefs.current = tabRefs.current.slice(0, tabs.length);
      while (tabRefs.current.length < tabs.length) {
        tabRefs.current.push(null);
      }
    }, [tabs.length]);

    const updateHoverStyle = useCallback((index: number | null) => {
      if (index === null) {
        setHoverStyle({});
        return;
      }

      const hoveredElement = tabRefs.current[index];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }, []);

    const updateActiveStyle = useCallback((index: number) => {
      const activeElement = tabRefs.current[index];
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }, []);

    const handleMouseEnter = useCallback((index: number) => {
      setHoveredIndex(index);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setHoveredIndex(null);
    }, []);

    const handleTabClick = useCallback(
      (index: number) => {
        setActiveIndex(index);
        onTabChange?.(tabs[index].id);
      },
      [onTabChange, tabs]
    );

    useEffect(() => {
      updateHoverStyle(hoveredIndex);
    }, [hoveredIndex, updateHoverStyle]);

    useEffect(() => {
      updateActiveStyle(activeIndex);
    }, [activeIndex, updateActiveStyle]);

    useEffect(() => {
      const frame = requestAnimationFrame(() => {
        updateActiveStyle(activeIndex);
      });

      return () => cancelAnimationFrame(frame);
    }, [updateActiveStyle, activeIndex]);

    useEffect(() => {
      const handleResize = () => {
        updateActiveStyle(activeIndex);
        if (hoveredIndex !== null) {
          updateHoverStyle(hoveredIndex);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [activeIndex, hoveredIndex, updateActiveStyle, updateHoverStyle]);

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className="relative">
          <div
            className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />

          <div
            className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
            style={activeStyle}
          />

          <div className="relative flex space-x-[6px] items-center">
            {tabs.map((tab, index) => (
              <TabItem
                key={tab.id}
                tab={tab}
                index={index}
                isActive={index === activeIndex}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleTabClick(index)}
                tabRef={(el) => {
                  tabRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>
        {children}
      </div>
    );
  }
);

AnimatableTab.displayName = "AnimatableTab";

export { AnimatableTab };
