'use client';
import React, { useState } from "react";

// NextUI Provider
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Mui Privider
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

// My components
import { Navbar } from "./Components/Navbar/client";
import Footer from '@/app/[lng]/Components/Footer'

export function Providers({ lng, children }: { lng: string, children: React.ReactNode }) {
    const [muiMode, setMuiMode] = useState<'light' | 'dark'>('dark');
    const muiTheme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: muiMode
                },
            }),
        [muiMode],
    );
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <MuiThemeProvider theme={muiTheme}>
                    <Navbar lng={lng} setMuiMode={setMuiMode} />
                    {children}
                    < Footer />
                </MuiThemeProvider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}
