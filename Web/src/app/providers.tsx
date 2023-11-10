"use client";

import React, { useState } from "react";

// NextUI Provider
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Mui Privider
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

// My components
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export function Providers({ children }: { children: React.ReactNode }) {
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
                    <Navbar setMuiMode={setMuiMode} />
                    {children}
                    <Footer />
                </MuiThemeProvider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}
