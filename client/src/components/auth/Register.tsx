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

export default function Register() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Kayıt ol</CardTitle>
        <CardDescription>
          Kaydolmak için gerekli alanları doldurun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">İsim</Label>
            <Input type="text" id="firstName" placeholder="" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Soyisim</Label>
            <Input type="text" id="lastName" placeholder="" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Kullanıcı adı</Label>
            <Input type="text" id="username" placeholder="" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input id="password" required placeholder="" type="password" />
          </div>
          <Button className="w-full" type="submit">
            Kayıt ol
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500"> Hesabın varmı ?</p>
        <span className="text-sm hover:text-gray-500 font-bold ms-2">
          <Link to="/login">Giriş yap</Link>
        </span>
      </CardFooter>
    </Card>
  );
}
