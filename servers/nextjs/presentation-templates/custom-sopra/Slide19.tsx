import * as React from 'react';
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg").meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().min(5).max(60).default("framed illustration with sun and mountains in a simple flat style").meta({
    description: "Prompt used to generate the image. Max 12 words",
  }),
})

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_prompt__: z.string().min(3).max(40).default("circle i footer replacement").meta({
    description: "Prompt used to generate or describe the icon. Max 6 words",
  }),
})

const layoutId = "framed-image-bullet-points-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a framed image, header, subtitle, and nested bullet points."
type BulletItem = {
  text: string;
  markerColor: string;
  children: BulletItem[];
};

const BulletItemSchema: z.ZodType<BulletItem> = z.lazy(() =>
  z.object({
    text: z.string().min(1).max(160).default("Cliquez pour modifier le texte"),
    markerColor: z.string().default("#cf022b"),
    children: z.array(BulletItemSchema).min(0).max(3).default([]),
  })
);

const defaultBullets = [
  {
    text: "Cliquez pour modifier le texte",
    markerColor: "#cf022b",
    children: [
      {
        text: "Deuxième niveau",
        markerColor: "#000000",
        children: [
          {
            text: "Troisième niveau",
            markerColor: "#000000",
            children: [
              {
                text: "Quatrième niveau",
                markerColor: "#000000",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]

const Schema = z.object({
  title: z.string().min(5).max(100).default("Cliquez pour modifier le titre").meta({
    description: "Main title text. Max 12 words",
  }),
  subtitle: z.string().min(3).max(120).default("Cliquez pour modifier le sous-titre").meta({
    description: "Subtitle text. Max 12 words",
  }),
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "framed illustration with sun and mountains in a simple flat style",
  }).meta({
    description: "Framed supporting image for the left column. Max 12 words",
  }),
  bulletPoints: z.array(BulletItemSchema).min(1).max(6).default(defaultBullets).meta({
    description: "Top-level bullet points with nested children. Max 6 points",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(4).default("19").meta({
      description: "Slide number text. Max 2 words",
    }),
    presentationName: z.string().min(3).max(60).default("Nom de la présentation").meta({
      description: "Presentation name in footer. Max 6 words",
    }),
    footerIcon: IconSchema.default({
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    }).meta({
      description: "Footer icon placeholder object",
    }),
  }).default({
    slideNumber: "19",
    presentationName: "Nom de la présentation",
    footerIcon: {
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    },
  }).meta({
    description: "Footer data including slide number, presentation name, and icon",
  }),
})

type FramedImageBulletPointsSlideData = z.infer<typeof Schema>

interface FramedImageBulletPointsLayoutProps {
  data?: Partial<FramedImageBulletPointsSlideData>
}

const dynamicSlideLayout: React.FC<FramedImageBulletPointsLayoutProps> = ({ data: slideData }) => {
  const bullets = slideData?.bulletPoints || []
  const footer = slideData?.footer || { slideNumber: "19", presentationName: "Nom de la présentation", footerIcon: { __icon_url__: "", __icon_prompt__: "circle i footer replacement" } }

  const getMarkerClass = (level: number, color: string) => {
    if (level === 0) return `mt-2 mr-4 w-2.5 h-2.5 rounded-full flex-shrink-0` // color applied inline via style attribute not allowed; use bg class when default known
    if (level === 1) return `mt-1 mr-4 w-2 h-2 rounded-full flex-shrink-0`
    if (level === 2) return `mt-1 mr-4 w-[6px] h-[6px] rounded-full flex-shrink-0`
    return `mt-1 mr-4 w-[5px] h-[5px] rounded-full flex-shrink-0`
  }

  const getMarkerBgClass = (color: string) => {
    // Use direct hex via inline style is disallowed in schema but allowed in JSX; to follow tailwind-only rule we keep known colors mapped, else default to bg-[#000000]
    if (color === "#cf022b") return "bg-[#cf022b]"
    if (color === "#000000") return "bg-[#000000]"
    if (color === "#2a1449") return "bg-[#2a1449]"
    return `bg-[#000000]`
  }

  const getTextClass = (level: number) => {
    if (level === 0) return `font-['Tahoma'] text-[24px] leading-[1.2] text-[#111111]`
    if (level === 1) return `font-['Tahoma'] text-[21px] leading-[1.2] text-[#111111]`
    if (level === 2) return `font-['Tahoma'] text-[18px] leading-[1.2] text-[#111111]`
    return `font-['Tahoma'] text-[15px] leading-[1.2] text-[#111111]`
  }

  const renderNested = (items: any[], level = 0) => {
    if (!items || items.length === 0) return null
    return items.map((item, idx) => (
      <div key={`${level}-${idx}`} className={`${level === 0 ? "flex items-start" : level === 1 ? "flex items-start" : level === 2 ? "flex items-start" : "flex items-start"} ${level > 0 && level === 1 ? "ml-[34px]" : ""} ${level > 1 ? "ml-[44px] mt-3" : ""}`}>
        <span aria-hidden="true" className={`${getMarkerClass(level, item?.markerColor || "#000000")} ${getMarkerBgClass(item?.markerColor || "#000000")}`}></span>
        <div className={`${getTextClass(level)}`}>
          {item?.text || ""}
        </div>
        {/* Render children below current item */}
        {item?.children && item.children.length > 0 ? (
          <div className={`${level >= 1 ? "" : ""}`}>
            {renderNested(item.children, Math.min(level + 1, 3))}
          </div>
        ) : null}
      </div>
    ))
  }

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="h-full w-full grid grid-cols-12 gap-6 px-[56px] py-[40px] items-start">
          <div className="col-span-6 flex items-center justify-center">
            <div className="w-[537px] h-[597px] box-border border-[8px] border-[#333333] flex items-center justify-center">
              <div className="w-[505px] h-[565px] box-border border-[6px] border-[#7d7d7d] bg-white flex items-center justify-center">
                <img src={slideData?.image?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"} alt={slideData?.image?.__image_prompt__ || ""} className="w-[477px] h-[537px] object-cover" />
              </div>
            </div>
          </div>

          <div className="col-span-6 flex flex-col justify-start pl-8">
            <div dangerouslySetInnerHTML={{ __html: "<!-- Title capacity: min 5, max 100. Max words: 12 -->" }} />
            <h1 className="font-['Tahoma'] text-[46px] leading-[1.02] text-[#2a1449] mb-2">
              {slideData?.title || "Cliquez pour modifier le titre"}
            </h1>

            <div dangerouslySetInnerHTML={{ __html: "<!-- Subtitle capacity: min 3, max 120. Max words: 12 -->" }} />
            <div className="font-['Tahoma'] text-[24px] leading-[1.15] text-[#111111] mb-6">
              {slideData?.subtitle || "Cliquez pour modifier le sous-titre"}
            </div>

            <div className="max-w-[520px]">
              <div dangerouslySetInnerHTML={{ __html: "<!-- Bullets capacity: top-level min 1 max 6; level1 per parent min 0 max 4; level2 per parent min 0 max 3 -->" }} />
              <div className="list-none m-0 p-0 space-y-4">
                {renderNested(bullets.length > 0 ? bullets : defaultBullets, 0)}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-6 bottom-6 flex items-center gap-4 text-[#2a1449]">
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{footer?.slideNumber || "19"}</div>
          <div className="w-[1px] h-[14px] bg-[#2a1449]/30"></div>
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{footer?.presentationName || "Nom de la présentation"}</div>
        </div>

        <div className="absolute right-6 bottom-6 flex items-center">
          <div className="w-[120px] flex items-center justify-end">
            <div className="w-[36px] h-[36px] rounded-full bg-[#2a1449] flex items-center justify-center text-white font-['Tahoma'] text-[18px]">i</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }