"use client";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "../ui/textarea";

export function StepTwo() {
  return (
<>
  
<div className="grid grid-cols-max items-center gap-4 ">
  <Input id="category" placeholder="Category" className="col-span-3" />
  
  <Input id="condition" placeholder="Condition" className="col-span-3" />

  <Textarea
    id="description"
    placeholder="Enter Description"
    className="col-span-3 h-20 resize-y pl-4 pt-4 max-h-48"
  />
</div>


</>

  );
}
