import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useRef } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/file.service'

export function useUpload(
	onChange: (value: string[]) => void,
	currentImages: string[] = []
) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { mutate: uploadFiles, isPending: isUploading } = useMutation({
		mutationKey: ['upload files'],
		mutationFn: (formData: FormData) => fileService.upload(formData),
		onSuccess(data) {
			const newUrls = data.map(file => file.url)
			onChange([...currentImages, ...newUrls])
		},
		onError() {
			toast.error('Ошибка при загрузки файлов')
		}
	})

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files

		if (selectedFiles && selectedFiles.length > 0) {
			const fileArray = Array.from(selectedFiles)

			const formData = new FormData()
			fileArray.forEach(file => formData.append('files', file))

			uploadFiles(formData)
			event.target.value = ''
		}
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	return {
		handleButtonClick,
		isUploading,
		fileInputRef,
		handleFileChange
	}
}
