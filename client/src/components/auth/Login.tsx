import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Giriş Yap</CardTitle>
        <CardDescription>
          Hesabınıza giriş yapmak için kullanıcı adı ve parolanızı girin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email veya Kullanıcı Adı</Label>
            <Input
              id="email"
              placeholder="test@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              required
              placeholder="******"
              type="password"
            />
          </div>
          <Button className="w-full" type="submit">
            Giriş yap
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500"> Hesabın yokmu ?</p>
        <span className="text-sm hover:text-gray-500 font-bold ms-2">
          <Link to="/register">Kayıt ol</Link>
        </span>
      </CardFooter>
    </Card>
  );
}
