"use client"

import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';

const MobileSidebar = () => {
	return (
		<div>
			<Sheet>
				<SheetTrigger>
					<Button className="md:hidden" variant="ghost" size="icon" asChild>
						<Menu />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="p-0">
					<Sidebar />
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default MobileSidebar