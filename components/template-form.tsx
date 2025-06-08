"use client"

import { useTemplateStore } from "@/providers/template-store-provider"

import { templates } from "./forms/template-params"

export default function TemplateForm() {
  const templateName = useTemplateStore((state) => state.name)

  // get the template form based on the currently selected template
  const { Form } = templates[templateName]

  return <Form />
}
