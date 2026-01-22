import * as React from 'react';
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg").meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().min(5).max(180).default("framed picture with sun and mountains, flat illustration style").meta({
    description: "Prompt used to generate the image. Max 30 words",
  }),
})

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_prompt__: z.string().min(3).max(60).default("circle i footer replacement").meta({
    description: "Prompt used to describe or generate the icon. Max 10 words",
  }),
})

const layoutId = "framed-image-title-subtitle-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a framed image, header, and subtitle."

const Schema = z.object({
  title: z.string().min(8).max(48).default("Cliquez pour modifier le titre 4").meta({
    description: "Main title text. Max 8 words",
  }),
  subtitle: z.string().min(10).max(120).default("Cliquez pour modifier le sous-titre").meta({
    description: "Subtitle text. Max 20 words",
  }),
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "framed picture with sun and mountains, flat illustration style",
  }).meta({
    description: "Framed supporting image for the left column. Max 30 words",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(4).default("20").meta({
      description: "Slide number text",
    }),
    presentationName: z.string().min(3).max(60).default("Nom de la présentation").meta({
      description: "Presentation name in footer. Max 6 words",
    }),
    footerIcon: IconSchema.default({
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    }).meta({
      description: "Footer icon placeholder object",
    }),
  }).default({
    slideNumber: "20",
    presentationName: "Nom de la présentation",
    footerIcon: {
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    },
  }).meta({
    description: "Footer data including slide number, presentation name, and icon",
  }),
})

type FramedImageTitleSubtitleSlideData = z.infer<typeof Schema>

interface FramedImageTitleSubtitleLayoutProps {
  data?: Partial<FramedImageTitleSubtitleSlideData>
}

const dynamicSlideLayout: React.FC<FramedImageTitleSubtitleLayoutProps> = ({ data: slideData }) => {
  const footer = slideData?.footer || {
    slideNumber: "20",
    presentationName: "Nom de la présentation",
    footerIcon: { __icon_url__: "", __icon_prompt__: "circle i footer replacement" },
  }

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="h-full w-full grid grid-cols-12 gap-6 px-[56px] py-[40px] items-start">
          <div className="col-span-6 flex items-center justify-center">
            <div className="box-border border-[8px] border-[#333333] w-[537px] h-[597px] flex items-center justify-center">
              <div className="box-border border-[6px] border-[#7d7d7d] w-[505px] h-[565px] bg-white flex items-center justify-center">
                <img src={slideData?.image?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"} alt={slideData?.image?.__image_prompt__ || ""} className="w-[477px] h-[537px] object-cover" />
              </div>
            </div>
          </div>

          <div className="col-span-6 flex flex-col justify-start pl-8">
            <div dangerouslySetInnerHTML={{ __html: "<!-- Title capacity: min 8 chars, max 48 chars. Max words: 8 -->" }} />
            <h1 className="font-['Tahoma'] text-[46px] leading-[1.02] text-[#2a1449] mb-2">
              {slideData?.title || "Cliquez pour modifier le titre 4"}
            </h1>

            <div dangerouslySetInnerHTML={{ __html: "<!-- Subtitle capacity: min 10 chars, max 120 chars. Max words: 20 -->" }} />
            <div className="font-['Tahoma'] text-[24px] leading-[1.15] text-[#111111] mb-6">
              {slideData?.subtitle || "Cliquez pour modifier le sous-titre"}
            </div>

            <div className="flex-1" />
          </div>
        </div>

        <div className="absolute left-6 bottom-6 flex items-center gap-4 text-[#2a1449]">
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.footer?.slideNumber || footer.slideNumber}</div>
          <div className="w-[1px] h-[14px] bg-[#2a1449]/30"></div>
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.footer?.presentationName || footer.presentationName}</div>
        </div>

        <div className="absolute right-6 bottom-6 flex items-center">
          <div className="w-[120px] flex items-center justify-end">
            <div className="w-[36px] h-[36px] rounded-full bg-[#2a1449] flex items-center justify-center text-white font-['Tahoma'] text-[18px]">i</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }