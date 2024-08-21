import { ImagePlus } from 'lucide-react'
import Image from 'next/image'

import { useUpload } from '@/hooks/useUpload'

import { cn } from '@/utils/clsx'

import { Button } from '../../Button'

import styles from './ImageUpload.module.scss'

interface ImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[]) => void
	value: string[]
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange)
	const imageValues: string[] = Array.isArray(value as unknown as string)
		? value
		: value.toString().split(',')

	return (
		<div>
			<div className={styles.image_container}>
				{imageValues?.map(url => (
					<div key={url} className={styles.image_wrapper}>
						<Image src={url} alt='Картинка' fill sizes='auto' />
					</div>
				))}
			</div>
			<Button
				type='button'
				disabled={isDisabled || isUploading}
				variant='secondary'
				onClick={handleButtonClick}
				className={cn(styles.upload, {
					'mt-4': value.length
				})}
			>
				<ImagePlus />
				Загрузить картинки
			</Button>
			<input
				type='file'
				multiple
				className='hidden'
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={isDisabled}
			/>
		</div>
	)
}
