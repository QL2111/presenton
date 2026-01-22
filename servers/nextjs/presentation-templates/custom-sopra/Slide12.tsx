import * as React from 'react';
import { z } from 'zod'

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_query__: z.string().min(1).max(10).default("i").meta({
    description: "Query used to search the icon. Max 3 words",
  }),
})

const ColumnSchema = z.object({
  number: z.string().min(1).max(2).default("01").meta({
    description: "Large numeric label for the column. Capacity: 2 characters (numeric)",
  }),
  caption: z.string().min(20).max(80).default("Cliquez pour modifier\nle titre du chapitre 1").meta({
    description: "Caption text under the number. Max 12 words",
  }),
})

const layoutId = "summary-four-column-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a heading, full-width rule, subtitle, and four column summary cards."

const Schema = z.object({
  heading: z.string().min(6).max(24).default("Sommaire").meta({
    description: "Main heading text. Max 6 words",
  }),
  subtitle: z.string().min(10).max(60).default("Cliquez pour modifier le titre").meta({
    description: "Subtitle text under the heading. Max 10 words",
  }),
  columns: z.array(ColumnSchema).min(4).max(4).default([
    {
      number: "01",
      caption: "Cliquez pour modifier\nle titre du chapitre 1",
    },
    {
      number: "02",
      caption: "Cliquez pour modifier\nle titre du chapitre 2",
    },
    {
      number: "03",
      caption: "Cliquez pour modifier\nle titre du chapitre 3",
    },
    {
      number: "04",
      caption: "Cliquez pour modifier\nle titre du chapitre 4",
    },
  ]).meta({
    description: "Four summary columns with numeric label and caption.",
  }),
  pageNumber: z.string().min(1).max(4).default("12").meta({
    description: "Slide page number text. Max 4 characters",
  }),
  presentationName: z.string().min(5).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer. Max 6 words",
  }),
  logo: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "i",
  }).meta({
    description: "Footer logo replaced with circle 'i'.",
  }),
})

type SummaryFourColumnSlideData = z.infer<typeof Schema>

interface SummaryFourColumnLayoutProps {
  data?: Partial<SummaryFourColumnSlideData>
}

const dynamicSlideLayout: React.FC<SummaryFourColumnLayoutProps> = ({ data: slideData }) => {
  const cols = slideData?.columns || []
  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="w-full h-full px-12 py-8">
          <div className="max-w-full">
            {/* Text capacity: min 6 chars, max 24 chars */}
            <h1 className="font-['Tahoma'] text-[#2a1449] text-[73px] leading-tight">
              {slideData?.heading || "Sommaire"}
            </h1>

            <div className="mt-4 h-[4px] bg-[#6b1f6d] w-full"></div>

            {/* Text capacity: min 10 chars, max 60 chars */}
            <div className="mt-6">
              <div className="font-['Tahoma'] text-[27px] font-semibold text-black">
                {slideData?.subtitle || "Cliquez pour modifier le titre"}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-4 gap-x-8 gap-y-6">
            {(cols.length === 4 ? cols : [
              { number: "01", caption: "Cliquez pour modifier\nle titre du chapitre 1" },
              { number: "02", caption: "Cliquez pour modifier\nle titre du chapitre 2" },
              { number: "03", caption: "Cliquez pour modifier\nle titre du chapitre 3" },
              { number: "04", caption: "Cliquez pour modifier\nle titre du chapitre 4" },
            ]).map((col, idx) => (
              <div key={idx} className="flex flex-col items-start">
                {/* Capacity: 2 characters (numeric) */}
                <div className="font-['Tahoma'] text-[#2a1449] text-[108px] font-bold leading-none">
                  {col?.number}
                </div>

                <div className="mt-4 w-[56px] h-[4px] bg-[#6b1f6d]"></div>

                {/* Text capacity: min 20 chars, max 80 chars */}
                <p className="mt-4 font-['Tahoma'] text-[20px] text-[#111] max-w-[260px] leading-snug">
                  {col?.caption?.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < (col.caption?.split("\n").length || 0) - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="font-['Tahoma'] text-[12px] text-[#2a1449]">
              {slideData?.pageNumber || "12"}
            </div>
            <div className="h-[18px] w-px bg-[#6b5a6b]"></div>
            <div className="font-['Tahoma'] text-[12px] text-[#4b3a4b]">
              {slideData?.presentationName || "Nom de la présentation"}
            </div>
          </div>

          <div className="flex items-center gap-4">
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

        <div className="absolute bottom-0 left-0 w-full h-[18px] bg-gradient-to-r from-[#c8142f] via-[#d65a2b] to-[#f07d00]"></div>
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }