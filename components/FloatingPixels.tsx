"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Pixel {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

const FloatingPixels: React.FC = () => {
  const { theme } = useTheme();
  const [pixels, setPixels] = useState<Pixel[]>([]);

  useEffect(() => {
    const createPixels = () => {
      const newPixels: Pixel[] = [];
      for (let i = 0; i < 10; i++) {
        newPixels.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 2,
          speed: Math.random() * 0.5 + 0.1,
        });
      }
      setPixels(newPixels);
    };

    createPixels();
    // const animatePixels = () => {
    //   setPixels((prevPixels) =>
    //     prevPixels.map((pixel) => ({
    //       ...pixel,
    //       y: pixel.y + (Math.random() > 0.5 ? pixel.speed : -pixel.speed),
    //       x: pixel.x + Math.sin(pixel.y * 0.1) * 0.5,
    //     }))
    //   );
    // };

    const animatePixels = () => {
      setPixels((prevPixels) =>
        prevPixels.map((pixel) => ({
          ...pixel,
          y: pixel.y - pixel.speed,
          x: pixel.x + Math.sin(pixel.y * 0.1) * 0.5,
        }))
      );
    };

    const intervalId = setInterval(animatePixels, 50);

    return () => clearInterval(intervalId);
  }, []);

  if (theme === "light") {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute bg-white opacity-50"
          style={{
            left: `${pixel.x}px`,
            top: `${pixel.y}px`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPixels;
