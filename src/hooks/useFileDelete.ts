import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { fileService } from '@/services/file.service'

export function useFileDelete(onDeleteSuccess?: (deletedUrl: string) => void) {
	const { mutate: deleteFile, isPending: isDeleting } = useMutation({
		mutationKey: ['delete file'],
		mutationFn: (fileUrl: string) => fileService.deleteFile(fileUrl),
		onSuccess(data) {
			onDeleteSuccess?.(data)
			toast.success('Файл успешно удален')
		},
		onError() {
			toast.error('Ошибка при удалении файла')
		}
	})

	return {
		deleteFile,
		isDeleting
	}
}
