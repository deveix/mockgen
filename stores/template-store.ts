import { createStore } from "zustand/vanilla"

import { Template, templateDefaults } from "@/lib/templates"

export type TemplateState = Template & {
  previewSvg: string | null
}

export type Actions = {
  setTemplate: (name: Template["name"]) => void
  updateParams: (params: Partial<Template["params"]>) => void
  setBackground: (background: Template["background"]) => void
  updateCanvas: (canvas: Partial<Template["canvas"]>) => void
  updatePreviewSvg: (svg: string) => void
}

export const defaultInitState: TemplateState = {
  ...templateDefaults["og:image-right"],
  previewSvg: null,
}

export type TemplateStore = TemplateState & Actions

export const createTemplateStore = (
  initState: TemplateState = defaultInitState
) => {
  return createStore<TemplateStore>()((set) => ({
    ...initState,
    setTemplate: (name) =>
      set({
        ...templateDefaults[name],
      }),
    updateParams: (params) =>
      set(
        (state) =>
          ({
            params: {
              ...state.params,
              ...params,
            },
          }) as Partial<TemplateState>
      ),
    setBackground: (background: Template["background"]) =>
      set((state) => ({
        background: {
          ...background,
        },
      })),
    updateCanvas: (canvas: Partial<Template["canvas"]>) =>
      set((state) => ({
        canvas: {
          ...state.canvas,
          ...canvas,
        },
      })),
    updatePreviewSvg: (svg: string) => set({ previewSvg: svg }),
  }))
}
