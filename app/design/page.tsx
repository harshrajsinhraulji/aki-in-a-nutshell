"use client";

import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";

export default function DesignSystemPage() {
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <PageShell className="gap-8">
            <PageHeader
                title="Design System"
                subtitle="A collection of messy-cute components 🧸"
                emoji="🎨"
            />

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => addToast("You clicked Primary!", "success")}>
                        Primary Button
                    </Button>
                    <Button variant="secondary" onClick={() => addToast("Secondary clicked", "info")}>
                        Secondary Button
                    </Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="danger" onClick={() => addToast("Danger!", "error")}>
                        Danger Button
                    </Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button isLoading>Loading</Button>
                </div>
            </section>

            {/* Badges */}
            <section className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">Badges</h2>
                <div className="flex gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="danger">Danger</Badge>
                </div>
            </section>

            {/* Cards */}
            <section className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">Cards</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Glass Card</CardTitle>
                            <CardDescription>It's shiny and translucent.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Content goes here. This card uses the `glass` utility.</p>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm">Action</Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle>Solid Card</CardTitle>
                            <CardDescription>Just a plain white card.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Input placeholder="Type something..." />
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Avatars */}
            <section className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">Avatars</h2>
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                </div>
            </section>

            {/* Modal & Toast */}
            <section className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">Interactions</h2>
                <div className="flex gap-4">
                    <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                    <Button variant="secondary" onClick={() => addToast("Here is a toast notification!")}>
                        Show Toast
                    </Button>
                </div>
            </section>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
                description="This is a fully accessible, animated modal dialog."
            >
                <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="message">Message</Label>
                        <Input id="message" placeholder="Type your message here." />
                    </div>
                </div>
            </Modal>
        </PageShell>
    );
}
