import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useTiltCard({ maxTilt = 8 } = {}) {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { mx.set(0); my.set(0); };

  const tiltStyle = { rotateX, rotateY, transformPerspective: 900 };

  return { cardRef, tiltStyle, handleMove, handleLeave };
}
