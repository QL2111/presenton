import * as React from 'react';
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg").meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().min(3).max(120).default("framed thumbnail with sun and mountains, flat illustration").meta({
    description: "Prompt used to describe or generate the image. Max 20 words",
  }),
})

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_prompt__: z.string().min(3).max(80).default("circle i footer replacement").meta({
    description: "Prompt used to describe or generate the icon. Max 10 words",
  }),
})

const layoutId = "three-column-thumbnails-cards-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, three thumbnails, and white rounded cards."
type BulletItem = {
  text: string;
  children: BulletItem[];
};

const BulletItemSchema: z.ZodType<BulletItem> = z.lazy(() =>
  z.object({
    text: z.string().min(6).max(160).default("Cliquez pour modifier le texte"),
    children: z.array(BulletItemSchema).min(0).max(3).default([]),
  })
);

const ColumnSchema = z.object({
  thumbnail: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "framed thumbnail with sun and mountains, flat illustration",
  }).meta({
    description: "Thumbnail image for the column",
  }),
  cardHeading: z.string().min(6).max(40).default("Cliquez pour modifier le texte").meta({
    description: "Card top text/heading. Max 8 words",
  }),
  cardBullets: z.array(BulletItemSchema).min(2).max(6).default([
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
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      text: "Cliquez pour modifier le texte",
      children: [],
    },
  ]).meta({
    description: "Bullets inside the card with nested levels. Conservative capacity",
  }),
})

