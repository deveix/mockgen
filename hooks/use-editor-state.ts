import { useReducer } from "react"

export type EditableElement = "image" | "text" | "logo"

export interface ElementState {
    x: number
    y: number
    width: number
    height?: number
    rotation?: number
}

export interface EditorState {
    selected: EditableElement | null
    image: ElementState
    text: ElementState
    logo: ElementState
}

type Action =
    | { type: "select"; element: EditableElement | null }
    | { type: "update"; element: EditableElement; payload: Partial<ElementState> }
    | { type: "reset"; image: ElementState; text: ElementState; logo: ElementState }

function reducer(state: EditorState, action: Action): EditorState {
    switch (action.type) {
        case "select":
            return { ...state, selected: action.element }
        case "update":
            return {
                ...state,
                [action.element]: { ...state[action.element], ...action.payload },
            }
        case "reset":
            return {
                selected: null,
                image: action.image,
                text: action.text,
                logo: action.logo,
            }
        default:
            return state
    }
}

export function useEditorState(
    initialImage: ElementState,
    initialText: ElementState,
    initialLogo: ElementState
) {
    return useReducer(reducer, {
        selected: null,
        image: initialImage,
        text: initialText,
        logo: initialLogo,
    })
}
