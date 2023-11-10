'use client';

import React from 'react';

import { Box } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';

import { Toolchain, RepoToolchain } from '../../typeConfiguration';

function RepoToolchain({ toolchain, index, onChange, onDelete }: { toolchain: RepoToolchain, index: number, onChange: (index: number, toolchain: Toolchain) => void, onDelete: () => void }) {

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const changeId = event.target.id;
        const changeValue = event.target.value;
        switch (changeId) {
            case 'repoToolchianName':
                onChange(index, { ...toolchain, name: changeValue })
                break;
            case 'repoToolchianRepo':
                onChange(index, { ...toolchain, repo: changeValue })
                break;
            case 'repoToolchianBranch':
                onChange(index, { ...toolchain, branch: changeValue })
                break;
            default:
                break;
        }
    }

    function addBinPathInput() {
        onChange(index, { ...toolchain, binPath: [...toolchain.binPath, ''] })
    }

    function removeBinPathInput(indexBinPath: number) {
        const newBinPath = toolchain.binPath.filter((_, i) => i !== indexBinPath);
        onChange(index, { ...toolchain, binPath: newBinPath });
    }

    function onBinPathChange(indexBinPath: number, event: React.ChangeEvent<HTMLInputElement>) {
        const newBinPath = [...toolchain.binPath];
        newBinPath[indexBinPath] = event.target.value;
        onChange(index, { ...toolchain, binPath: newBinPath });
    }

    return (
        <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
            <Grid container className='w-full' spacing={2}>
                <Grid xs={1}>
                    <div className='h-full grid items-center'>
                        <IconButton color="primary" sx={{ p: '10px' }} onClick={() => { onDelete(); }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Grid>
                <Grid xs={11}>
                    <div className='grid grid-cols-3 gap-x-4'>
                        <TextField
                            label="Name"
                            value={toolchain.name}
                            id='repoToolchianName'
                            onChange={onInputChange} />
                        <TextField
                            label="Repo"
                            value={toolchain.repo}
                            id='repoToolchianRepo'
                            onChange={onInputChange} />
                        <TextField
                            label="Branch"
                            value={toolchain.branch}
                            id='repoToolchianBranch'
                            onChange={onInputChange} />
                    </div>
                    <Button fullWidth size='small' variant="outlined" startIcon={<AddIcon />} onClick={addBinPathInput}>
                        Add bin path
                    </Button>
                    <div className='grid grid-cols-2 gap-x-4'>
                        {
                            toolchain.binPath.map((input, indexBinpath) => (
                                <div key={indexBinpath}>
                                    <Paper
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                                    >
                                        <div>
                                            {"binPath_" + (indexBinpath + 1)}
                                        </div>

                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Add your bin path"
                                            value={input}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onBinPathChange(indexBinpath, event)} />
                                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => removeBinPathInput(indexBinpath)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Paper>
                                </div>
                            ))}
                    </div>
                </Grid>
            </Grid>
        </Box >
    );
}

export default RepoToolchain;