const Schema = z.object({
  title: z.string().min(10).max(60).default("Cliquez pour modifier le titre 12").meta({
    description: "Main title text. Max 10 words",
  }),
  subtitle: z.string().min(10).max(80).default("Cliquez pour modifier le sous-titre").meta({
    description: "Subtitle text. Max 15 words",
  }),
  columns: z.array(ColumnSchema).min(3).max(3).default([
    {
      thumbnail: {
        __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        __image_prompt__: "framed thumbnail with sun and mountains, flat illustration",
      },
      cardHeading: "Cliquez pour modifier le texte",
      cardBullets: [
        {
          text: "Cliquez pour modifier le texte",
          children: [
            {
              text: "Deuxième niveau",
              children: [
                {
                  text: "Troisième niveau",
                  children: [
                    { text: "Quatrième niveau", children: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
      ],
    },
    {
      thumbnail: {
        __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        __image_prompt__: "framed thumbnail with sun and mountains, flat illustration",
      },
      cardHeading: "Cliquez pour modifier le texte",
      cardBullets: [
        {
          text: "Cliquez pour modifier le texte",
          children: [
            {
              text: "Deuxième niveau",
              children: [
                {
                  text: "Troisième niveau",
                  children: [
                    { text: "Quatrième niveau", children: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
      ],
    },
    {
      thumbnail: {
        __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        __image_prompt__: "framed thumbnail with sun and mountains, flat illustration",
      },
      cardHeading: "Cliquez pour modifier le texte",
      cardBullets: [
        {
          text: "Cliquez pour modifier le texte",
          children: [
            {
              text: "Deuxième niveau",
              children: [
                {
                  text: "Troisième niveau",
                  children: [
                    { text: "Quatrième niveau", children: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
      ],
    },
  ]).meta({
    description: "Three column definitions with thumbnail and card content",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(4).default("27").meta({
      description: "Slide number text",
    }),
    presentationName: z.string().min(10).max(40).default("Nom de la présentation").meta({
      description: "Presentation name in footer. Max 6 words",
    }),
    footerIcon: IconSchema.default({
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    }).meta({
      description: "Footer icon placeholder object",
    }),
  }).default({
    slideNumber: "27",
    presentationName: "Nom de la présentation",
    footerIcon: { __icon_url__: "", __icon_prompt__: "circle i footer replacement" },
  }).meta({
    description: "Footer data including slide number, presentation name, and icon",
  }),
})

type ThreeColumnThumbnailsCardsSlideData = z.infer<typeof Schema>

interface ThreeColumnThumbnailsCardsLayoutProps {
  data?: Partial<ThreeColumnThumbnailsCardsSlideData>
}

const dynamicSlideLayout: React.FC<ThreeColumnThumbnailsCardsLayoutProps> = ({ data: slideData }) => {
  const columns = slideData?.columns || []
  const footer = slideData?.footer || { slideNumber: "27", presentationName: "Nom de la présentation", footerIcon: { __icon_url__: "", __icon_prompt__: "circle i footer replacement" } }

  const renderNested = (items: any[], level = 0) => {
    if (!items || items.length === 0) return null
    return items.map((it, idx) => {
      const textClass = level === 0 ? "font-['Tahoma'] text-[24px] leading-[28px] mb-[12px]" : level === 1 ? "ml-[24px] list-disc font-['Tahoma'] text-[21px] leading-[26px] mb-[8px]" : level === 2 ? "ml-[48px] list-disc font-['Tahoma'] text-[19px] leading-[24px] mb-[6px]" : "ml-[72px] list-disc font-['Tahoma'] text-[16px] leading-[20px]"
      return (
        <div key={`${level}-${idx}`}>
          <div className={textClass}>
            {it?.text || ""}
          </div>
          {it?.children && it.children.length > 0 ? renderNested(it.children, Math.min(level + 1, 3)) : null}
        </div>
      )
    })
  }

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="w-full h-full relative">
          <div dangerouslySetInnerHTML={{ __html: "<!-- Title capacity: min 10 chars, max 60 chars. -->" }} />
          <div className="px-[60px] pt-[44px]">
            <h1 className="m-0 font-['Tahoma'] text-[#2a1449] text-[45px] leading-[48px]">
              {slideData?.title || "Cliquez pour modifier le titre 12"}
            </h1>
            <p className="mt-[8px] font-['Tahoma'] text-[24px] leading-[28px] text-[#000000]">
              {slideData?.subtitle || "Cliquez pour modifier le sous-titre"}
            </p>
          </div>

          <div className="px-[60px] mt-[130px]">
            <div className="flex justify-between gap-x-[36px]">
              {(columns.length ? columns : Array.from({ length: 3 }).map((_, i) => ( (slideData?.columns || [])[i] )) ) .map((col: any, ci: number) => {
                const column = col || {
                  thumbnail: { __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", __image_prompt__: "framed thumbnail" },
                  cardHeading: "Cliquez pour modifier le texte",
                  cardBullets: [],
                }
                return (
                  <div key={ci} className="flex flex-col items-center w-[336px]">
                    <img src={column?.thumbnail?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"} alt={column?.thumbnail?.__image_prompt__ || "thumbnail"} className="w-[357px] h-[115px] object-cover rounded-sm shadow-[0_6px_8px_rgba(0,0,0,0.12)]" />
                    <div className="w-full h-[46px] mt-[-16px] rounded-b-md bg-gradient-to-b from-[#efe9f6] to-[#ffffff]"></div>
                    <div className="w-full bg-white border border-[#f0e9f3] rounded-[10px] mt-[18px] p-[22px] box-border min-h-[296px] shadow-sm">
                      <ul className="list-inside m-0 p-0">
                        <li className="marker:text-[#cf022b] font-['Tahoma'] text-[24px] leading-[28px] mb-[12px]">
                          {column?.cardHeading || ""}
                        </li>
                        {renderNested(column?.cardBullets || [], 1)}
                      </ul>
                      <div dangerouslySetInnerHTML={{ __html: "<!-- Bullets supported (conservative): min 2, max 6 -->" }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="absolute left-[60px] bottom-[18px] flex items-center gap-[16px]">
            <div className="font-['Tahoma'] text-[11px]">{slideData?.footer?.slideNumber || footer.slideNumber}</div>
            <div className="h-[14px] border-l border-[#d9d5df]"></div>
            <div className="font-['Times New Roman'] text-[11px]">{slideData?.footer?.presentationName || footer.presentationName}</div>
          </div>

          <div className="absolute right-[60px] bottom-[6px]">
            <div className="w-[96px] flex items-center justify-end">
              <div className="w-[56px] h-[56px] rounded-full bg-white flex items-center justify-center text-[#cf022b] font-['Tahoma'] text-[28px]">i</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }