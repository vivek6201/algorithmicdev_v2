"use client"

import { MapPin, Briefcase, Filter as FilterIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

export default function Filter() {
    const FilterContent = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</Label>
                <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        placeholder="Enter Location"
                        className="pl-9 h-10 bg-background"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Job Type</Label>
                <Select>
                    <SelectTrigger className="h-10 bg-background w-full">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="FULL_TIME">Full Time</SelectItem>
                        <SelectItem value="PART_TIME">Part Time</SelectItem>
                        <SelectItem value="INTERN">Internship</SelectItem>
                        <SelectItem value="CONTRACT">Contract</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button className="w-full">Apply Filters</Button>
        </div>
    )

    return (
        <>
            {/* Desktop View */}
            <Card className="hidden lg:block border-border bg-card shadow-sm h-fit sticky top-20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border mb-4">
                    <CardTitle className="font-semibold text-lg">Apply filters</CardTitle>
                    <button className="text-xs text-primary font-medium hover:underline transition-all">Clear</button>
                </CardHeader>
                <CardContent>
                    <FilterContent />
                </CardContent>
            </Card>

            {/* Mobile View - Drawer Trigger Button (to be placed in JobList or locally fixed) */}
            <div className="lg:hidden">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <FilterIcon className="h-4 w-4" />
                            Filters
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full">
                            <DrawerHeader>
                                <DrawerTitle>Filters</DrawerTitle>
                                <DrawerDescription>Narrow down your job search.</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 pb-0">
                                <FilterContent />
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}
