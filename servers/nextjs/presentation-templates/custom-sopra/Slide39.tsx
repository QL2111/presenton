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

const layoutId = "header-map-metric-panels-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, a large content card, a map panel, and stacked metric panels"

const NestedBulletSchema = z.object({
  text: z.string().min(2).max(120).default("Deuxième niveau").meta({
    description: "Nested bullet text",
    maxWords: 12,
  }),
  children: z.array(z.any()).default([]).meta({
    description: "Child nested bullets",
  })
})

const MainBulletSchema = z.object({
  text: z.string().min(10).max(150).default("Cliquez pour modifier le texte").meta({
    description: "Top level bullet text. Max 25 words",
    maxWords: 25,
  }),
  children: z.array(NestedBulletSchema).min(0).max(4).default([
    {
      text: "Deuxième niveau",
      children: [
        {
          text: "Troisième niveau",
          children: [
            {
              text: "Quatrième niveau",
              children: []
            }
          ]
        }
      ]
    }
  ]).meta({
    description: "Nested children up to three levels",
  })
})

const Schema = z.object({
  title: z.string().min(10).max(60).default("Cliquez pour modifier le titre 27").meta({
    description: "Header title text",
    maxWords: 8
  }),
  subtitle: z.string().min(15).max(120).default("Cliquez pour modifier le sous-titre").meta({
    description: "Subtitle text under the title",
    maxWords: 20
  }),
  mainCard: z.object({
    heading: z.string().min(6).max(30).default("Modifiez texte").meta({
      description: "Main card heading",
      maxWords: 5
    }),
    lead: z.string().min(10).max(80).default("Cliquez pour modifier le texte").meta({
      description: "Lead or h4 text inside the main card",
      maxWords: 12
    }),
    bullets: z.array(MainBulletSchema).min(1).max(4).default([
      {
        text: "Cliquez pour modifier le texte",
        children: [
          {
            text: "Deuxième niveau",
            children: [
              {
                text: "Troisième niveau",
                children: [
                  {
                    text: "Quatrième niveau",
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]).meta({
      description: "Top-level bullets with nested levels. Top-level min 1 max 4",
      maxWords: 50
    })
  }).default({
    heading: "Modifiez texte",
    lead: "Cliquez pour modifier le texte",
    bullets: [
      {
        text: "Cliquez pour modifier le texte",
        children: [
          {
            text: "Deuxième niveau",
            children: [
              {
                text: "Troisième niveau",
                children: [
                  {
                    text: "Quatrième niveau",
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }),
  mapSvg: z.string().default("<svg viewBox=\"0 0 900 520\" xmlns=\"http://www.w3.org/2000/svg\">...</svg>").meta({
    description: "SVG code for the map panel (vector-only)",
    maxWords: 200
  }),
  rightTopText: z.string().min(2).max(60).default("Cliquez pour modifier\nles styles du texte").meta({
    description: "Top small right panel text. Newlines allowed",
    maxWords: 6
  }),
  metric: z.string().min(2).max(6).default("XX%").meta({
    description: "Metric displayed in large font",
    maxWords: 1
  }),
  slideNumber: z.string().min(1).max(4).default("39").meta({
    description: "Slide number shown in footer",
    maxWords: 1
  }),
  presentationName: z.string().min(3).max(40).default("Nom de la présentation").meta({
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
  const bullets = slideData?.mainCard?.bullets || []
  const renderNested = (items: any[], level = 0) => {
    return items.map((it, i) => (
      <li key={i} className={level === 0 ? "flex items-start gap-3" : ""}>
        {level === 0 ? (
          <>
            <span className="text-[#cf022b] mt-1 text-[18px]">•</span>
            <div className="font-['Tahoma'] text-[20px] text-[#000000] leading-relaxed">
              {it?.text || ""}
              {Array.isArray(it?.children) && it.children.length > 0 ? (
                <ul className={level === 0 ? "list-disc list-inside mt-3 ml-4 space-y-2" : "list-disc list-inside mt-2 ml-4"}>
                  {renderNested(it.children, level + 1)}
                </ul>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="font-['Tahoma'] text-[16px]">
              {it?.text || ""}
              {Array.isArray(it?.children) && it.children.length > 0 ? (
                <ul className="list-disc list-inside mt-2 ml-4">
                  {renderNested(it.children, level + 1)}
                </ul>
              ) : null}
            </div>
          </>
        )}
      </li>
    ))
  }

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="px-12 pt-8">
          {/* Title capacity: min 10 / max 60 chars */}
          <h1 className="font-['Tahoma'] text-[48px] leading-tight text-[#2a1449]">
            {slideData?.title || "Cliquez pour modifier le titre 27"}
          </h1>
          <p className="mt-4 font-['Tahoma'] text-[24px] text-[#000000]">
            {slideData?.subtitle || "Cliquez pour modifier le sous-titre"}
          </p>
        </div>

        <div className="px-12 mt-8 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-6 bg-white rounded-md border border-[#f3eef6] shadow-sm p-8 min-h-[520px]">
            <h3 className="font-['Tahoma'] font-semibold text-[20px] text-[#4d1d82]">
              {slideData?.mainCard?.heading || "Modifiez texte"}
            </h3>
            <div className="w-8 h-1 bg-[#4d1d82] rounded-sm mt-3 mb-6"></div>

            <h4 className="font-['Arial'] font-bold text-[18px] text-[#000000]">
              {slideData?.mainCard?.lead || "Cliquez pour modifier le texte"}
            </h4>

            <ul className="mt-6 list-none pl-0 space-y-4">
              {renderNested(bullets)}
            </ul>

            {/* Bullets comment: supports min 1 / max 4 top-level bullets; nested levels up to 3 safely */}
          </div>

          <div className="col-span-4 bg-[#f7f7f8] rounded-md p-6 flex items-center justify-center">
            <div className="relative w-full h-[520px] flex items-center justify-center">
              <svg viewBox="0 0 900 520" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <g fill="none" stroke="#efefef" strokeWidth="1" transform="translate(0,10)">
                  <path d="M20 260 C60 220 140 200 200 200 C260 200 320 220 360 260 C400 300 440 320 500 320 C560 320 620 300 660 260 C700 220 760 200 860 200" />
                  <path d="M140 120 C180 100 240 96 300 108 C360 120 420 140 480 136" />
                  <path d="M100 340 C140 320 200 316 260 328" />
                  <path d="M520 180 C560 160 620 160 660 180" />
                </g>
                <circle cx="450" cy="260" r="200" fill="none" stroke="#4d1d82" strokeWidth="3" />
                <g transform="translate(330,90)" fill="#4d1d82" stroke="none">
                  <path d="M20 320 C40 320 60 300 100 300 C120 300 140 320 160 320 L140 340 L100 340 Z"/>
                  <path d="M140 260 C180 250 220 244 250 246 C280 248 300 268 310 280 L290 300 L240 296 Z"/>
                  <path d="M120 200 C130 194 146 192 156 198 C166 204 158 216 150 220 Z"/>
                  <path d="M300 120 C312 96 336 84 352 80 C368 76 392 84 402 90 L392 140 L362 180 Z"/>
                  <path d="M260 300 C280 280 310 270 340 270 C360 270 380 290 400 320 L380 340 L340 340 Z"/>
                  <path d="M240 360 C250 380 268 390 284 396 C278 384 262 376 250 364 Z"/>
                </g>
              </svg>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-6">
            <div className="bg-[#efefef] rounded-md p-6 min-h-[96px] flex items-center">
              <p className="font-['Tahoma'] text-[18px] font-semibold text-[#000000] whitespace-pre-line">
                {slideData?.rightTopText || "Cliquez pour modifier\nles styles du texte"}
              </p>
            </div>

            <div className="bg-white rounded-md border border-[#f3eef6] shadow-sm p-6 min-h-[340px] flex items-center justify-center">
              <div>
                <div className="font-['Tahoma'] text-[96px] text-[#4d1d82] font-bold leading-none">
                  {slideData?.metric || "XX%"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-8 flex items-center space-x-3">
          <span className="font-['Tahoma'] text-[11px] text-[#4d1d82]">{slideData?.slideNumber || "39"}</span>
          <span className="font-['Tahoma'] text-[11px] text-[#000000]">|</span>
          <span className="font-['Tahoma'] text-[11px] text-[#000000]">{slideData?.presentationName || "Nom de la présentation"}</span>
        </div>

        <div className="absolute bottom-4 right-8">
          <div className="w-[140px] h-[36px] flex items-center justify-center">
            <div className="w-[120px] h-[36px] rounded-full bg-white flex items-center justify-center border border-[#00000010]">
              <span className="font-['Arial'] text-[20px] text-[#000000]">i</span>
            </div>
          </div>
        </div>

        {/* Title capacity: min 10 / max 60 chars */}
        {/* Subtitle capacity: min 15 / max 120 chars */}
        {/* Left card heading: min 6 / max 30 chars */}
        {/* Left body bullets: conservative min 1 / max 4 top-level bullets; nested levels up to 3 */}
        {/* Map: vector-only SVG, purple circle stroke #4d1d82 stroke-width 3; highlighted countries as vector fills */}
        {/* Right metric: 'XX%' displayed with font-size ~96px; metric label capacity min 2 / max 6 chars */}
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }