/// <reference types="node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_CLARITY_PROJECT_ID: string
  }
}
