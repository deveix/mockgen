import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextSettings } from "@/components/forms/text-settings"
import { ResponsivePopover } from "@/components/responsive-popover"
import { ImageSelector } from "@/components/image-selector"

interface AppleTemplateFormProps<Params, Background> {
    title: string
    description: string
}

export function AppleTemplateForm<Params extends { title: any; screenshot: any }, Background>({
    title,
    description,
}: AppleTemplateFormProps<Params, Background>) {
    const template = useTemplateStore((state) => state)
    const params = template.params as Params

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <div className="flex space-x-2">
                                <Input
                                    id="title"
                                    value={params.title.text}
                                    onChange={(e) =>
                                        template.updateParams({
                                            title: {
                                                ...params.title,
                                                text: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <ResponsivePopover
                                    title="Font Settings"
                                    description="Customize the title font."
                                    trigger={
                                        <Button variant="outline" size="icon">
                                            <MixerHorizontalIcon className="h-4 w-4" />
                                        </Button>
                                    }
                                >
                                    <TextSettings
                                        fontFamily={params.title.fontFamily}
                                        fontSize={params.title.fontSize}
                                        fontWeight={params.title.fontWeight}
                                        color={params.title.color}
                                        onChangeFontFamily={(fontFamily) =>
                                            template.updateParams({
                                                title: {
                                                    ...params.title,
                                                    fontFamily,
                                                },
                                            })
                                        }
                                        onChangeFontSize={(fontSize) =>
                                            template.updateParams({
                                                title: {
                                                    ...params.title,
                                                    fontSize,
                                                },
                                            })
                                        }
                                        onChangeFontWeight={(fontWeight) =>
                                            template.updateParams({
                                                title: {
                                                    ...params.title,
                                                    fontWeight,
                                                },
                                            })
                                        }
                                        onChangeColor={(color) =>
                                            template.updateParams({
                                                title: {
                                                    ...params.title,
                                                    color,
                                                },
                                            })
                                        }
                                    />
                                </ResponsivePopover>
                            </div>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="screenshot">Screenshot</Label>
                            <ImageSelector
                                id="screenshot"
                                onChange={(v) =>
                                    template.updateParams({
                                        screenshot: {
                                            url: v ?? "",
                                        },
                                    })
                                }
                                url={params.screenshot.url}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
