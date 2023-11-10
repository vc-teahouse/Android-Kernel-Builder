'use client';

import React, { useState, useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import RepoToolchain from './Toolchain/repoToolchain';
import DownloadToolchain from './Toolchain/downloadToolchain';

import { Template, Toolchain } from '../typeConfiguration';


const Toolchains = ({ updateToolchains, template }: { updateToolchains: (value: Template) => void, template: Template }) => {
    // 扩展 toolchain 列表
    const addToolchain = (toolchainType: string) => {
        const repoToolchainTemplate = {
            "name": "",
            "repo": "",
            "branch": "",
            "binPath": []
        }
        const downloadToolchainTemplate = {
            "name": "",
            "url": "",
            "binPath": []
        }
        let newToolchains: Toolchain[] = []
        switch (toolchainType) {
            case 'repo':
                newToolchains = [...template.toolchains, repoToolchainTemplate]
                break;
            case 'download':
                newToolchains = [...template.toolchains, downloadToolchainTemplate]
            default:
                break;
        }
        const newTemplate = { ...template, toolchains: newToolchains }
        updateToolchains(newTemplate)
    };
    const removeToolchain = (index: number) => {
        // 更新父组件内容
        const newTemplate = { ...template, toolchains: template.toolchains.filter((_, i) => i !== index) }
        updateToolchains(newTemplate)
    };
    const onToolchainChange = (index: number, toolchain: Toolchain) => {
        // 更新父组件内容
        const newTemplate = { ...template, toolchains: template.toolchains.map((t, i) => i === index ? toolchain : t) }
        updateToolchains(newTemplate)
    };

    // 对于通过 git clone 获取的工具链
    return (
        <>
            <ButtonGroup fullWidth variant="outlined">
                <Button size='small' variant="outlined" startIcon={<AddIcon />} onClick={() => addToolchain('repo')}>
                    Add tool chain (Repo)
                </Button>
                <Button size='small' variant="outlined" startIcon={<AddIcon />} onClick={() => addToolchain('download')}>
                    Add tool chain (Download)
                </Button>
            </ButtonGroup>

            {template.toolchains.map((toolchain, index) => (
                "repo" in toolchain ?
                    <RepoToolchain key={index} toolchain={toolchain} index={index} onChange={onToolchainChange} onDelete={() => removeToolchain(index)} />
                    :
                    <DownloadToolchain key={index} toolchain={toolchain} index={index} onChange={onToolchainChange} onDelete={() => removeToolchain(index)} />
            ))}
        </>
    )
};

export default Toolchains;