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
import { ImageSettings } from "@/components/forms/image-settings"
import { TextSettings } from "@/components/forms/text-settings"
import { ImageSelector } from "@/components/image-selector"
import { ResponsivePopover } from "@/components/responsive-popover"

export function Form() {
    const template = useTemplateStore((state) => state)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = template.params as any;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hanged-Up Screenshot Properties</CardTitle>
                <CardDescription>
                    Customize your screenshot template properties.
                </CardDescription>
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
                                            <MixerHorizontalIcon className="size-4" />
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
                            <Label htmlFor="logo">Logo</Label>
                            <div className="flex space-x-2 overflow-hidden">
                                <div className="min-w-0 flex-1">
                                    <ImageSelector
                                        id="logo"
                                        onChange={(v) =>
                                            template.updateParams({
                                                logo: {
                                                    ...(params.logo ?? {}),
                                                    url: v ?? "",
                                                },
                                            })
                                        }
                                        initialFileName={
                                            params.logo.url
                                                ? params.logo.url.split("/").pop()
                                                : undefined
                                        }
                                    />
                                </div>
                                <ResponsivePopover
                                    title="Logo Settings"
                                    description="Customize the logo."
                                    trigger={
                                        <Button variant="outline" size="icon">
                                            <MixerHorizontalIcon className="size-4" />
                                        </Button>
                                    }
                                >
                                    <ImageSettings
                                        width={params.logo.width ?? 200}
                                        height={params.logo.height ?? 200}
                                        onChangeWidth={(width) =>
                                            template.updateParams({
                                                logo: {
                                                    ...params.logo,
                                                    width: width ?? 200,
                                                },
                                            })
                                        }
                                        onChangeHeight={(height) =>
                                            template.updateParams({
                                                logo: {
                                                    ...params.logo,
                                                    height: height ?? 200,
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
                                initialFileName={
                                    params.screenshot.url
                                        ? params.screenshot.url.split("/").pop()
                                        : "screenshot.png"
                                }
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
