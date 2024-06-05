import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import {
  CircleUserRound,
  LaptopMinimal,
  Menu,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn, getToken, handleError } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/lib/constants";
import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { setTheme } = useTheme();
  const { logout } = useLogout();
  const [avatar, SetAvatar] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (user) {
          const response = await axios.get(`${apiUrl}/user/getbyuserid`, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          SetAvatar(response.data.user.avatar!);
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchProfileImage();
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex justify-between h-20 w-full shrink-0 items-center px-4 md:px-6 border-b mb-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link to="/">
            <h1 className="font-mono text-lg">ThinkTechTalk</h1>
            <span className="sr-only">3T Inc</span>
          </Link>
          <div className="grid gap-2 pt-2 border-t-2">
            <Link
              className="flex w-full items-center pb-2 text-lg font-semibold"
              to="/"
            >
              Anasayfa
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              to="/forum"
            >
              Forum
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              to="/posts"
            >
              Gönderiler
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <Link className="mr-6 " to="/">
        <h1 className=" font-mono text-xl">ThinkTechTalk</h1>
        <span className="sr-only">3T Inc</span>
      </Link>

      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 text-md font-semibold "
              to="/"
            >
              Anasayfa
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 text-md font-semibold   "
              to="/blog"
            >
              Blog
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 text-md font-semibold   "
              to="/forum"
            >
              Forum
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 text-md font-semibold   "
              to="/post"
            >
              Gönderiler
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>

      {user ? (
        <DropdownMenu>
          <>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10">
                {avatar && <AvatarImage src={`${apiUrl}/image/${avatar}`} />}
                <AvatarFallback>
                  <CircleUserRound />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("px-5 me-3")}>
              <DropdownMenuLabel className="flex justify-center items-center">
                <User />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:cursor-pointer">
                Profilim
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                Gönderilerim
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                Konularım
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={handleLogout}
              >
                Çıkış Yap
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className={cn("flex justify-between space-x-2")}
              >
                <Moon
                  onClick={() => setTheme("dark")}
                  className=" hover:cursor-pointer rounded-full hover:rotate-45 transition-all"
                />
                <LaptopMinimal
                  onClick={() => setTheme("system")}
                  className=" hover:cursor-pointer rounded-full"
                />
                <Sun
                  onClick={() => setTheme("light")}
                  className=" hover:cursor-pointer rounded-full hover:rotate-45 transition-all"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <CircleUserRound className="w-10 h-10" />
        </Link>
      )}
    </header>
  );
}
