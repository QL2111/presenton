import * as React from 'react';
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg").meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().min(3).max(120).default("abstract colorful background placeholder image").meta({
    description: "Prompt used to generate the image. Max 30 words",
  }),
})

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_prompt__: z.string().min(3).max(80).default("circle i footer replacement").meta({
    description: "Prompt used to describe or generate the icon. Max 10 words",
  }),
})

const layoutId = "background-top-headings-title-footer-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a background image, overlay, top headings, large title block, and footer."

const TopHeadingSchema = z.object({
  text: z.string().min(10).max(30).default("Modifiez texte").meta({
    description: "Top row heading text. Max 5 words",
  }),
})

const Schema = z.object({
  backgroundImage: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "abstract colorful background placeholder image",
  }).meta({
    description: "Full-bleed background image. Use placeholder as fallback",
  }),
  topHeadings: z.array(TopHeadingSchema).min(3).max(3).default([
    { text: "Modifiez texte" },
    { text: "Modifiez texte" },
    { text: "Modifiez texte" },
  ]).meta({
    description: "Three headings in the top row",
  }),
  titleLines: z.array(z.string().min(6).max(20)).min(1).max(4).default([
    "Notre",
    "Mission",
  ]).meta({
    description: "Large title lines rendered as block lines. Max 4 lines",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(4).default("26").meta({
      description: "Slide number text",
    }),
    presentationName: z.string().min(10).max(40).default("Nom de la présentation").meta({
      description: "Presentation name in footer. Max 6 words",
    }),
    footerIcon: IconSchema.default({
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    }).meta({
      description: "Footer icon placeholder object",
    }),
  }).default({
    slideNumber: "26",
    presentationName: "Nom de la présentation",
    footerIcon: {
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    },
  }).meta({
    description: "Footer data including slide number, presentation name, and icon",
  }),
})

type BackgroundTopHeadingsTitleFooterSlideData = z.infer<typeof Schema>

interface BackgroundTopHeadingsTitleFooterLayoutProps {
  data?: Partial<BackgroundTopHeadingsTitleFooterSlideData>
}

const dynamicSlideLayout: React.FC<BackgroundTopHeadingsTitleFooterLayoutProps> = ({ data: slideData }) => {
  const bg = slideData?.backgroundImage || {
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "abstract colorful background placeholder image",
  }
  const topHeadings = slideData?.topHeadings || [
    { text: "Modifiez texte" },
    { text: "Modifiez texte" },
    { text: "Modifiez texte" },
  ]
  const titleLines = slideData?.titleLines || ["Notre", "Mission"]
  const footer = slideData?.footer || {
    slideNumber: "26",
    presentationName: "Nom de la présentation",
    footerIcon: { __icon_url__: "", __icon_prompt__: "circle i footer replacement" },
  }

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img src={bg?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"} alt={bg?.__image_prompt__ || "background"} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.15)]"></div>

        <div className="relative z-10 w-full h-full">
          <div dangerouslySetInnerHTML={{ __html: "<!-- Top headings capacity: each min 10 chars, max 30 chars. Max words: 5 -->" }} />
          <div className="flex justify-between items-start px-[60px] pt-[100px] pr-[60px]">
            {topHeadings.map((h, i) => (
              <div key={i} className="flex flex-col items-start">
                <div className="text-white font-['Tahoma'] font-semibold text-[24px] leading-[28px]">
                  {h?.text || ""}
                </div>
                <div className="w-[36px] h-[4px] bg-white mt-[8px] rounded-sm"></div>
              </div>
            ))}
          </div>

          <div className="px-[60px] mt-[235px] max-w-[1164px]">
            <div dangerouslySetInnerHTML={{ __html: "<!-- Large title capacity: min 6 chars, max 20 chars total. Split across lines. -->" }} />
            <h1 className="text-white font-['Tahoma'] font-normal text-[128px] leading-[120px] tracking-tight break-words">
              {titleLines.map((line, idx) => (
                <span key={idx} className="block">{line || ""}</span>
              ))}
            </h1>
          </div>

          <div className="absolute left-0 bottom-0 w-full flex items-center justify-between px-[60px] pb-[18px]">
            <div className="flex items-center space-x-4 text-white">
              <div dangerouslySetInnerHTML={{ __html: "<!-- Slide number capacity: min 1 char, max 4 chars -->" }} />
              <div className="text-[11px] font-['Tahoma']">{slideData?.footer?.slideNumber || footer.slideNumber}</div>
              <div className="h-[12px] border-l border-white/60"></div>
              <div dangerouslySetInnerHTML={{ __html: "<!-- Presentation name capacity: min 10 chars, max 40 chars. Max words: 6 -->" }} />
              <div className="text-[11px] font-['Times New Roman']">{slideData?.footer?.presentationName || footer.presentationName}</div>
            </div>

            <div className="flex items-center">
              <div className="w-[84px] h-[32px] flex items-center justify-end">
                <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-white text-[#d02828] font-['Tahoma'] text-[28px]">i</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }