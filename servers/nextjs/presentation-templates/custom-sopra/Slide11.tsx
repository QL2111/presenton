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

const BulletSchema: any = z.lazy(() =>
  z.object({
    text: z.string().min(5).max(140).default("Cliquez pour modifier les styles du texte du masque").meta({
      description: "Bullet text for this level. Max 25 words",
    }),
    children: z.array(BulletSchema).min(0).max(3).default([]).meta({
      description: "Nested bullet items for the next level. Max 3 levels deep",
    }),
  })
)

const layoutId = "left-headline-bullets-footer-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a small header, large headline, bulleted list, decorative stripe, and footer area."

const Schema = z.object({
  topTitle: z.string().min(10).max(80).default("Cliquez pour modifier le texte").meta({
    description: "Small header text above the main headline. Max 10 words",
  }),
  mainTitle: z.string().min(20).max(140).default("Cliquez pour\nmodifier le texte").meta({
    description: "Main large headline text. Line breaks allowed. Max 20 words",
  }),
  bullets: z.array(BulletSchema).min(1).max(6).default([
    {
      text: "Cliquez pour modifier les styles du texte du masque",
      children: [
        {
          text: "Deuxième niveau",
          children: [
            {
              text: "Troisième niveau",
              children: [],
            },
          ],
        },
      ],
    },
  ]).meta({
    description: "Top-level bullets with optional nested children. Top-level min 1, max 6",
  }),
  pageNumber: z.string().min(1).max(4).default("11").meta({
    description: "Slide page number text. Max 4 characters",
  }),
  presentationName: z.string().min(5).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer. Max 6 words",
  }),
  logo: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "i",
  }).meta({
    description: "Footer logo/icon replaced with circle 'i'.",
  }),
})

type LeftHeadlineBulletsSlideData = z.infer<typeof Schema>

interface LeftHeadlineBulletsLayoutProps {
  data?: Partial<LeftHeadlineBulletsSlideData>
}

const dynamicSlideLayout: React.FC<LeftHeadlineBulletsLayoutProps> = ({ data: slideData }) => {
  const bullets = slideData?.bullets || []
  const renderBullets = (items?: typeof bullets, level = 0) => {
    if (!items || items.length === 0) return null
    return items.map((item, idx) => (
      <li key={`${level}-${idx}`} className={`${level === 0 ? "flex items-start gap-4" : ""} ${level > 0 ? "ml-8 mt-4" : ""}`}>
        <div className={`${level === 0 ? "flex items-start gap-4" : "flex items-start gap-4"}`}>
          <span className={`mt-2 inline-block w-2 h-2 rounded-full flex-shrink-0 ${"bg-white"}`}></span>
          <p className={`font-['Tahoma'] ${level === 0 ? "text-[24px]" : level === 1 ? "text-[20px]" : "text-[18px]"} text-white leading-relaxed`}>
            {item?.text}
          </p>
        </div>
        {item?.children && item?.children.length > 0 ? (
          <ul className="ml-0 mt-0">
            {renderBullets(item.children, level + 1)}
          </ul>
        ) : null}
      </li>
    ))
  }

  const mainTitleLines = slideData?.mainTitle?.split("\n") || ["Cliquez pour", "modifier le texte"]

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5a1983] via-[#c8183e] to-[#f07d00]"></div>

        <div className="relative z-10 w-full h-full flex items-start">
          <div className="pl-[88px] pt-[96px] max-w-[760px]">
            {/* Text capacity: min 10 chars, max 80 chars */}
            <div className="font-['Tahoma'] text-[46px] text-white leading-tight mb-6">
              {slideData?.topTitle || "Cliquez pour modifier le texte"}
            </div>

            {/* Text capacity: min 20 chars, max 140 chars */}
            <h1 className="font-['Tahoma'] text-[93px] text-white font-bold leading-[0.98] max-w-[720px]">
              {mainTitleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>

            <div className="mt-6 h-[4px] bg-white w-[520px]"></div>

            <ul className="mt-8 space-y-4 max-w-[640px]">
              {/* Bullet capacity note: min top-level bullets: 1, max top-level bullets: 6; nested levels supported up to 3 deep */}
              {renderBullets(bullets)}
            </ul>
          </div>
        </div>

        <div className="absolute bottom-[64px] left-0 right-0 h-[14px] bg-gradient-to-r from-[#c8142f] via-[#d65a2b] to-[#f07d00]"></div>

        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-white flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="font-['Tahoma'] text-[12px] text-[#2a1449]">
              {slideData?.pageNumber || "11"}
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
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }