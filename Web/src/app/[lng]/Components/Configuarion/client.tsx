'use client'

import ConfigurationBase from './ConfigurationBase'
import { useTranslation } from '@/app/i18n/client'

export const Configuration = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'configuration')
    return <ConfigurationBase t={t} lng={lng} />
}