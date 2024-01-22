"use client"

import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Heading } from '@/components/Heading'
import axios from 'axios'
import { ImageIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { amountOptions, formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Empty from '@/components/Empty'
import Loader from '@/components/ui/Loader'
import UserAvatar from '@/components/UserAvatar'
import BotAvatar from '@/components/BotAvatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'



const ImagePage = () => {
	const [images, setImages] = useState<string[]>([])
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
			amount: "1",
			resolution: "512x512",
		}
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setImages([])
			const response = await axios.post('/api/image', values)
			const urls = response.data.map((image: { url: string }) => image.url)
			setImages(urls)
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
				title="Image Generation"
				description="Turn your prompt into an image. "
				icon={ImageIcon}
				iconColor="text-pink-700"
				bgColor="bg-pink-700/10" />
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
								className="col-span-12 lg:col-span-6"
							>
								<FormControl className="m-0 p-0">
									<Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
										disabled={isLoading}
										placeholder="A picture of a little pink pony"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem className="col-span-12 lg:col-span-2">
								<Select
									disabled={isLoading}
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue defaultValue={field.value} />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{amountOptions.map((amountOption) => (
											<SelectItem value={amountOption.value}>{amountOption.value}</SelectItem>
										))}
									</SelectContent>

								</Select>
							</FormItem>
						)}
					>

					</FormField>
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
					<div className="p-20">
						<Loader />
					</div>
				)}
				{images.length === 0 && !isLoading && (
					<div>
						<Empty label="No images generated" />
					</div>
				)}
				<div>
					Images will be rendered here
				</div>
			</div>

		</div >
	)
}

export default ImagePage