"use client"

import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Heading } from '@/components/Heading'
import axios from 'axios'
import { Code2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import Empty from '@/components/Empty'
import Loader from '@/components/ui/Loader'
import UserAvatar from '@/components/UserAvatar'
import BotAvatar from '@/components/BotAvatar'
import ReactMarkdown from 'react-markdown'



const CodePage = () => {


	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		}
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionMessageParam = {
				role: 'user',
				content: values.prompt
			}

			const newMessage = [...messages, userMessage]

			const response = await axios.post('/api/code', {
				messages: newMessage
			})

			setMessages((current) => [...current, userMessage, response.data])
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
				title="Code Generation"
				description="Generate code using descriptive text. "
				icon={Code2}
				iconColor="text-yellow-300"
				bgColor="bg-yellow-3 00/10" />
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
										placeholder="Simple toggle button using react hooks."
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
					<div className="p-20">
						<Loader />
					</div>
				)}
				{messages.length === 0 && !isLoading && (
					<div>
						<Empty label="No conversation started" />
					</div>
				)}
				<div className="flex flex-col-reverse gap-y-4">
					{messages.map((message) => (
						<div className={
							cn("p-8 w-full flex  items-start gap-x-8 rounded-lg",
								message.role === 'user' ?
									"bg-white border border-black/10" :
									"bg-muted")}>
							{message.role === 'user' ? <UserAvatar /> : <BotAvatar />
							}
							<ReactMarkdown
								components={{
									pre: ({ node, ...props }) => (
										<pre className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg"{...props} />
									),
									code: ({ node, ...props }) => (
										<code className="bg-black/10 rounded-lg p-1"{...props} />
									)
								}}
								className="text-sm overflow-hidden leading-7"
							>
								{message.content || " "}
							</ReactMarkdown>
						</div>
					))}
				</div>
			</div>

		</div >
	)
}

export default CodePage