'use client'

import NavbarBase from './NavbarBase'
import { useTranslation } from '../../../i18n/client'

export const Navbar = ({ lng, setMuiMode }: { lng: string, setMuiMode: (value: 'light' | 'dark') => void }) => {
    const { t } = useTranslation(lng, 'navbar')
    return <NavbarBase t={t} lng={lng} setMuiMode={setMuiMode} />
}