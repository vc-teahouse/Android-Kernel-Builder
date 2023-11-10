'use client';

import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Template, Params } from '../typeConfiguration';

const archOptions = ['arm64', 'arm'];
const externalCommandPlaceholder = `{
    "CLANG_TRIPLE": "gcc/bin/aarch64-linux-android-",
    "CROSS_COMPILE": "gcc/bin/aarch64-linux-android-",
    "CROSS_COMPILE_ARM32": "gcc/bin/arm-linux-androideabi-",
    "LD": "clang/bin/ld.lld",
    "AR": "clang/bin/llvm-ar",
    "NM": "clang/bin/llvm-nm",
    "OBJCOPY": "clang/bin/llvm-objcopy",
    "OBJDUMP": "clang/bin/llvm-objdump",
    "READELF": "clang/bin/llvm-readelf",
    "OBJSIZE": "clang/bin/llvm-size",
    "STRIP": "clang/bin/llvm-strip",
    "LDGOLD": "clang/bin/aarch64-linux-gnu-ld.gold",
    "LLVM_AR": "clang/bin/llvm-ar",
    "LLVM_DIS": "clang/bin/llvm-dis"
}`
const BuildParams = ({ updateParams, template }: { updateParams: (value: Template) => void, template: Template }) => {
    const [external, setExternal] = useState("")
    const [isParse, setIsParse] = useState(false)

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const changeId = event.target.id;
        const changeValue = event.target.value;
        const newParams: Params = {
            "ARCH": template.params.ARCH,
            "CC": template.params.CC,
            "externalCommand": template.params.externalCommand
        }
        switch (changeId) {
            case 'paramsArch':
                newParams.ARCH = changeValue
                break;
            case 'paramsCC':
                newParams.CC = changeValue
                break;
            case 'paramsExternalCommand':
                setExternal(changeValue)
                let externalParams = {}
                try {
                    externalParams = JSON.parse(changeValue)
                    setIsParse(true)
                }
                catch {
                    externalParams = {}
                    setIsParse(false)
                }
                finally {
                    newParams.externalCommand = externalParams
                }
                break;
            default:
                break;
        }
        const newTemplate = { ...template, params: newParams }
        updateParams(newTemplate)
    }
    return (
        <>
            <div className='grid grid-cols-2 gap-x-4'>
                <Autocomplete
                    id="paramsArch"
                    disablePortal
                    fullWidth
                    options={archOptions}
                    onChange={(_, newValue: string | null) => {
                        if (newValue) {
                            const newTemplate = {
                                ...template, params: {
                                    "ARCH": newValue,
                                    "CC": template.params.CC,
                                    "externalCommand": template.params.externalCommand
                                }
                            }
                            updateParams(newTemplate)
                        }
                    }}
                    onInputChange={(_, newInputValue) => {
                        const newTemplate = {
                            ...template, params: {
                                "ARCH": newInputValue,
                                "CC": template.params.CC,
                                "externalCommand": template.params.externalCommand
                            }
                        }
                        updateParams(newTemplate)
                    }}
                    renderInput={(params) => <TextField {...params} label="Arch" value={template.params.ARCH} />}
                />
                <TextField
                    id='paramsCC'
                    fullWidth
                    variant="outlined"
                    label="Compiler"
                    value={template.params.CC}
                    onChange={onChange} />
                <TextField
                    className='col-span-2'
                    label="Edit your params"
                    multiline
                    placeholder={externalCommandPlaceholder}
                    variant="filled"
                    id='paramsExternalCommand'
                    value={external}
                    onChange={onChange}
                    error={!isParse}
                />
            </div>

        </>
    );
}

export default BuildParams;