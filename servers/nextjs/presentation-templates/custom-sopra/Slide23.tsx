import * as React from 'react';
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg").meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().min(5).max(180).default("framed landscape with sun and mountains, flat illustration").meta({
    description: "Prompt used to generate the image. Max 30 words",
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

const layoutId = "top-framed-image-two-cards-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a top framed image, header, subtitle, and two cards side-by-side."
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

const CardSchema = z.object({
  heading: z.string().min(6).max(32).default("Modifiez texte").meta({
    description: "Card heading text. Max 6 words",
  }),
  bullets: z.array(BulletItemSchema).min(1).max(7).default([
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
  ]).meta({
    description: "List of bullets for the card. Conservative top-level capacity",
  }),
})

const Schema = z.object({
  title: z.string().min(8).max(48).default("Cliquez pour modifier le titre 9").meta({
    description: "Main title text. Max 8 words",
  }),
  subtitle: z.string().min(10).max(120).default("Cliquez pour modifier le sous-titre").meta({
    description: "Subtitle text. Max 20 words",
  }),
  topImage: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "framed landscape with sun and mountains, flat illustration",
  }).meta({
    description: "Top framed image. Max 30 words",
  }),
  cards: z.array(CardSchema).min(1).max(4).default([
    {
      heading: "Modifiez texte",
      bullets: [
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
      ],
    },
    {
      heading: "Modifiez texte",
      bullets: [
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
      ],
    },
  ]).meta({
    description: "Two cards side-by-side each with heading and nested bullets",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(4).default("23").meta({
      description: "Slide number text",
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
    slideNumber: "23",
    presentationName: "Nom de la présentation",
    footerIcon: {
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    },
  }).meta({
    description: "Footer data including slide number, presentation name, and icon",
  }),
})

type TopFramedImageTwoCardsSlideData = z.infer<typeof Schema>

interface TopFramedImageTwoCardsLayoutProps {
  data?: Partial<TopFramedImageTwoCardsSlideData>
}

const dynamicSlideLayout: React.FC<TopFramedImageTwoCardsLayoutProps> = ({ data: slideData }) => {
  const cards = slideData?.cards || []
  const footer = slideData?.footer || { slideNumber: "23", presentationName: "Nom de la présentation", footerIcon: { __icon_url__: "", __icon_prompt__: "circle i footer replacement" } }

  const getMarkerClass = (level: number) => {
    if (level === 0) return "mt-2 mr-4 w-2.5 h-2.5 rounded-full flex-shrink-0"
    if (level === 1) return "mt-1 mr-4 w-2 h-2 rounded-full flex-shrink-0"
    if (level === 2) return "mt-1 mr-4 w-[6px] h-[6px] rounded-full flex-shrink-0"
    return "mt-1 mr-4 w-[5px] h-[5px] rounded-full flex-shrink-0"
  }

  const getTextClass = (level: number, bold = false) => {
    if (level === 0) return `font-['Tahoma'] ${bold ? "font-semibold text-[21px]" : "text-[21px]"} leading-[1.2] text-[#111111]`
    if (level === 1) return `font-['Tahoma'] text-[18px] leading-[1.2] text-[#111111]`
    if (level === 2) return `font-['Tahoma'] text-[16px] leading-[1.2] text-[#111111]`
    return `font-['Tahoma'] text-[14px] leading-[1.2] text-[#111111]`
  }

  const renderChildren = (items: any[], level = 0) => {
    if (!items || items.length === 0) return null
    return items.map((it, idx) => (
      <div key={`${level}-${idx}`} className={`${level === 1 ? "ml-[36px]" : ""} ${level > 1 ? "mt-3 ml-[44px]" : ""}`}>
        <div className="flex items-start">
          <span aria-hidden="true" className={`${getMarkerClass(level)} ${it?.markerColor === "#cf022b" ? "bg-[#cf022b]" : it?.markerColor === "#000000" ? "bg-[#000000]" : "bg-[#000000]"}`}></span>
          <div className={getTextClass(level, false)}>
            {it?.text || ""}
          </div>
        </div>
        {it?.children && it.children.length > 0 ? renderChildren(it.children, Math.min(level + 1, 3)) : null}
      </div>
    ))
  }

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="w-full px-[56px] pt-6">
          <div className="mx-auto w-full max-w-[1100px] box-border border-[8px] border-[#333333]">
            <div className="box-border border-[6px] border-[#7d7d7d] bg-white p-2">
              <img src={slideData?.topImage?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"} alt={slideData?.topImage?.__image_prompt__ || ""} className="w-full h-[140px] object-cover" />
            </div>
          </div>
        </div>

        <div className="h-[calc(100%-220px)] w-full px-[56px] pt-6 pb-10">
          <div className="max-w-[980px]">
            <div dangerouslySetInnerHTML={{ __html: "<!-- Title capacity: min 8 chars, max 48 chars. Max words: 8 -->" }} />
            <h1 className="font-['Tahoma'] text-[46px] leading-[1.02] text-[#2a1449] mb-2">
              {slideData?.title || "Cliquez pour modifier le titre 9"}
            </h1>

            <div dangerouslySetInnerHTML={{ __html: "<!-- Subtitle capacity: min 10 chars, max 120 chars. Max words: 20 -->" }} />
            <div className="font-['Tahoma'] text-[24px] leading-[1.15] text-[#111111] mb-6">
              {slideData?.subtitle || "Cliquez pour modifier le sous-titre"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4">
            { (cards.length ? cards : [{
              heading: "Modifiez texte",
              bullets: [
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
              ],
            }, {
              heading: "Modifiez texte",
              bullets: [
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
              ],
            }] ).map((card, ci) => (
              <section key={ci} className="rounded-[10px] border-[4px] border-[#efeaf2] bg-white p-8 shadow-sm min-h-[340px]">
                <div className="inline-block">
                  <div dangerouslySetInnerHTML={{ __html: "<!-- Card heading capacity: min 6 chars, max 32 chars. Max words: 6 -->" }} />
                  <div className="font-['Tahoma'] text-[24px] text-[#5b1f63] font-semibold mb-2">{card?.heading || ""}</div>
                  <svg width="40" height="6" viewBox="0 0 40 6" className="block mb-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="6" rx="2" fill="#5b1f63"/>
                  </svg>
                </div>

                <ul className="m-0 p-0 space-y-4 max-w-[520px]">
                  <li className="flex items-start">
                    <span aria-hidden="true" className="mt-2 mr-4 w-2.5 h-2.5 rounded-full bg-[#cf022b] flex-shrink-0"></span>
                    <div className="font-['Tahoma'] font-semibold text-[21px] leading-[1.2] text-[#111111]">
                      {card?.bullets?.[0]?.text || ""}
                    </div>
                  </li>

                  { renderChildren(card?.bullets?.[0]?.children || [], 1) }
                </ul>

                <div dangerouslySetInnerHTML={{ __html: "<!-- Bullets capacity: top-level min 1 max 7; level1 per parent min 0 max 4; level2 per parent min 0 max 3 -->" }} />
              </section>
            )) }
          </div>
        </div>

        <div className="absolute left-6 bottom-6 flex items-center gap-4 text-[#2a1449]">
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.footer?.slideNumber || footer.slideNumber}</div>
          <div className="w-[1px] h-[14px] bg-[#2a1449]/30"></div>
          <div className="font-['Arial'] text-[11px] leading-[1]">{slideData?.footer?.presentationName || footer.presentationName}</div>
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