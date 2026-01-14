import { lazyLoad } from "@/lib/lazy";

const VerifyEmailClient = lazyLoad(() => import("@/components/pages/essential/auth/verify-email-client"));

export default function page() {
    return <VerifyEmailClient />
}
