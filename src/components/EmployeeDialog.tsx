/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Eye, EyeOff, X } from "lucide-react";

import { useState, useEffect } from "react";

import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: {
    name: string;
    email: string;
    password: string;
    garment_types: string[];
  };
  id?: string | number;
}

export default function EmployeeDialog({ mode, trigger, initialData }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [garmentTypes, setGarmentTypes] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);

  const [chipInput, setChipInput] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPassword(initialData.password);
      setGarmentTypes(initialData.garment_types || []);
    }
  }, [mode, initialData]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      console.log("Employee saved:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success(`Employee ${mode === "create" ? "Created" : "Updated"}`);
      resetForm();
      setOpenDialog(false);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong");
    },
  });

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setGarmentTypes([]);
    setChipInput("");
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = () => {
    if (!name || !email || !password) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    const employeeData = {
      name,
      email,
      password,
      garment_types: garmentTypes,
    };

    mutation.mutate(employeeData);
  };

  const handleChipKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && chipInput.trim()) {
      e.preventDefault();
      if (!garmentTypes.includes(chipInput.trim())) {
        setGarmentTypes([...garmentTypes, chipInput.trim()]);
      }
      setChipInput("");
    }
  };

  const removeChip = (type: string) => {
    setGarmentTypes((prev) => prev.filter((t) => t !== type));
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            {mode === "create" ? "Add Employee" : "Edit Employee"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">
            {mode === "create" ? "Add Employee" : "Edit Employee"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter employee details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-zinc-700">
              Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-zinc-700">
              Email *
            </Label>
            <Input
              id="email"
              placeholder="Enter employee email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-zinc-50 text-zinc-900 border ${
                email && !validateEmail(email)
                  ? "border-red-500"
                  : "border-zinc-300"
              } placeholder:text-zinc-400`}
            />
            {email && !validateEmail(email) && (
              <span className="text-xs text-red-500">
                Invalid email format.
              </span>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2 relative">
            <Label htmlFor="password" className="text-zinc-700">
              Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-zinc-700">Garment Types</Label>
            <div className="flex flex-wrap gap-2 border border-zinc-300 bg-zinc-50 rounded-md p-2 min-h-[46px]">
              {garmentTypes.map((type) => (
                <span
                  key={type}
                  className="flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm"
                >
                  {type}
                  <button
                    type="button"
                    onClick={() => removeChip(type)}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={chipInput}
                onChange={(e) => setChipInput(e.target.value)}
                onKeyDown={handleChipKeyDown}
                placeholder="Type and press Enter..."
                className="grow bg-transparent outline-none text-sm text-zinc-800 placeholder:text-zinc-400 min-w-[150px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
