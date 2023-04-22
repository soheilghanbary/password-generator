"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { Slider } from "./ui/slider";
import { cn } from "~/lib/utils";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    symbols: false,
    numbers: true,
    lowercase: false,
    uppercase: false,
  });
  const [passwordLength, setPasswordLength] = useState(8);

  const generatePassword = () => {
    if (passwordLength > 32) setPasswordLength(32);

    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let characterBank = lowercaseLetters;

    options.symbols ? (characterBank += symbols) : null;
    options.numbers ? (characterBank += numbers) : null;
    options.lowercase ? (characterBank += lowercaseLetters) : null;
    options.uppercase ? (characterBank += uppercaseLetters) : null;

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterBank.length);
      generatedPassword += characterBank[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyPassword = () => {
    toast("Saved to Clipboard", {
      icon: "😉",
      style: {
        fontSize: 14,
        borderRadius: "99px",
        background: "#2563eb",
        color: "#ffffff",
      },
    });
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-[340px]">
      <Card>
        <CardHeader>
          <CardTitle>PassGino</CardTitle>
          <CardDescription>You manage generate password.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="number"
                checked={options.numbers}
                onCheckedChange={(e) => setOptions({ ...options, numbers: e })}
              />
              <Label htmlFor="number">Number</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(e) => setOptions({ ...options, symbols: e })}
              />
              <Label htmlFor="symbols">Symbols</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(e) =>
                  setOptions({ ...options, lowercase: e })
                }
              />
              <Label htmlFor="lowercase">Lowercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(e) =>
                  setOptions({ ...options, uppercase: e })
                }
              />
              <Label htmlFor="uppercase">Uppercase</Label>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-sm text-secondary-foreground">Length : {passwordLength}</p>
              <Slider
                defaultValue={[passwordLength]}
                onValueChange={e => setPasswordLength(e[0])}
                max={32}
                step={1}
                min={8}
                className={cn("w-full")}
              />
            </div>
          </div>
          <Button
            onClick={generatePassword}
            className="mt-8 w-full"
            size={"sm"}
          >
            Generate
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <div className="flex justify-between items-center p-4 text-secondary-foreground">
          <p className="text-sm">{password.length ? password : "empty"}</p>
          <Button onClick={copyPassword} variant={"secondary"} size={"sm"}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
