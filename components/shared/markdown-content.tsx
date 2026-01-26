'use client'

import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[]
  format?: number
  url?: string
  tag?: string
  listType?: string
  value?: number
}

interface LexicalContent {
  root?: {
    children?: LexicalNode[]
  }
}

/**
 * Recursively extracts text from a Lexical JSON structure,
 * preserving markdown formatting in the text nodes.
 */
function extractTextFromLexical(node: LexicalNode, listIndex?: number): string {
  if (node.type === 'text') {
    let text = node.text || ''
    // Handle text formatting via format bitmask
    // 1 = bold, 2 = italic, 8 = strikethrough
    if (node.format) {
      if (node.format & 1) text = `**${text}**`
      if (node.format & 2) text = `*${text}*`
      if (node.format & 8) text = `~~${text}~~`
    }
    return text
  }

  if (node.type === 'link' && node.url) {
    const linkText = node.children?.map((child) => extractTextFromLexical(child)).join('') || ''
    return `[${linkText}](${node.url})`
  }

  if (node.type === 'linebreak') {
    return '  \n'
  }

  if (!node.children || node.children.length === 0) {
    return ''
  }

  const childText = node.children.map((child) => extractTextFromLexical(child)).join('')

  // Add appropriate spacing/formatting based on block type
  switch (node.type) {
    case 'paragraph':
      return childText + '\n\n'
    case 'heading': {
      const level = node.tag ? parseInt(node.tag.replace('h', '')) : 2
      return '#'.repeat(level) + ' ' + childText + '\n\n'
    }
    case 'listitem': {
      const prefix = listIndex !== undefined ? `${listIndex}. ` : '- '
      return prefix + childText + '\n'
    }
    case 'list': {
      const isOrdered = node.listType === 'number'
      const items = node.children.map((child, index) =>
        extractTextFromLexical(child, isOrdered ? index + 1 : undefined)
      ).join('')
      return items + '\n'
    }
    case 'quote':
      return '> ' + childText + '\n\n'
    default:
      return childText
  }
}

/**
 * Converts Lexical content to markdown string
 */
function lexicalToMarkdown(content: LexicalContent): string {
  if (!content?.root?.children) {
    return ''
  }

  return content.root.children
    .map((node) => extractTextFromLexical(node))
    .join('')
    .trim()
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-8 mb-4 first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 italic my-4">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
}

interface MarkdownContentProps {
  content: unknown
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) {
    return null
  }

  // Extract markdown from Lexical structure
  const markdown = lexicalToMarkdown(content as LexicalContent)

  if (!markdown) {
    return null
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </ReactMarkdown>
  )
}
