import * as React from 'react';
import { z } from 'zod'

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
    maxWords: 0,
  }),
  __icon_query__: z.string().min(1).max(10).default("i").meta({
    description: "Query used to search the icon. Max 3 words",
    maxWords: 3,
  }),
})

const ColumnSchema = z.object({
  number: z.string().min(1).max(2).default("XX").meta({
    description: "Large numeric or label text for the column. Capacity: 2 characters",
    maxWords: 2,
  }),
  caption: z.string().min(10).max(80).default("Cliquez pour\nmodifier le titre").meta({
    description: "Caption text under the number. Max 12 words",
    maxWords: 12,
  }),
})

const layoutId = "summary-six-column-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a heading, full-width rule, subtitle, and six column items."

const Schema = z.object({
  heading: z.string().min(6).max(24).default("Sommaire 2").meta({
    description: "Main heading text. Max 6 words",
    maxWords: 6,
  }),
  subtitle: z.string().min(10).max(60).default("Cliquez pour modifier le titre").meta({
    description: "Subtitle text under the heading. Max 10 words",
    maxWords: 10,
  }),
  items: z.array(ColumnSchema).min(6).max(6).default([
    { number: "XX", caption: "Cliquez pour\nmodifier le titre" },
    { number: "XX", caption: "Cliquez pour\nmodifier le titre" },
    { number: "XX", caption: "Cliquez pour\nmodifier le titre" },
    { number: "XX", caption: "Cliquez pour\nmodifier le titre" },
    { number: "XX", caption: "Cliquez pour\nmodifier le titre" },
    { number: "XX", caption: "Cliquez pour\nmodifier le titre" },
  ]).meta({
    description: "Six grid items each with a large label and a caption.",
    maxWords: 12,
  }),
  pageNumber: z.string().min(1).max(4).default("13").meta({
    description: "Slide page number text. Max 4 characters",
    maxWords: 1,
  }),
  presentationName: z.string().min(5).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer. Max 6 words",
    maxWords: 6,
  }),
  logo: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "i",
  }).meta({
    description: "Footer logo replaced with circle 'i'.",
    maxWords: 1,
  }),
})

type SummarySixColumnSlideData = z.infer<typeof Schema>

interface SummarySixColumnLayoutProps {
  data?: Partial<SummarySixColumnSlideData>
}

const dynamicSlideLayout: React.FC<SummarySixColumnLayoutProps> = ({ data: slideData }) => {
  // Always get items as array, using Zod's parse(undefined) for default
  const items: { number: string; caption: string }[] =
    slideData?.items && slideData?.items.length === 6
      ? slideData.items
      : Schema.shape.items.parse(undefined);
  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="w-full h-full px-10 py-8">
          <div className="max-w-full">
            <h1 className="font-['Tahoma'] text-[#2a1449] text-[72px] leading-tight">
              {slideData?.heading || "Sommaire 2"}
            </h1>
            <div className="mt-4 h-[4px] bg-[#6b1f6d] w-full"></div>
            <div className="mt-6">
              <div className="font-['Tahoma'] text-[27px] font-semibold text-black">
                {slideData?.subtitle || "Cliquez pour modifier le titre"}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-6 gap-x-8 gap-y-8">
            {items.map((col: { number: string; caption: string }, idx: number) => (
              <div key={idx} className="flex flex-col items-start">
                <div className="font-['Tahoma'] text-[#2a1449] text-[72px] font-semibold leading-none">
                  {col?.number}
                </div>
                <div className="mt-4 w-[56px] h-[4px] bg-[#6b1f6d]"></div>
                <p className="mt-4 font-['Tahoma'] text-[20px] text-[#111] leading-snug max-w-[220px]">
                  {(col?.caption || "Cliquez pour\nmodifier le titre").split("\n").map((line: string, i: number, arr: string[]) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 ? <br /> : null}
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
              {slideData?.pageNumber || "13"}
            </div>
            <div className="h-[18px] w-px bg-[#6b5a6b]"></div>
            <div className="font-['Tahoma'] text-[12px] text-[#4b3a4b]">
              {slideData?.presentationName || "Nom de la présentation"}
            </div>
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

        <div className="absolute bottom-0 left-0 w-full h-[18px] bg-gradient-to-r from-[#c8142f] via-[#d65a2b] to-[#f07d00]"></div>
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }