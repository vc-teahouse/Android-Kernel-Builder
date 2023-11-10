"use client";

import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Textarea } from "@nextui-org/input";

import Grid from '@mui/system/Unstable_Grid';

import { Template } from './typeConfiguration';
import KernelSource from './KernelSource/KernelSource';
import Toolchains from './Toolchains/Toolchains';
import BuildParams from './BuildParams/Buildparams';
import AnyKernel3 from './Anykernel3/Anykernel3';

const template: Template = {
    "kernelSource": {
        "name": "",
        "repo": "",
        "branch": "",
        "device": "",
        "defconfig": ""
    },
    "withKernelSU": false,
    "toolchains": [
    ],
    "ccache": false,
    "params": {
        "ARCH": "",
        "CC": "",
        "externalCommand": {}
    },
    "AnyKernel3": {
        "use": false,
        "release": false,
        "repo": "",
        "branch": ""
    }
}

// nextjs中组件事件绑定，父组件点击执行子组件函数，子组件点击执行父组件函数的方法
// https://blog.csdn.net/qq_41211900/article/details/131935745
const ConfigurationBase = ({ t, lng }: { t: (key: string) => string, lng: string }) => {
    const [output, setOutput] = React.useState(template);
    return (
        <Card className='h-full w-full'>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <CardBody className='space-x-1 h-full place-items-center'>
                        <Accordion className="config-panel">
                            <AccordionItem key="1" title={t("Kernel Source")}>
                                <KernelSource t={t} lng={lng} updateKernelSource={setOutput} template={output} />
                            </AccordionItem>
                            <AccordionItem key="2" title={t("Toolchains")}>
                                <Toolchains t={t} lng={lng} updateToolchains={setOutput} template={output} />
                            </AccordionItem>
                            <AccordionItem key="3" title={t("Build params")}>
                                <BuildParams t={t} lng={lng} updateParams={setOutput} template={output} />
                            </AccordionItem>
                            <AccordionItem key="4" title={t("AnyKernel3")}>
                                <AnyKernel3 t={t} lng={lng} updateAnykernel3={setOutput} template={output} />
                            </AccordionItem>
                            <AccordionItem key="5" title={t("Other Configuration")}>
                                <div className='grid grid-cols-2 gap-x-4'>
                                    <Checkbox
                                        isSelected={output.withKernelSU}
                                        onValueChange={
                                            (flag) => {
                                                setOutput({ ...output, withKernelSU: flag })
                                            }
                                        }
                                    >
                                        {t("Is build with KernelSU")}
                                    </Checkbox>
                                    <Checkbox
                                        isSelected={output.ccache}
                                        onValueChange={
                                            (flag) => {
                                                setOutput({ ...output, ccache: flag })
                                            }
                                        }
                                    >
                                        {t("Use ccache")}
                                    </Checkbox>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </CardBody>
                </Grid>
                <Grid xs={4}>
                    <CardBody className="config-output min-h-full">
                        <Textarea
                            isReadOnly
                            label={t("Output")}
                            variant="bordered"
                            placeholder={JSON.stringify({ output }, null, "\t")}
                            value={JSON.stringify(output, null, "\t")}
                            className="min-w-full min-h-full"
                            minRows={30}
                            maxRows={100}
                        />
                    </CardBody>
                </Grid>
            </Grid>
        </Card>
    );
}

export default ConfigurationBase;