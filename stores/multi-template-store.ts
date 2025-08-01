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
  selectedPlatform: "apple" | "android"
}

export interface MultiTemplateActions {
  addScreenshot: (file: File) => void
  removeScreenshot: (id: number) => void
  updateTemplate: (id: number, templateName: TemplateName) => void
  updateTemplateParams: (id: number, params: Partial<Template["params"]>) => void
  updateTemplateBackground: (
    id: number,
    background: Template["background"]
  ) => void
  updateAllBackgrounds: (background: Template["background"]) => void
  updatePreviewSvg: (id: number, svg: string) => void
  reorderScreenshots: (activeId: number, overId: number) => void
  reapplyTemplatesByOrder: (platform?: "apple" | "android") => void
  clearAll: () => void
  getScreenshotById: (id: number) => ScreenshotTemplate | undefined
  setSelectedPlatform: (platform: "apple" | "android") => void
}

export type MultiTemplateStore = MultiTemplateState & MultiTemplateActions

export const defaultInitState: MultiTemplateState = {
  screenshots: [],
  selectedPlatform: "apple",
}

export const createMultiTemplateStore = (initState?: MultiTemplateState) => {
  const state = initState || defaultInitState
  return createStore<MultiTemplateStore>()((set, get) => ({
    ...state,
    // Selector helpers for performance optimization
    getScreenshotById: (id: number) => {
      return get().screenshots.find((s) => s.id === id)
    },
    setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
    addScreenshot: (file: File) =>
      set((state) => {
        const newId = Math.max(0, ...state.screenshots.map((s) => s.id)) + 1

        // Apple templates in rotation order
        let appleTemplates: TemplateName[] = [
          "apple:app-screenshot",
          "apple:tilted-left",
          "apple:tilted-right",
          "apple:hanged-up",
          "apple:rotated",
        ]

        if (state.selectedPlatform === "android") {
          appleTemplates = [
          "android:app-screenshot",
          "android:hanged-up",
        ]
        }

        // Get the template based on current count (rotate through templates)
        const templateIndex = state.screenshots.length % appleTemplates.length
        const templateName = appleTemplates[templateIndex]
        const baseTemplate = templateDefaults[templateName]

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const screenshotUrl = (s.template.params as any).screenshot?.url

          return {
            ...s,
            template: {
              ...newTemplate,
              params: {
                ...newTemplate.params,
                   // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    updateAllBackgrounds: (background: Template["background"]) =>
      set((state) => ({
        screenshots: state.screenshots.map((s) => ({
          ...s,
          template: {
            ...s.template,
            background,
          },
        })),
      })),
    updatePreviewSvg: (id: number, svg: string) =>
      set((state) => ({
        screenshots: state.screenshots.map((s) =>
          s.id === id ? { ...s, previewSvg: svg } : s
        ),
      })),
    reorderScreenshots: (activeId: number, overId: number) =>
      set((state) => {
        const screenshots = [...state.screenshots]
        const activeIndex = screenshots.findIndex((s) => s.id === activeId)
        const overIndex = screenshots.findIndex((s) => s.id === overId)

        if (activeIndex !== -1 && overIndex !== -1) {
          const [reorderedItem] = screenshots.splice(activeIndex, 1)
          screenshots.splice(overIndex, 0, reorderedItem)
        }

        return { screenshots }
      }),
    reapplyTemplatesByOrder: (platform?: "apple" | "android") =>
      set((state) => {
        // templates in rotation order
        // Apple templates in rotation order
        let appleTemplates: TemplateName[] = [
          "apple:app-screenshot",
          "apple:tilted-left",
          "apple:tilted-right",
          "apple:hanged-up",
          "apple:rotated",
        ]

        if (platform === "android") {
          appleTemplates = [
          "android:app-screenshot",
          "android:hanged-up",
        ]
        }
        const updatedScreenshots = state.screenshots.map(
          (screenshot, index) => {
            const templateIndex = index % appleTemplates.length
            const templateName = appleTemplates[templateIndex]
            const baseTemplate = templateDefaults[templateName]

            return {
              ...screenshot,
              template: {
                ...screenshot.template, // Preserve all existing template properties
                ...baseTemplate, // Apply new template defaults
                params: {
                  ...baseTemplate.params, // Start with new template params
                  ...screenshot.template.params, // Override with existing params to preserve customizations
                },
                background: screenshot.template.background, // Explicitly preserve background
              } as Template,
              previewSvg: null, // Reset preview to trigger re-render
            }
          }
        )

        return { screenshots: updatedScreenshots }
      }),
    clearAll: () => set({ screenshots: [] }),
  }))
}
