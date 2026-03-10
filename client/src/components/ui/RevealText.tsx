import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4";
  once?: boolean;
}

export default function RevealText({
  text,
  className,
  as: Tag = "span",
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-15% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pt-[0.12em] pb-[0.16em] mt-[-0.12em] mb-[-0.16em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "120%" }}
            animate={isInView ? { y: 0 } : { y: "120%" }}
            transition={{
              duration: 1,
              delay: i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
