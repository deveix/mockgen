import { ReactNode, useEffect } from "react"
import { Layer, Transformer } from "react-konva"

interface SelectableLayerProps {
    selected: "image" | "text" | "logo" | null
    imageRef: React.RefObject<any>
    textRef: React.RefObject<any>
    trRef: React.RefObject<any>
    logoRef?: React.RefObject<any>
    children: ReactNode
}

export function SelectableLayer({ selected, imageRef, textRef, trRef, logoRef, children }: SelectableLayerProps) {
    useEffect(() => {
        if (!trRef.current) return
        if (selected === "image" && imageRef?.current) {
            trRef.current.nodes([imageRef.current])
            trRef.current.getLayer()?.batchDraw()
        } else if (selected === "text" && textRef?.current) {
            trRef.current.nodes([textRef.current])
            trRef.current.getLayer()?.batchDraw()
        } else if (selected === "logo" && logoRef?.current) {
            trRef.current.nodes([logoRef.current])
            trRef.current.getLayer()?.batchDraw()
        } else {
            trRef.current.nodes([])
        }
    }, [selected, imageRef, textRef, logoRef, trRef])

    return (
        <Layer>
            {children}
            {selected && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={true}
                    enabledAnchors={[
                        "top-left",
                        "top-right",
                        "bottom-left",
                        "bottom-right",
                    ]}
                    boundBoxFunc={(oldBox, newBox) =>
                        newBox.width < 10 || newBox.height < 10 ? oldBox : newBox
                    }
                />
            )}
        </Layer>
    )
}
