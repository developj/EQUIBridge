import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { useProfile } from "../api/hooks/useProfile";
import { ChevronDown } from "lucide-react";

// import { Avatar } from "./ui/avatar";
// import { Avatar } from "@/components/ui/avatar";

export default function ProfileDropdown() {
  const { data:user } = useProfile();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="rounded-full w-[40px] h-[40px] bg-[var(--equipurple)] flex items-center justify-center">
            {" "}
            <p className="text-white font-bold text-center flex items-center justify-center">
              {user?.first_name?.charAt(0)}
            </p>
          </div>
          <p>{user?.email}</p>

          <ChevronDown className="cursor-pointer" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/createprofile" className="cursor-pointer">
            Edit Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            logout();
            navigate("/login");
          }}
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
