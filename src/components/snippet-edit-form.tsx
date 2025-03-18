'use client';
import type { Snippet } from '@prisma/client';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import * as actions from '@/action';

// actions.editSnippet();

interface SnippetEdotFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({snippet}:SnippetEdotFormProps) {
    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = (value : string = "") => {
        setCode(value); 
        console.log(value);
    };

    const editSnippetAction = actions.editSnippet.bind(null,snippet.id,code);


  return (
    <div>
        <Editor
            height="40vh"
            defaultLanguage="javascript"
            defaultValue={snippet.code}
            theme="vs-dark"
            options={{minimap: {enabled: false}}}
            onChange={handleEditorChange}
        >
        </Editor> 
        <form action = {editSnippetAction}>
            <button type = "submit" className="rounded p-2 bg-blue-500">Save</button>
        </form>
    </div>
  );
}