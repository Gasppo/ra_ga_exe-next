import FormItem from '@UI/Forms/FormItem';
import { clothingFilesLayout } from './forms/clothingFiles.layout';

const ClothingFilesForm = () => {

    
    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <div className="form-input-section">
                <FormItem layout={clothingFilesLayout} />
            </div>
        </div>
    )
}

export default ClothingFilesForm
