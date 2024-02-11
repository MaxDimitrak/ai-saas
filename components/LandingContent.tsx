'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
const testimonials = [
	{
		name: 'John',
		avatar: 'J',
		title: 'Software Engineer',
		description: 'This is the best application I\'ve used'
	},
	{
		name: 'Anna',
		avatar: 'A',
		title: 'Software Engineer',
		description: 'This is the best application I\'ve used'
	},
	{
		name: 'John',
		avatar: 'J',
		title: 'Software Engineer',
		description: 'This is the best application I\'ve used'
	},
	{
		name: 'John',
		avatar: 'J',
		title: 'Software Engineer',
		description: 'This is the best application I\'ve used'
	},
]
const LandingContent = () => {
	return (
		<div className='px-10 pb-20'>
			<h2 className='text-center text-4xl text-white font-extrabold mb-10'>
				Testimonials
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{testimonials.map((item) => (
					<Card key={item.description} className='bg-[#192339] border-none text-white'>
						<CardHeader>
							<CardTitle className='flex items-center gap-x-2'>
								<div>
									<p className='text-lg'>{item.name}</p>
									<p className='text-zinc-400 text-sm'>{item.title}</p>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{item.description}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export default LandingContent