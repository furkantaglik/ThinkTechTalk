import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import React, { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { apiUrl } from "@/lib/constants";
import axios from "axios";
import { handleError } from "@/lib/utils";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl + "/auth/signin", formData);
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
            <CardTitle className="text-2xl font-bold">Giriş Yap</CardTitle>
            <CardDescription>
              Hesabınıza giriş yapmak için kullanıcı adı ve parolanızı girin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrUsername">
                  Email veya Kullanıcı Adı
                </Label>
                <Input
                  onChange={handleChange}
                  id="emailOrUsername"
                  placeholder="test@example.com"
                  required
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  onChange={handleChange}
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
      </form>
    </>
  );
}
