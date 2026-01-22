import React from 'react'
import { z } from 'zod'

const IconSchema = z.object({
  __icon_url__: z.string().default("/static/icons/placeholder.png").meta({
    description: "URL to icon",
  }),
  __icon_query__: z.string().min(1).max(30).default("i").meta({
    description: "Query used to search the icon. Max 3 words",
  }),
})

const layoutId = "center-right-title-footer-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a center-right title block, underline, subtitle, decorative stripe, and footer with tagline and logo circle."

const Schema = z.object({
  title: z.string().min(20).max(60).default("Cliquez pour\nmodifier le titre de\nla présentation 3").meta({
    description: "Main title text. Max 10 words",
  }),
  subtitle: z.string().min(30).max(100).default("Cliquez pour modifier le sous-titre de la présentation").meta({
    description: "Subtitle text. Max 20 words",
  }),
  tagline: z.string().min(10).max(60).default("The world is how we shape it*").meta({
    description: "Footer tagline text. Max 12 words",
  }),
  logo: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "i",
  }).meta({
    description: "Footer logo/icon replaced with circle 'i'.",
  }),
})

type CenterRightTitleFooterSlideData = z.infer<typeof Schema>

interface CenterRightTitleFooterLayoutProps {
  data?: Partial<CenterRightTitleFooterSlideData>
}

const dynamicSlideLayout: React.FC<CenterRightTitleFooterLayoutProps> = ({ data: slideData }) => {
  const titleLines = slideData?.title?.split("\n") || ["Cliquez pour", "modifier le titre de", "la présentation 3"]
  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        {/* Background gradient (full-bleed) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5a1983] via-[#c8183e] to-[#f07d00]"></div>

        {/* Center-right title block (uses flex layout to avoid unnecessary absolute where possible) */}
        <div className="relative z-10 w-full h-full flex items-center justify-end px-12">
          <div className="w-[560px]">
            {/* <!-- Text capacity: min 20 chars, max 60 chars --> */}
            <h1 className="font-['Tahoma'] text-white text-[53px] leading-[1.02] font-bold">
              {titleLines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>

            {/* White underline (thin) matching slide visual */}
            <div className="mt-6 h-[4px] bg-white w-full"></div>

            {/* <!-- Text capacity: min 30 chars, max 100 chars --> */}
            <p className="mt-4 font-['Tahoma'] text-[24px] text-white leading-snug">
              {slideData?.subtitle || "Cliquez pour modifier le sous-titre de la présentation"}
            </p>
          </div>
        </div>

        {/* Bottom decorative stripe + footer */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* thin brand gradient stripe */}
          <div className="h-[14px] bg-gradient-to-r from-[#c8142f] via-[#d65a2b] to-[#f07d00]"></div>

          {/* white footer area with tagline left + logo (circle i) right */}
          <div className="bg-white h-[92px] flex items-center justify-between px-10">
            {/* <!-- Text capacity: min 10 chars, max 60 chars --> */}
            <div className="font-['Tahoma'] text-[16px] text-[#c8142f]">
              {slideData?.tagline || "The world is how we shape it*"}
            </div>
            <div className="flex items-center">
              {slideData?.logo?.__icon_url__ ? (
                <img
                  src={slideData?.logo?.__icon_url__}
                  alt={slideData?.logo?.__icon_query__ || "logo"}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#2b2540] flex items-center justify-center text-white font-['Tahoma'] text-[18px]">
                  {slideData?.logo?.__icon_query__ || "i"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }