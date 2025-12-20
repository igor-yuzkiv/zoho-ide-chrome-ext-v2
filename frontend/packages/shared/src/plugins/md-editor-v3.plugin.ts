import hljs from 'highlight.js'
import mermaid from 'mermaid'
import katex from 'katex'
import { config as mdEditorConfig } from 'md-editor-v3'

import 'highlight.js/styles/atom-one-dark.css'
import 'katex/dist/katex.min.css'

mdEditorConfig({
    editorExtensions: {
        highlight: { instance: hljs },
        mermaid: { instance: mermaid },
        katex: { instance: katex },
    },
    katexConfig(base: any) {
        return {
            ...base,
            strict: false, // Disable strict mode to allow all cyrylic characters
        }
    },
})