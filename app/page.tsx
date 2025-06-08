import Link from "next/link"
import { InfoCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyApiRequestButton } from "@/components/copy-api-request-button"
import { BackgroundForm } from "@/components/forms/background"
import PreviewRenderer from "@/components/preview-renderer"
import SaveImageButton from "@/components/save-image-button"
import TemplateForm from "@/components/template-form"
import TemplateSelector from "@/components/template-selector"

export default function Home() {
  return (
    <div className="space-y-4">
      <TemplateSelector />

      <Separator />

      <div className="grid gap-x-4 gap-y-4 lg:grid-cols-3">
        <div className="order-last col-span-1 space-y-4 lg:order-first">
          <TemplateForm />

          <BackgroundForm />
        </div>

        <div className="order-first lg:order-last lg:col-span-2">
          <div className="sticky top-0 grow-0 space-y-4">
            <Card className="col-span-2 px-2 md:px-4">
              <div className="overflow-hidden">
                <PreviewRenderer />
              </div>
            </Card>

            <Tabs defaultValue="save">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="save">Save Image</TabsTrigger>
                <TabsTrigger value="api">API Request</TabsTrigger>
              </TabsList>
              <TabsContent value="save">
                <Card>
                  <CardHeader>
                    <CardTitle>Save Image</CardTitle>
                    <CardDescription>
                      Export the image as a PNG.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between space-x-2">
                    <div className="flex items-center">
                      <InfoCircledIcon className="mr-2 h-4 w-4" />
                      <p className="text-sm">
                        <Button
                          className="h-auto p-0 underline"
                          variant="link"
                          asChild
                        >
                          <Link href="https://imgsrc.io/guides/open-graph-meta-tags">
                            Learn more
                          </Link>
                        </Button>{" "}
                        about Open Graph meta tags.
                      </p>
                    </div>

                    <SaveImageButton />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>API Request</CardTitle>
                    <CardDescription>
                      Generate Open Graph images on the fly with our API.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between space-x-2">
                    <div className="flex items-center">
                      <InfoCircledIcon className="mr-2 h-4 w-4" />
                      <p className="text-sm">
                        Copy the request body as JSON or a cURL command.
                      </p>
                    </div>

                    <CopyApiRequestButton />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
