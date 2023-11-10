'use client';

import React from "react";

import { Checkbox } from "@nextui-org/checkbox";

import TextField from '@mui/material/TextField';

import { Template, AnyKernel3 } from "../typeConfiguration";

const AnyKernel3 = ({ updateAnykernel3, template }: { updateAnykernel3: (value: Template) => void, template: Template }) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const changeId = event.target.id;
        const changeName = event.target.name
        const changeValue = event.target.value;
        const newAnykernel3: AnyKernel3 = template.AnyKernel3
        switch (changeId) {
            case 'anykernel3Repo':
                newAnykernel3.repo = changeValue
                break;
            case 'anykernel3Branch':
                newAnykernel3.branch = changeValue
                break;
            default:
                break;
        }
        switch (changeName) {
            case 'anykernel3Use':
                newAnykernel3.use = event.target.checked;
                break;
            case 'anykernel3Release':
                newAnykernel3.release = event.target.checked;
                break;
            default:
                break;
        }
        console.log(newAnykernel3, event.target.checked, changeId, event)
        const newTemplate = { ...template, AnyKernel3: newAnykernel3 }
        updateAnykernel3(newTemplate)
    }


    return (
        <div className='grid grid-cols-2 gap-x-4'>
            <Checkbox name="anykernel3Use" isSelected={template.AnyKernel3.use} onChange={onChange} >
                Use Anykernel3 pack your kernel?
            </Checkbox>
            <Checkbox name="anykernel3Release" isSelected={template.AnyKernel3.release} onChange={onChange} >
                Publish to github release?
            </Checkbox>
            <TextField
                id="anykernel3Repo"
                fullWidth
                variant="outlined"
                label="Repo"
                value={template.AnyKernel3.repo}
                onChange={onChange} />
            <TextField
                id="anykernel3Branch"
                fullWidth
                variant="outlined"
                label="Branch"
                value={template.AnyKernel3.branch}
                onChange={onChange} />
        </div>
    )
}

export default AnyKernel3