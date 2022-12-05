import { ProcessStateTextColors } from '@UI/orden/SelectableOrderProcessItem'
import { ExtendedOrdenData } from '@utils/Examples/ExtendedOrdenData'
import React, { useMemo } from 'react'

type Props = {
  orderData: ExtendedOrdenData
  selectedProcess: string
}

const DetailsListElement = ({ title, value }: { title: string, value: string | number }) => {
  const textColor = ProcessStateTextColors(value?.toString())

  return (
    <div className='flex flex-row items-center space-x-2'>
      <div className='text-lg'>- <span className='underline'>{title}:</span> <span className={`${textColor} text-sm`}>{value}</span></div>
    </div>
  )
}
const ServiceDetailsTab = ({ orderData, selectedProcess }: Props) => {

  const currProcess = useMemo(() => orderData?.procesos.find(el => el.id === selectedProcess), [selectedProcess, orderData?.procesos])
  const estimatedAt =  new Date(currProcess?.ficha.estimatedAt).toLocaleDateString('es-AR')
  const updatedAt = new Date(currProcess?.ficha.updatedAt).toLocaleDateString('es-AR')+ ' ' + new Date(currProcess?.ficha.updatedAt).toLocaleTimeString()

  return (
    <div className='flex flex-col mt-4'>
      <div className='text-gray-700 text-xl font-semibold'>{currProcess?.proceso}</div>
      <div className='flex flex-col space-y-2 mt-2'>
        <DetailsListElement title='Estado' value={currProcess?.estado} />
        <DetailsListElement title='Fecha estimada' value={estimatedAt} />
        <DetailsListElement title='Ultima modificacion' value={updatedAt} />
      </div>

    </div>
  )
}

export default ServiceDetailsTab