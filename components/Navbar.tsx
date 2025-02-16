"use client"

 
import * as React from "react"
import { Moon,  Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"

import { SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

import { useEffect, useState } from "react";





function Navbar() {
 
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div>
      <nav className='flex justify-between h-14 bg-primary/20 text-foreground items-center'>
        <span className="font-bold text-xl">Pass-App</span>
        <ul className='flex justify-start items-center gap-4' >
            <li>Home </li>
            <li>About Us</li>
            <li>Services</li>
        </ul>
        <div className="flex gap-2 justify-center items-center">
        
      
        <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>

        
    <SignedOut>
              <SignInButton/>
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
