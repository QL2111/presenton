import * as React from 'react';
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.string().url().meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().meta({
    description: "Prompt used to generate or describe the image. Max 30 words",
  }).min(5).max(120),
})

const IconSchema = z.object({
  __icon_url__: z.string().meta({
    description: "URL to icon",
  }),
  __icon_prompt__: z.string().meta({
    description: "Prompt used to describe or generate the icon. Max 10 words",
  }).min(1).max(40),
})

const layoutId = "header-metric-background-footer-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, large metric elements, a background image, and footer"

const Schema = z.object({
  backgroundImage: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "background placeholder image"
  }).meta({
    description: "Background image for the bottom area",
    maxWords: 10
  }),
  title: z.string().min(40).max(110).default("Modifiez le texte de mise en avant\nLorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nBlanc & dégradé").meta({
    description: "Header text, may include line breaks",
    maxWords: 20
  }),
  topBigNumber: z.string().min(1).max(4).default("XX").meta({
    description: "Top-right large numeric metric (no percent sign)",
    maxWords: 1
  }),
  topPercent: z.string().min(1).max(1).default("%").meta({
    description: "Top-right percent sign (single character)",
    maxWords: 1
  }),
  bottomBigNumber: z.string().min(1).max(4).default("XX").meta({
    description: "Bottom large numeric metric displayed on gradient",
    maxWords: 1
  }),
  bottomPercent: z.string().min(1).max(1).default("%").meta({
    description: "Bottom percent sign (single character)",
    maxWords: 1
  }),
  slideNumber: z.string().min(1).max(3).default("42").meta({
    description: "Slide number shown in footer",
    maxWords: 1
  }),
  presentationName: z.string().min(10).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer",
    maxWords: 6
  }),
  brandIcon: IconSchema.default({
    __icon_url__: "",
    __icon_prompt__: "brand circle with i"
  }).meta({
    description: "Brand replacement icon represented as a circle with 'i'"
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const titleLines = String(slideData?.title || "Modifiez le texte de mise en avant\nLorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nBlanc & dégradé").split("\n")

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img
          src={slideData?.backgroundImage?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"}
          alt={slideData?.backgroundImage?.__image_prompt__ || ""}
          className="absolute left-0 right-0 bottom-0 h-[460px] object-cover -z-10"
        />

        <div className="h-[260px] grid" style={{ gridTemplateColumns: "725px 1fr" }}>
          <div className="flex items-start">
            <div className="pt-[43px] pl-[64px] pr-4">
              {/* Title capacity: min 40 chars, max 110 chars */}
              <h1 className="text-[48px] leading-[56px] font-['Tahoma'] text-[#2a1449] max-w-[725px]">
                {titleLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < titleLines.length - 1 ? <br /> : null}
                  </React.Fragment>
                ))}
              </h1>
            </div>
          </div>

          <div className="flex items-start justify-center pr-[48px]">
            <div className="pt-[48px] flex items-start space-x-6">
              {/* Big number capacity: min 1 char, max 4 chars */}
              <div className="text-[200px] leading-[1] font-['Tahoma'] text-[#4d1d82]">
                {slideData?.topBigNumber || "XX"}
              </div>
              {/* Percent sign capacity: exactly 1 char */}
              <div className="text-[128px] leading-[1] font-['Tahoma'] text-[#4d1d82]">
                {slideData?.topPercent || "%"}
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[460px] w-full grid" style={{ gridTemplateColumns: "810px 1fr" }}>
          <div></div>

          <div className="flex items-center justify-start pr-[120px]">
            <div className="flex items-baseline space-x-6">
              {/* Bottom big number capacity: min 1 char, max 4 chars */}
              <div className="text-[200px] leading-[1] font-['Tahoma'] text-white">
                {slideData?.bottomBigNumber || "XX"}
              </div>
              {/* Bottom percent capacity: exactly 1 char */}
              <div className="text-[128px] leading-[1] font-['Tahoma'] text-white">
                {slideData?.bottomPercent || "%"}
              </div>
            </div>
          </div>

          <div className="absolute left-0 right-0 bottom-0 flex items-end justify-between pb-[20px]">
            <div className="flex items-center pl-[123px]">
              {/* Slide number capacity: 1-3 chars */}
              <div className="text-[11px] leading-[12px] font-['Tahoma'] text-white/90 mr-4">
                {slideData?.slideNumber || "42"}
              </div>
              <div className="h-[12px] border-l border-white/40 mr-4"></div>
              {/* Footer title capacity: min 10 chars, max 40 chars */}
              <div className="text-[11px] leading-[12px] font-['Times New Roman'] text-white/90">
                {slideData?.presentationName || "Nom de la présentation"}
              </div>
            </div>

            <div className="pr-[48px]">
              <div className="w-[120px] h-[36px] rounded-full bg-white flex items-center justify-center">
                <span className="text-[18px] font-['Tahoma'] text-[#4d1d82]">i</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title capacity: min 40 chars, max 110 chars */}
        {/* Big number capacity: min 1 char, max 4 chars */}
        {/* Percent sign capacity: exactly 1 char */}
        {/* Slide number capacity: 1-3 chars */}
        {/* Footer title capacity: min 10 chars, max 40 chars */}
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }