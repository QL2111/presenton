import * as React from 'react';
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.string().url().meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().meta({
    description: "Prompt used to generate the image. Max 30 words",
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

const layoutId = "header-subtitle-columns-thumbnail-cards-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, subtitle, columns each with a thumbnail and card with nested bullets"

const Schema = z.object({
  title: z.string().min(10).max(60).default("Cliquez pour modifier le titre 15").meta({
    description: "Main title text. Max 8 words",
  }),
  subtitle: z.string().min(10).max(80).default("Cliquez pour modifier le sous-titre").meta({
    description: "Subtitle text under the title. Max 12 words",
  }),
  columns: z.array(z.object({
    thumbnail: ImageSchema.default({
      __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
      __image_prompt__: "placeholder thumbnail image"
    }).meta({
      description: "Thumbnail image for the column",
    }),
    cardTitle: z.string().min(6).max(40).default("Cliquez pour modifier le texte").meta({
      description: "Card title displayed at top of card. Max 6 words",
    }),
    bullets: z.array(z.string().min(2).max(120).default("")).min(2).max(6).default([
      "Deuxième niveau",
      "Troisième niveau",
      "Quatrième niveau"
    ]).meta({
      description: "List of bullet lines for the card. Max 6 items",
    })
  })).min(1).max(5).default([
    {
      thumbnail: {
        __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        __image_prompt__: "placeholder thumbnail image"
      },
      cardTitle: "Cliquez pour modifier le texte",
      bullets: ["Deuxième niveau", "Troisième niveau", "Quatrième niveau"]
    },
    {
      thumbnail: {
        __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        __image_prompt__: "placeholder thumbnail image"
      },
      cardTitle: "Cliquez pour modifier le texte",
      bullets: ["Deuxième niveau", "Troisième niveau", "Quatrième niveau"]
    },
    {
      thumbnail: {
        __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        __image_prompt__: "placeholder thumbnail image"
      },
      cardTitle: "Cliquez pour modifier le texte",
      bullets: ["Deuxième niveau", "Troisième niveau", "Quatrième niveau"]
    },
    {
      thumbnail: {
        __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        __image_prompt__: "placeholder thumbnail image"
      },
      cardTitle: "Cliquez pour modifier le texte",
      bullets: ["Deuxième niveau", "Troisième niveau", "Quatrième niveau"]
    },
    {
      thumbnail: {
        __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        __image_prompt__: "placeholder thumbnail image"
      },
      cardTitle: "Cliquez pour modifier le texte",
      bullets: ["Deuxième niveau", "Troisième niveau", "Quatrième niveau"]
    }
  ]).meta({
    description: "Columns each containing a thumbnail and a card with bullets. Max 5 columns",
  }),
  slideNumber: z.string().min(1).max(4).default("30").meta({
    description: "Slide number shown in footer. Max 4 chars",
  }),
  presentationName: z.string().min(3).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer. Max 6 words",
  }),
  brandIcon: IconSchema.default({
    __icon_url__: "",
    __icon_prompt__: "brand circle with i"
  }).meta({
    description: "Brand replacement icon represented as a circle with 'i'",
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const columns = slideData?.columns || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="w-full h-full relative">

          {/* Title block */}
          {/* Title capacity: min 10 chars, max 60 chars */}
          <div className="px-[60px] pt-[42px]">
            <h1 className="m-0 font-['Tahoma'] text-[#2a1449] text-[45px] leading-[48px]">
              {slideData?.title || "Cliquez pour modifier le titre 15"}
            </h1>

            {/* Subtitle capacity: min 10 chars, max 80 chars */}
            <p className="mt-[8px] font-['Tahoma'] text-[24px] leading-[28px] text-[#000000]">
              {slideData?.subtitle || "Cliquez pour modifier le sous-titre"}
            </p>
          </div>

          {/* Columns area */}
          <div className="px-[60px] mt-[86px]">
            <div className="grid grid-cols-5 gap-x-[28px]">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col items-center">
                  <div className="w-[219px] h-[115px] rounded-sm overflow-hidden border border-[#cfc9d6] shadow-[0_6px_6px_rgba(0,0,0,0.12)]">
                    <img
                      src={col?.thumbnail?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"}
                      alt={col?.thumbnail?.__image_prompt__ || "thumbnail"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-[219px] h-[12px] mt-[-6px] rounded-b-md bg-gradient-to-b from-[#efe9f6] to-[#ffffff]"></div>

                  <div className="w-[219px] bg-white border border-[#f0e6ef] rounded-[10px] mt-[18px] p-[22px] box-border min-h-[360px] shadow-sm">
                    {/* Card title capacity: min 6 chars, max 40 chars */}
                    <div className="flex items-start gap-x-3 mb-[12px]">
                      <span className="mt-1 inline-block w-[8px] h-[8px] rounded-full bg-[#cf022b]"></span>
                      <span className="font-['Tahoma'] text-[16px] leading-[20px] text-[#000000]">
                        {col?.cardTitle || "Cliquez pour modifier le texte"}
                      </span>
                    </div>

                    {/* Bullets capacity: min 2, max 6 */}
                    {(col?.bullets || []).slice(0, 6).map((b, idx) => {
                      const indentClass = idx === 0 ? "ml-[20px] list-disc font-['Tahoma'] text-[14px] leading-[20px] mb-[10px]" : idx === 1 ? "ml-[40px] list-disc font-['Tahoma'] text-[12px] leading-[18px] mb-[8px]" : "ml-[60px] list-disc font-['Tahoma'] text-[11px] leading-[16px]"
                      return (
                        <div key={idx} className={indentClass}>
                          {b || ""}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer left */}
          <div className="absolute left-[60px] bottom-[18px] flex items-center gap-[16px]">
            <div className="font-['Tahoma'] text-[11px]">{slideData?.slideNumber || "30"}</div>
            <div className="h-[14px] border-l border-[#d9d5df]"></div>
            <div className="font-['Times New Roman'] text-[11px]">{slideData?.presentationName || "Nom de la présentation"}</div>
          </div>

          {/* Bottom-right brand replacement */}
          <div className="absolute right-[60px] bottom-[6px]">
            <div className="w-[96px] flex items-center justify-end">
              <div className="w-[56px] h-[56px] rounded-full bg-white flex items-center justify-center text-[#cf022b] font-['Tahoma'] text-[28px]">
                i
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