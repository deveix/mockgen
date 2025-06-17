"use client"

import { useTemplateStore } from "@/providers/template-store-provider"

import { templates } from "./forms/template-params"

interface TemplateFormProps {
  screenshotId: number
}

export default function TemplateForm({ screenshotId }: TemplateFormProps) {
  const templateName = useTemplateStore((state) => state.name)

  // get the template form based on the currently selected template
  const { Form } = templates[templateName]

  return <Form screenshotId={screenshotId} />
}
