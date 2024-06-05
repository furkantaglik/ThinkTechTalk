import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPage() {
  return (
    <section className="">
      <div className=" flex justify-end ">
        <Link to="/blog/new">
          <Button variant="outline">
            Yeni Blog <FilePenLine className="ms-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
      <div></div>
    </section>
  );
}
