'use client';

import React from 'react';

import TextField from '@mui/material/TextField';

import { Template } from '../typeConfiguration';

// 获取仓库分支的 API 接口
// fetch(`https://api.github.com/repos/${owner}/${repo}/branches`)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

const KernelSource = ({ updateKernelSource, template }: { updateKernelSource: (value: Template) => void, template: Template }) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const changeId = event.target.id;
        const changeValue = event.target.value;
        switch (changeId) {
            case 'kernelSourceName':
                template.kernelSource.name = changeValue
                break;
            case 'kernelSourceRepo':
                template.kernelSource.repo = changeValue
                break;
            case 'kernelSourceBranch':
                template.kernelSource.branch = changeValue
                break;
            case 'kernelSourceDevice':
                template.kernelSource.device = changeValue
                break;
            case 'kernelSourceDefconfig':
                template.kernelSource.defconfig = changeValue
                break;
            default:
                break;

        }
        updateKernelSource({ ...template, kernelSource: template.kernelSource })
    }
    return (
        <div className='grid grid-cols-2 gap-4'>
            <TextField
                variant='outlined'
                label="Name"
                value={template.kernelSource.name}
                id='kernelSourceName'
                onChange={onChange} />
            <TextField
                variant='outlined'
                label="Repo"
                value={template.kernelSource.repo}
                id='kernelSourceRepo'
                onChange={onChange} />
            <TextField
                variant='outlined'
                label="Branch"
                value={template.kernelSource.branch}
                id='kernelSourceBranch'
                onChange={onChange} />
            <TextField
                variant='outlined'
                label="Device code"
                value={template.kernelSource.device}
                id='kernelSourceDevice'
                onChange={onChange} />
            <TextField
                variant='outlined'
                label="Defconfig"
                value={template.kernelSource.defconfig}
                id='kernelSourceDefconfig'
                onChange={onChange} />
        </div>
    );
}

export default KernelSource;