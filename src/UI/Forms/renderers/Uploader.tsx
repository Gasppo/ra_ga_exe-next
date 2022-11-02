import { Controller, useFormContext } from 'react-hook-form';
import { LayoutElement } from '../types';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Alert, IconButton } from "@mui/material";
import FileInfoTag from '../../cotizador/Inputs/FileInfoTag';
import { useIsDisabled } from '../../../utils/useIsDisabled';
import { useEffect, useMemo } from 'react';

export type UploaderProps<Model> = {
    layout: LayoutElement<Model>;
    hasParent?: boolean,
    parentScope?: string
}

function Uploader<Model>(props: UploaderProps<Model>) {
    const { layout } = props
    const isDisabled = useIsDisabled(layout?.rules || [])

    const { watch, setValue } = useFormContext()


    const fileInfoScope = layout?.options?.fileSection


    const allFiles: { file: File, section: string }[] = watch(layout.scope)
    const sectionFiles = useMemo(() => allFiles.filter(el => el.section === fileInfoScope).map(el => ({ name: el.file.name, type: el.file.type, urlID: 'test.url' })), [fileInfoScope, allFiles])


    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setValue(fileInfoScope, sectionFiles)
    }, [fileInfoScope, sectionFiles, setValue]);

    return (
        <>
            <Controller
                name={layout.scope}
                rules={{
                    required: {
                        value: layout?.options?.required,
                        message: 'Please check this field'
                    }
                }}
                render={({
                    field: { onChange, value },
                }) => {
                    return (
                        <div className='flex flex-col'>
                            {layout.options.helperText ?
                                <div className='w-fit my-4'>
                                    <Alert severity='info'>{layout.options.helperText}</Alert>
                                </div> : null}
                            <div className='flex flex-row items-center'>
                                <IconButton color="primary" aria-label="upload picture" component="label" className="justify-end" disabled={isDisabled} >
                                    <input multiple={layout?.options?.multifile} hidden accept="image/*,.plt,.jpg,.png,.pdf" type="file" onChange={(event) => onChange(
                                        [...value?.filter(el => el.section !== layout?.options?.fileSection), ...Array.from(event.target.files).map(el => ({
                                            file: el,
                                            section: layout?.options?.fileSection || ''
                                        }))]
                                    )} />
                                    <FileUploadIcon />
                                </IconButton>
                                <div className='border-2 w-full mx-2 md:mx-4 p-4 flex flex-col md:flex-row md:flex-wrap overflow-x-hidden rounded-sm border-gray-300'>
                                    {value?.map((el: { file: File, section: string }, i: number) => {
                                        if (el.section === layout?.options?.fileSection) return <FileInfoTag file={el.file} key={i} onRemove={(fileName) => onChange(value?.filter((el: { file: File, section: string }) => el.file.name !== fileName))} />
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                }}
            />

        </>
    )
}

export default Uploader