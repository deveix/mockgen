import { createStore } from "zustand/vanilla"

import { Template, templateDefaults, TemplateName } from "@/lib/templates"

export interface ScreenshotTemplate {
  id: number
  template: Template
  previewSvg: string | null
  screenshot?: File
}

export interface MultiTemplateState {
  screenshots: ScreenshotTemplate[]
}

export interface MultiTemplateActions {
  addScreenshot: (file: File) => void
  removeScreenshot: (id: number) => void
  updateTemplate: (id: number, templateName: TemplateName) => void
  updateTemplateParams: (id: number, params: any) => void
  updateTemplateBackground: (
    id: number,
    background: Template["background"]
  ) => void
  updatePreviewSvg: (id: number, svg: string) => void
  clearAll: () => void
}

export type MultiTemplateStore = MultiTemplateState & MultiTemplateActions

export const defaultInitState: MultiTemplateState = {
  screenshots: [],
}

export const createMultiTemplateStore = (initState?: MultiTemplateState) => {
  const state = initState || defaultInitState
  return createStore<MultiTemplateStore>()((set, get) => ({
    ...state,
    addScreenshot: (file: File) =>
      set((state) => {
        if (state.screenshots.length >= 6) return state

        const newId = Math.max(0, ...state.screenshots.map((s) => s.id)) + 1
        const baseTemplate = templateDefaults["apple:app-screenshot"]
        const newScreenshot: ScreenshotTemplate = {
          id: newId,
          template: {
            ...baseTemplate,
            params: {
              ...baseTemplate.params,
              screenshot: {
                url: URL.createObjectURL(file),
              },
            },
          } as Template,
          previewSvg: null,
          screenshot: file,
        }

        return {
          screenshots: [...state.screenshots, newScreenshot],
        }
      }),
    removeScreenshot: (id: number) =>
      set((state) => ({
        screenshots: state.screenshots.filter((s) => s.id !== id),
      })),
    updateTemplate: (id: number, templateName: TemplateName) =>
      set((state) => ({
        screenshots: state.screenshots.map((s) => {
          if (s.id !== id) return s

          const newTemplate = templateDefaults[templateName]
          // Preserve screenshot URL if the new template supports it
          const screenshotUrl = (s.template.params as any).screenshot?.url

          return {
            ...s,
            template: {
              ...newTemplate,
              params: {
                ...newTemplate.params,
                ...(screenshotUrl && (newTemplate.params as any).screenshot
                  ? {
                      screenshot: { url: screenshotUrl },
                    }
                  : {}),
              },
            } as Template,
          }
        }),
      })),
    updateTemplateParams: (id: number, params: any) =>
      set((state) => ({
        screenshots: state.screenshots.map((s) =>
          s.id === id
            ? {
                ...s,
                template: {
                  ...s.template,
                  params: {
                    ...s.template.params,
                    ...params,
                  },
                },
              }
            : s
        ),
      })),
    updateTemplateBackground: (
      id: number,
      background: Template["background"]
    ) =>
      set((state) => ({
        screenshots: state.screenshots.map((s) =>
          s.id === id
            ? {
                ...s,
                template: {
                  ...s.template,
                  background,
                },
              }
            : s
        ),
      })),
    updatePreviewSvg: (id: number, svg: string) =>
      set((state) => ({
        screenshots: state.screenshots.map((s) =>
          s.id === id ? { ...s, previewSvg: svg } : s
        ),
      })),
    clearAll: () => set({ screenshots: [] }),
  }))
}
