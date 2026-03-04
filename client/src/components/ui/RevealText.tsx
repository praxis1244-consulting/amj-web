import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4";
}

export default function RevealText({
  text,
  className,
  as: Tag = "span",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.1em] mb-[-0.1em]"
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
