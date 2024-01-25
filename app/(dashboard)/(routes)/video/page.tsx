"use client"

import * as z from 'zod'
import { Heading } from '@/components/Heading'
import axios from 'axios'
import { Music, Video } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Empty from '@/components/Empty'
import Loader from '@/components/ui/Loader'





const VideoPage = () => {


	const router = useRouter();
	const [video, setVideo] = useState<string>()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		}
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setVideo(undefined)

			const response = await axios.post('/api/video', values)

			setVideo(response.data[0])
			form.reset()
		} catch (err: any) {
			console.log(err);
		} finally {
			router.refresh();
		}
	}

	return (
		<div className="px-4">
			<Heading
				title="Video Generation"
				description="Turn your prompt into video. "
				icon={Video}
				iconColor="text-orange-700"
				bgColor="bg-orange-700/10" />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="
					rounded-lg border w-full p-4  md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2
					"
				>
					<FormField
						control={form.control}
						name="prompt"
						render={({ field }) => (
							<FormItem
								className="col-span-12 lg:col-span-10"
							>
								<FormControl className="m-0 p-0">
									<Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
										disabled={isLoading}
										placeholder="4d space"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="col-span-12 lg:col-span-2 w-full"
						disabled={isLoading}
					>
						Generate
					</Button>
				</form>
			</Form>
			<div className="py-4 mt-4">
				{isLoading && (
					<div>
						<Loader />
					</div>
				)}
				{!video && !isLoading && (
					<div>
						<Empty label="No music generated" />
					</div>
				)}
				<div>
					{video && (
						<video controls className='w-full aspect-video  mt-8 rounded-lg border bg-black'>
							<source src={video} />
						</video>
					)}
				</div>
			</div>

		</div >
	)
}

export default VideoPage