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

const layoutId = "hero-background-metric-text-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a background image, header text, a large metric, and a supporting text panel"

const Schema = z.object({
  backgroundImage: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "gradient background placeholder photo"
  }).meta({
    description: "Background image for the slide",
    maxWords: 10
  }),
  title: z.string().min(40).max(110).default("Modifier le texte de mise en avant\nLorem ipsum dolor sit amet,\nconsectetur adipiscing elit. Dégradé").meta({
    description: "Main header text, may contain line breaks. Max ~20 words",
    maxWords: 20
  }),
  bigNumber: z.string().min(1).max(4).default("XX").meta({
    description: "Large numeric metric displayed prominently (no percent sign)",
    maxWords: 1
  }),
  percentSign: z.string().min(1).max(1).default("%").meta({
    description: "Percent sign displayed next to the big number",
    maxWords: 1
  }),
  rightSmallHeader: z.string().min(10).max(60).default("Cliquez pour modifier\nles styles du texte du masque").meta({
    description: "Small header text in the right column. Newlines allowed.",
    maxWords: 12
  }),
  rightBody: z.string().min(80).max(300).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit. Mauris in convallis eros aliquet.").meta({
    description: "Supporting body paragraph in the right column",
    maxWords: 60
  }),
  slideNumber: z.string().min(1).max(4).default("41").meta({
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
  const titleText = slideData?.title || "Modifier le texte de mise en avant\nLorem ipsum dolor sit amet,\nconsectetur adipiscing elit. Dégradé"
  const titleLines = String(titleText).split("\n")

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img
          src={slideData?.backgroundImage?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"}
          alt={slideData?.backgroundImage?.__image_prompt__ || ""}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="grid h-full" style={{ gridTemplateColumns: "778px 1fr" }}>
          {/* LEFT COLUMN */}
          <div className="flex flex-col">
            <div className="pt-[86px] pl-[64px] pr-4">
              {/* Title capacity: min 40 chars, max 110 chars */}
              <h1 className="text-[48px] leading-[56px] font-['Tahoma'] text-white max-w-[778px]">
                {titleLines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < titleLines.length - 1 ? <br /> : null}
                  </React.Fragment>
                ))}
              </h1>
            </div>

            <div className="flex-1"></div>

            <div className="pb-[72px] pl-[64px] pr-4">
              <div className="flex items-end space-x-6">
                {/* Big number capacity: min 1 char, max 4 chars */}
                <div className="text-[200px] leading-[1] font-['Tahoma'] text-white -tracking-[0.02em]">
                  {slideData?.bigNumber || "XX"}
                </div>
                {/* Percent sign capacity: exactly 1 char */}
                <div className="text-[128px] leading-[1] font-['Tahoma'] text-white">
                  {slideData?.percentSign || "%"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-end items-start pr-[64px] pb-[48px]">
            <div className="w-[558px] text-white">
              {/* Small header capacity: min 10 chars, max 60 chars */}
              <p className="text-[19px] leading-[1.35] font-['Tahoma'] mb-2 whitespace-pre-line">
                {slideData?.rightSmallHeader || "Cliquez pour modifier\nles styles du texte du masque"}
              </p>

              {/* Body paragraph capacity: min 80 chars, max 300 chars */}
              <p className="text-[19px] leading-[1.35] font-['Tahoma']">
                {slideData?.rightBody || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit. Mauris in convallis eros aliquet."}
              </p>
            </div>

            <div className="w-full flex items-end justify-between mt-6">
              <div className="flex items-center pl-[64px]">
                <div className="text-[11px] leading-[1] font-['Tahoma'] text-white/90 mr-4">
                  {slideData?.slideNumber || "41"}
                </div>
                <div className="h-[12px] border-l border-white/40 mr-4"></div>
                <div className="text-[11px] leading-[1] font-['Times New Roman'] text-white/90">
                  {slideData?.presentationName || "Nom de la présentation"}
                </div>
              </div>

              <div className="pr-[48px]">
                <div className="w-[120px] h-[36px] rounded-full bg-white flex items-center justify-center">
                  <span className="text-[18px] font-['Tahoma'] text-[#e11d2d]">i</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title capacity: min 40 chars, max 110 chars */}
        {/* Small header capacity: min 10 chars, max 60 chars */}
        {/* Body paragraph capacity: min 80 chars, max 300 chars */}
        {/* Big number capacity: min 1 char, max 4 chars */}
        {/* Percent sign capacity: exactly 1 char */}
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }