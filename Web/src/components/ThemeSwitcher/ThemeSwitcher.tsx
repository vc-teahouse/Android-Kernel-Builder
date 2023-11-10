// app/components/ThemeSwitcher.tsx
"use client";

import { useEffect, useState } from "react";

import { useTheme as useNextTheme } from "next-themes";

import IconButton from '@mui/material/IconButton';
import { SunIcon } from "@/icons/SunIcon";
import { MoonIcon } from "@/icons/MoonIcon";


export function ThemeSwitcher({ setMuiMode }: { setMuiMode: (value: 'light' | 'dark') => void }) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useNextTheme()

    useEffect(() => {
        setMounted(true)
    }, [])


    const onChange = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
        const changeTheme = (theme === "light" ? 'dark' : 'light')
        setMuiMode(changeTheme);
    };


    if (!mounted) return null

    return (

        <IconButton color="primary" onClick={onChange}>
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </IconButton>

    )
};