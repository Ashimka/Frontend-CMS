'use client'

import { ProfileModal } from '@/components/ui/modals/ProfileModal'

import { useProfile } from '@/hooks/useProfile'

export default function Settings() {
	const { user } = useProfile()

	return (
		<div className='flex flex-col mt-3'>
			<h2 className='text-lg font-bold'>Мои данные</h2>
			<div className='w-[96px]'>
				<ProfileModal>
					<span className='cursor-pointer text-blue-500 hover:text-blue-700'>
						Изменить
					</span>
				</ProfileModal>
			</div>
			{user?.profile && (
				<>
					<div className='flex flex-col gap-3 md:flex-row mt-4'>
						<div className='p-4 shadow-md shadow-purple-300'>
							<h4 className='font-semibold'>{`${user?.profile.firstName} ${user?.profile.lastName}`}</h4>
						</div>
						<div className='p-4 shadow-md shadow-purple-300'>
							<h4 className='font-semibold'>Адрес доставки:</h4>
							<p className='text-gray-700 text-md mt-2'>
								{user?.profile.address}
							</p>
						</div>
						<div className='p-4 shadow-md shadow-purple-300'>
							<h4 className='font-semibold'>Телефон:</h4>
							<p className='text-gray-700 text-md mt-2'>
								{user?.profile.phone}
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
