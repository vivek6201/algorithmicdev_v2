"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.bubble.css";

const ReactQuill = dynamic(async () => await import("react-quill-new"), {
    ssr: true,
});

export default function ContentRenderer({ content }: { content: string }) {
    return (
        <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none [&_.ql-editor]:p-0! [&_.ql-editor]:text-sm! sm:[&_.ql-editor]:text-base!">
            <ReactQuill
                value={content}
                readOnly={true}
                theme="bubble"
                className="text-foreground border-0"
            />
        </div>
    );
}
