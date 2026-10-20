// @ts-nocheck
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";
import { Badge } from "@default/ui/primitives/badge";

interface BadgeWithAvatarProps {
  name?: string;
  image?: string;
}

const BadgeWithAvatar = ({
  name = "Olivia Carter",
  image = "https://images.shadcnspace.com/assets/profiles/tom.webp",
}: BadgeWithAvatarProps) => {
  return (
    <Badge
      variant="outline"
      className="h-auto flex items-center gap-1.5 pr-2.5 pl-1 py-1 text-sm font-medium"
    >
      <Avatar className="size-6">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </Badge>
  );
};

export default BadgeWithAvatar;
