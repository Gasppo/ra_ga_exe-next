import { Controller } from 'react-hook-form';
import { LayoutElement } from './types';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton } from "@mui/material";
import FileInfoTag from '../cotizador/Inputs/FileInfoTag';
import { useIsDisabled } from './useIsDisabled';

export type UploaderProps<Model> = {
    layout: LayoutElement<Model>;
    hasParent?: boolean,
    parentScope?: string
}

function Uploader<Model>(props: UploaderProps<Model>) {
    const { layout } = props
    const isDisabled = useIsDisabled(layout?.rules || [])

    return (
        <>
            <Controller
                name={layout.scope}
                defaultValue={null}
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
                        <div className='flex flex-row items-center'>
                            <IconButton color="primary" aria-label="upload picture" component="label" className="justify-end" disabled={isDisabled} >
                                <input multiple={layout?.options?.multifile} hidden accept="image/*" type="file" onChange={(event) => onChange(Array.from(event.target.files))} />
                                <FileUploadIcon />
                            </IconButton>
                            <div className='border-2 w-full mx-2 md:mx-4 p-4 flex flex-col md:flex-row md:flex-wrap overflow-x-scroll'>
                                {value?.map((file: File, i: number) => <FileInfoTag file={file} key={i} onRemove={(fileName) => onChange(value?.filter((file: File) => file.name !== fileName))} />)}
                            </div>
                        </div>
                    )
                }}
            />

        </>
    )
}

export default Uploader