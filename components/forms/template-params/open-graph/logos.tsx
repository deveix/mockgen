import { useTemplateStore } from "@/providers/template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { LogosTemplate } from "@/lib/templates/open-graph"
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
import { ImageSelector } from "@/components/image-selector"
import { ResponsivePopover } from "@/components/responsive-popover"

export function Form() {
  const template = useTemplateStore((state) => state)
  const params = template.params as LogosTemplate["params"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Properties</CardTitle>
        <CardDescription>
          Customize your image by changing the properties.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tag">Tag</Label>
              <div className="flex space-x-2">
                <Input
                  id="tag"
                  value={params.tag.text}
                  onChange={(e) =>
                    template.updateParams({
                      tag: {
                        ...params.tag,
                        text: e.target.value,
                      },
                    })
                  }
                />

                <ResponsivePopover
                  title="Font Settings"
                  description="Customize the tag font."
                  trigger={
                    <Button variant="outline" size="icon">
                      <MixerHorizontalIcon className="h-4 w-4" />
                    </Button>
                  }
                >
                  <TextSettings
                    fontFamily={params.tag.fontFamily}
                    fontSize={params.tag.fontSize}
                    fontWeight={params.tag.fontWeight}
                    color={params.tag.color}
                    onChangeFontFamily={(fontFamily) =>
                      template.updateParams({
                        tag: {
                          ...params.tag,
                          fontFamily,
                        },
                      })
                    }
                    onChangeFontSize={(fontSize) =>
                      template.updateParams({
                        tag: {
                          ...params.tag,
                          fontSize,
                        },
                      })
                    }
                    onChangeFontWeight={(fontWeight) =>
                      template.updateParams({
                        tag: {
                          ...params.tag,
                          fontWeight,
                        },
                      })
                    }
                    onChangeColor={(color) =>
                      template.updateParams({
                        tag: {
                          ...params.tag,
                          color,
                        },
                      })
                    }
                  />
                </ResponsivePopover>
              </div>
            </div>

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

            {params.logos.map((logo, i) => (
              <div
                key={i}
                className="grid w-full max-w-sm items-center gap-1.5"
              >
                <Label htmlFor={`logo_${i}`}>
                  {getNumberWithOrdinal(i + 1)} Logo
                </Label>
                <ImageSelector
                  id={`logo_${i}`}
                  onChange={(v) =>
                    template.updateParams({
                      logos: updateNthItem(params.logos, i, {
                        ...logo,
                        url: v ?? "",
                      }),
                    })
                  }
                  initialFileName={
                    logo.url ? logo.url.split("/").pop() : undefined
                  }
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function getNumberWithOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100

  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function updateNthItem<T>(arr: T[], index: number, value: T) {
  return arr.map((item, i) => (i === index ? value : item))
}
