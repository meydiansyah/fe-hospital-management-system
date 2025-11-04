"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix?: string;
}

const stats: Stat[] = [
  { id: 1, label: "Happy Patients", value: 12500, suffix: "+" },
  { id: 2, label: "Expert Doctors", value: 250, suffix: "+" },
  { id: 3, label: "Hospitals", value: 15 },
  { id: 4, label: "Years of Experience", value: 20 },
];

export default function Statistics() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2s animation
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const updated = stats.map((stat) => Math.floor(stat.value * progress));
      setCounts(updated);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="bg-primary py-10 text-center flex flex-col items-center justify-center"
    >
      <motion.div
        className="grid grid-cols-2 xl:grid-cols-4 gap-20 max-w-6xl w-full space-y-8 xl:space-y-0"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        {stats.map((stat, i) => (
          <div key={stat.id} className="flex flex-col items-center space-y-4">
            <motion.span
              className="text-5xl md:text-6xl font-bold text-white"
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {counts[i].toLocaleString()}
              {stat.suffix}
            </motion.span>
            <p className="text-gray-400 font-medium xl:text-xl">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
