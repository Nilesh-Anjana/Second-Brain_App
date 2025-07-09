import type { IconProps } from "."; // ✅ Only import IconProps (as a type)
import { iconSizeVariants } from "."; // ✅ Normal import for values

export const PlusIcon = ({ size = "md" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconSizeVariants[size]}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};
