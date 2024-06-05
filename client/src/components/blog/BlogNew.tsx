import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { apiUrl } from "@/lib/constants";
import { getToken, handleError } from "@/lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface Category {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export default function BlogNew() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imagePath: "",
    categoryId: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file!);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setPreviewSrc(url);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc("");
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(apiUrl + "/category/getallcategory", {
          headers: { Authorization: `Bearer ${getToken()} ` },
        });
        setCategories(response.data.data);
      } catch (error) {
        handleError(error);
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl + "/category/getallcategory", {
        headers: { Authorization: `Bearer ${getToken()} ` },
      });
      console.log(response);
    } catch (error) {
      handleError(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleInputChange = (event) => {
    handleFileChange(event);
    handleChange(event);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-screen-lg mx-auto  grid space-y-10"
    >
      <div className="flex justify-center">
        <Input
          onChange={handleChange}
          type="text"
          placeholder="Başlık Girin"
          className=" text-2xl border-0 text-center font-extrabold py-10"
          required
          id="title"
        />
      </div>
      <div className="sm:m-32">
        <Input
          onChange={handleInputChange}
          type="file"
          className=" file:dark:text-white"
          required
          id="imagePath"
        />
        <img className="" src={previewSrc} />
      </div>
      <div className="grid w-full gap-1.5">
        <Textarea
          placeholder="İçeriğinizi buraya yazın"
          className="text-xl"
          onChange={handleChange}
          rows={20}
          required
          id="content"
        />
      </div>
      <div className=" flex justify-between items-center">
        <Select>
          <SelectTrigger className="w-[250px] mt-2">
            <Label htmlFor="category">Kategori |</Label>
            <SelectValue placeholder="Kategori Seçilmedi" id="category" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kategoriler</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>
          <Button type="submit" variant="default">
            Yayınla
          </Button>
        </div>
      </div>
    </form>
  );
}
