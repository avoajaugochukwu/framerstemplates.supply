'use client'

import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
})

interface RichTextProps {
  content: unknown
  className?: string
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) {
    return null
  }

  return (
    <div className={className}>
      <PayloadRichText
        converters={jsxConverters}
        data={content as Parameters<typeof PayloadRichText>[0]['data']}
      />
    </div>
  )
}
