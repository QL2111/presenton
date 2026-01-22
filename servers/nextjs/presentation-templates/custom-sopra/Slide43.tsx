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

const layoutId = "header-image-quote-panel-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, left image and name, and right paragraphs with decorative quotes and footer"

const Schema = z.object({
  title: z.string().min(20).max(70).default("Modifiez le style du titre").meta({
    description: "Header title text. Max ~12 words",
    maxWords: 12,
  }),
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "portrait placeholder image"
  }).meta({
    description: "Image shown within framed block on the left",
    maxWords: 10,
  }),
  personName: z.string().min(6).max(24).default("Prénom Nom").meta({
    description: "Person's name displayed below the image",
    maxWords: 4,
  }),
  personRole: z.string().min(6).max(40).default("Poste").meta({
    description: "Person's role or title",
    maxWords: 6,
  }),
  heading: z.string().min(6).max(40).default("Modifiez le texte").meta({
    description: "Small purple heading next to decorative quotes",
    maxWords: 6,
  }),
  paragraphs: z.array(z.string().min(200).max(600).default("Referente praesente inclitis ministro parietes timebantur susurrasset inclitis in interdum ut Marcio aurem acciderat imperator aurem siquid referente ideoque disceret arcanorum in arcanorum postridie postridie ideoque referente in disceret uxori timebantur arcanorum parietes postridie quondam arcanorum referente siquid inclitis Marcio.")).min(1).max(4).default([
    "Referente praesente inclitis ministro parietes timebantur susurrasset inclitis in interdum ut Marcio aurem acciderat imperator aurem siquid referente ideoque disceret arcanorum in arcanorum postridie postridie ideoque referente in disceret uxori timebantur arcanorum parietes postridie quondam arcanorum referente siquid inclitis Marcio.",
    "Referente praesente inclitis ministro parietes timebantur susurrasset inclitis in interdum ut Marcio aurem acciderat imperator aurem siquid referente ideoque disceret arcanorum in arcanorum postridie postridie ideoque referente in disceret uxori timebantur arcanorum parietes postridie quondam arcanorum referente siquid inclitis Marcio."
  ]).meta({
    description: "Main paragraphs content in italic. Top-level conservative min 200 max 600 chars each.",
    maxWords: 250,
  }),
  slideNumber: z.string().min(1).max(3).default("43").meta({
    description: "Slide number shown in footer",
    maxWords: 1,
  }),
  presentationName: z.string().min(10).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer",
    maxWords: 6,
  }),
  brandIcon: IconSchema.default({
    __icon_url__: "",
    __icon_prompt__: "brand circle with i"
  }).meta({
    description: "Brand replacement icon represented as a circle with 'i'",
    maxWords: 4,
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const paragraphs = slideData?.paragraphs || []
  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="absolute left-0 right-0 bottom-0 h-[28px] bg-gradient-to-r from-[#b92a2a] via-[#e07a1f] to-[#f1b233] -z-0"></div>

        <div className="grid grid-cols-[360px_1fr] h-full">
          {/* LEFT COLUMN: image + name */}
          <div className="flex flex-col pl-[64px] pt-[40px]">
            {/* Title capacity: min 20 chars, max 70 chars */}
            <h1 className="text-[45px] leading-[52px] font-['Tahoma'] text-[#2a1449] max-w-[640px]">
              {slideData?.title || "Modifiez le style du titre"}
            </h1>

            <div className="mt-[48px]">
              <div className="w-[285px] h-[352px] border-[6px] border-[#3a3a3a] bg-white flex items-center justify-center">
                <div className="w-[255px] h-[322px] border-[4px] border-[#9a9a9a] bg-white flex items-center justify-center">
                  <img
                    src={slideData?.image?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"}
                    alt={slideData?.image?.__image_prompt__ || ""}
                    className="w-[231px] h-[296px] object-cover"
                  />
                </div>
              </div>

              <div className="mt-[20px]">
                <div className="text-[24px] leading-[28px] font-['Tahoma'] font-semibold text-[#4d1d82]">
                  {slideData?.personName || "Prénom Nom"}
                </div>
                <div className="text-[24px] leading-[28px] font-['Tahoma'] text-[#2a1449] mt-1">
                  {slideData?.personRole || "Poste"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: quote header + paragraphs + decorative quotes + footer brand */}
          <div className="relative pr-[64px] pt-[140px] pb-[40px]">
            <div className="max-w-[740px]">
              <div className="flex items-center gap-4">
                <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-2">
                  <rect x="0" y="8" width="12" height="20" rx="1" transform="skewX(-15)" fill="#4d1d82"/>
                  <rect x="16" y="8" width="12" height="20" rx="1" transform="skewX(-15)" fill="#4d1d82"/>
                </svg>

                <div>
                  <div className="text-[24px] leading-[28px] font-['Tahoma'] font-semibold text-[#4d1d82]">
                    {slideData?.heading || "Modifiez le texte"}
                  </div>
                  <div className="w-[36px] h-[3px] bg-[#4d1d82] mt-2"></div>
                </div>
              </div>

              <div className="mt-6 text-[24px] leading-[1.45] font-['Arial'] italic text-[#000000]">
                {paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "" : "mt-6"}>
                    {p || ""}
                  </p>
                ))}
              </div>
            </div>

            <div className="absolute right-0 bottom-[150px]">
              <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="12" width="18" height="36" rx="2" transform="skewX(15)" fill="#9e2f85"/>
                <rect x="22" y="12" width="18" height="36" rx="2" transform="skewX(15)" fill="#9e2f85"/>
              </svg>
            </div>

            <div className="absolute left-0 bottom-0 w-full flex items-end justify-between pb-[20px] pl-[64px] pr-[64px]">
              <div className="flex items-center gap-4">
                <div className="text-[11px] leading-[12px] font-['Tahoma'] text-[#2a1449]">
                  {slideData?.slideNumber || "43"}
                </div>
                <div className="h-[12px] border-l border-[#c8c8c8]"></div>
                <div className="text-[11px] leading-[12px] font-['Times New Roman'] text-[#2a1449]">
                  {slideData?.presentationName || "Nom de la présentation"}
                </div>
              </div>

              <div>
                <div className="w-[120px] h-[36px] rounded-full bg-white flex items-center justify-center">
                  <span className="text-[18px] font-['Tahoma'] text-[#4d1d82]">i</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title capacity: min 20 chars, max 70 chars */}
        {/* Image block size ~285x352px */}
        {/* Name capacity: min 6 chars, max 24 chars */}
        {/* Role capacity: min 6 chars, max 40 chars */}
        {/* Paragraph capacity each: min 200 chars, max 600 chars */}
        {/* Slide number capacity: 1-3 chars */}
        {/* Presentation name capacity: min 10 chars, max 40 chars */}
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }