"use client"

import { createContext, useContext, useRef, type ReactNode } from "react"
import {
  createTemplateStore,
  type TemplateStore,
} from "@/stores/template-store"
import { useStore, type StoreApi } from "zustand"

export const TemplateStoreContext =
  createContext<StoreApi<TemplateStore> | null>(null)

export interface TemplateStoreProviderProps {
  children: ReactNode
}

export const TemplateStoreProvider = ({
  children,
}: TemplateStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TemplateStore>>(undefined)
  if (!storeRef.current) {
    storeRef.current = createTemplateStore()
  }

  return (
    <TemplateStoreContext.Provider value={storeRef.current}>
      {children}
    </TemplateStoreContext.Provider>
  )
}

export const useTemplateStore = <T,>(
  selector: (store: TemplateStore) => T
): T => {
  const counterStoreContext = useContext(TemplateStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useTemplateStore must be use within TemplateStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}
