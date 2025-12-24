import Link from "next/link"

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden bg-muted lg:block">
                <div className="absolute inset-0 h-full w-full bg-zinc-900">
                    <svg
                        className="absolute inset-0 h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 0.2 }} />
                                <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 0.2 }} />
                            </linearGradient>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grad1)" />
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.05)" />
                        <circle cx="20" cy="80" r="15" fill="rgba(255,255,255,0.05)" />
                        <circle cx="80" cy="20" r="20" fill="rgba(255,255,255,0.05)" />
                    </svg>
                    <div className="absolute bottom-10 left-10 z-20 text-white">
                        <h1 className="text-4xl font-bold mb-2">Welcome to AlgorithmicDev</h1>
                        <p className="text-lg opacity-80">Secure, fast, and reliable authentication for your apps.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        AlgorithmicDev
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
