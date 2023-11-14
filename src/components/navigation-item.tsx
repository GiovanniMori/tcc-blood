import { ChevronRight, LucideIcon } from "lucide-react";

interface NavigationItemProps {
  icon: LucideIcon;
  content: string;
  onClick?: () => void;
}

export default function NavigationItem({
  icon: Icon,
  content,
  onClick,
}: NavigationItemProps) {
  return (
    <div
      className="flex gap-4 py-2 px-4 border rounded-md items-center justify-between"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <Icon size={24} className="text-primary" />
        <div>{content}</div>
      </div>
      <ChevronRight />
    </div>
  );
}
