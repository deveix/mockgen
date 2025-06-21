"use client"

import { createContext, PropsWithChildren, useContext, useRef } from "react"
import {
  createMultiTemplateStore,
  type MultiTemplateStore,
  type MultiTemplateStoreWithRefs,
} from "@/stores/multi-template-store"
import { useStore, type StoreApi } from "zustand"

const MultiTemplateStoreContext =
  createContext<StoreApi<MultiTemplateStoreWithRefs> | null>(null)


export const MultiTemplateStoreProvider = ({
  children,
}: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<MultiTemplateStore>>(undefined)
  if (!storeRef.current) {
    storeRef.current = createMultiTemplateStore()
  }

  return (
    <MultiTemplateStoreContext.Provider value={storeRef.current}>
      {children}
    </MultiTemplateStoreContext.Provider>
  )
}

export const useMultiTemplateStore = <T,>(
  selector: (store: MultiTemplateStoreWithRefs) => T
): T => {
  const multiTemplateStoreContext = useContext(MultiTemplateStoreContext)

  if (!multiTemplateStoreContext) {
    throw new Error(
      `useMultiTemplateStore must be used within MultiTemplateStoreProvider`
    )
  }

  return useStore(multiTemplateStoreContext, selector)
}
