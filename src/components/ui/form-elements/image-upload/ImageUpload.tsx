import { CircleX, ImagePlus } from 'lucide-react'
import Image from 'next/image'

import { useUpload } from '@/hooks/useUpload'

import { cn } from '@/utils/clsx'

import { Button } from '../../Button'
import { ConfirmModal } from '../../modals/ConfirmModal'

import styles from './ImageUpload.module.scss'

interface ImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[]) => void
	value: string[]
	handleDeleteImage: (name: string) => void
}

export function ImageUpload({
	isDisabled,
	onChange,
	value,
	handleDeleteImage
}: ImageUploadProps) {
	const imageValues = Array.isArray(value) ? value : [value].filter(Boolean)

	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange, imageValues)

	const handleDelete = (url: string) => {
		if (isDisabled) return

		handleDeleteImage(url)
	}

	return (
		<div>
			<div className={styles.image_container}>
				{imageValues[0] !== '' &&
					imageValues?.map(url => (
						<div key={url} className={styles.image_wrapper}>
							<ConfirmModal handleClick={() => handleDelete(url)}>
								<Button size='smIcon'>
									<CircleX />
								</Button>
							</ConfirmModal>
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
				accept='image/*'
			/>
		</div>
	)
}
