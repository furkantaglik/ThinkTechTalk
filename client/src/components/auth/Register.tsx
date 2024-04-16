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
import { handleError } from "@/lib/utils";
import axios from "axios";
import { apiUrl } from "@/lib/constants";
import { ChangeEvent, useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl + "/auth/signup", formData);
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center h-screen"
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="font-mono text-2xl text-center border-b mb-5">
              ThinkTechTalk
            </CardTitle>
            <CardTitle className="text-2xl font-bold">Kayıt ol</CardTitle>
            <CardDescription>
              Kayıt olmak için gerekli alanları eksiksiz doldurmanız gerekir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">İsim</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder=""
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyisim</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder=""
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder=""
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı adı</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder=""
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder=""
                  required
                  onChange={handleChange}
                />
              </div>
              <Button className="w-full" type="submit">
                Kayıt ol
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500"> Hesabın varmı ?</p>
            <span className="text-sm hover:text-gray-500 font-bold ms-2">
              <Link to="/login">Giriş Yap</Link>
            </span>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
