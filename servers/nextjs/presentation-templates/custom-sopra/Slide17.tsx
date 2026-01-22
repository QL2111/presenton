// --- Bullet types and schemas ---
// --- Bullet types and schemas ---
type BulletLevel3 = { text: string };
type BulletLevel2 = { text: string; children: BulletLevel3[] };
type BulletLevel1 = { text: string; children: BulletLevel2[] };

const BulletLevel3Schema: z.ZodType<BulletLevel3> = z.object({
  text: z.string().min(8).max(40).default("Quatrième niveau").meta({
    description: "Level 3 bullet text. Max 7 words",
    maxWords: 7,
  }),
});

const BulletLevel2Schema: z.ZodType<BulletLevel2> = z.object({
  text: z.string().min(10).max(60).default("Troisième niveau").meta({
    description: "Level 2 bullet text. Max 10 words",
    maxWords: 10,
  }),
  children: z.array(BulletLevel3Schema).min(0).max(3).default([]).meta({
    description: "Level 3 bullets nested under level 2. Max 3 items",
  }),
});

const BulletLevel1Schema: z.ZodType<BulletLevel1> = z.object({
  text: z.string().min(12).max(80).default("Deuxième niveau").meta({
    description: "Level 1 bullet text. Max 12 words",
    maxWords: 12,
  }),
  children: z.array(BulletLevel2Schema).min(0).max(3).default([]).meta({
    description: "Level 2 bullets nested under level 1. Max 3 items",
  }),
});
// ...existing code...
import * as React from 'react';
import { z } from 'zod'

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_query__: z.string().min(1).max(10).default("i").meta({
    description: "Query used to search the icon. Max 3 words",
    maxWords: 3,
  }),
})


const layoutId = "header-subtitle-nested-bullets-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, subtitle, and nested bulleted list with footer items."



const Schema = z.object({
  title: z.string().min(10).max(60).default("Cliquez pour modifier le titre 1").meta({
    description: "Main heading text. Max 10 words",
    maxWords: 10,
  }),
  subtitle: z.string().min(10).max(120).default("Cliquez pour modifier le sous-titre").meta({
    description: "Subtitle text under the heading. Max 20 words",
    maxWords: 20,
  }),
  bullets: z.array(BulletLevel1Schema).min(1).max(6).default(() => [
    {
      text: "Cliquez pour modifier le texte",
      children: [
        {
          text: "Deuxième niveau",
          children: [
            {
              text: "Troisième niveau",
              children: [
                { text: "Quatrième niveau" } // BulletLevel3 has only text
              ]
            }
          ]
        }
      ]
    }
  ]).meta({
    description: "Top-level bullets with nested children. Top-level min 1, max 6",
    maxWords: 120,
  }),
  pageNumber: z.string().min(1).max(4).default("17").meta({
    description: "Slide page number text in footer. Max 4 characters",
    maxWords: 1,
  }),
  presentationName: z.string().min(8).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer. Max 6 words",
    maxWords: 6,
  }),
  logo: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "i",
  }).meta({
    description: "Footer logo/icon replaced with circle 'i'.",
    maxWords: 1,
  }),
});

type HeaderSubtitleNestedBulletsSlideData = z.infer<typeof Schema>

interface HeaderSubtitleNestedBulletsLayoutProps {
  data?: Partial<HeaderSubtitleNestedBulletsSlideData>
}

const dynamicSlideLayout: React.FC<HeaderSubtitleNestedBulletsLayoutProps> = ({ data: slideData }) => {
  // Get default bullets using Zod's API
  // Use Zod's parse(undefined) to get default value for bullets
  const bullets: BulletLevel1[] = slideData?.bullets ?? Schema.shape.bullets.parse(undefined);

  const renderLevel3 = (items?: BulletLevel3[]) => {
    if (!items || items.length === 0) return null;
    return items.map((it: BulletLevel3, i: number) => (
      <li key={i} className="flex items-start ml-[18px]">
        <span className="flex-shrink-0 mt-1 w-[5px] h-[5px] rounded-full bg-[#000000] mr-4" aria-hidden="true"></span>
        <div className="font-['Tahoma'] text-[15px] leading-[1.2] text-[#111111]">
          {it?.text}
        </div>
      </li>
    ));
  };

  const renderLevel2 = (items?: BulletLevel2[]) => {
    if (!items || items.length === 0) return null;
    return items.map((it: BulletLevel2, i: number) => (
      <li key={i} className="flex items-start mb-2">
        <span className="flex-shrink-0 mt-1 w-[6px] h-[6px] rounded-full bg-[#000000] mr-4" aria-hidden="true"></span>
        <div className="font-['Tahoma'] text-[18px] leading-[1.2] text-[#111111]">
          {it?.text}
        </div>
        {it?.children && it.children.length > 0 ? (
          <ul className="mt-3 ml-[44px]">
            {renderLevel3(it.children)}
          </ul>
        ) : null}
      </li>
    ));
  };

  // Render BulletLevel1[]
  const renderLevel1 = (items?: BulletLevel1[]) => {
    return items?.map((it: BulletLevel1, idx: number) => (
      <li key={idx} className="ml-[34px] mb-2">
        <div className="flex items-start">
          <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-[#000000] mr-4" aria-hidden="true"></span>
          <div className="font-['Tahoma'] text-[21px] leading-[1.2] text-[#111111]">
            {it?.text}
          </div>
        </div>
        {it?.children && it.children.length > 0 ? (
          <ul className="mt-3 ml-[44px]">
            {renderLevel2(it.children)}
          </ul>
        ) : null}
      </li>
    )) || null;
  };

  // Render BulletLevel2[]
  const renderLevel2asLevel1 = (items?: BulletLevel2[]) => {
    return items?.map((it: BulletLevel2, idx: number) => (
      <li key={idx} className="ml-[34px] mb-2">
        <div className="flex items-start">
          <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-[#000000] mr-4" aria-hidden="true"></span>
          <div className="font-['Tahoma'] text-[21px] leading-[1.2] text-[#111111]">
            {it?.text}
          </div>
        </div>
        {it?.children && it.children.length > 0 ? (
          <ul className="mt-3 ml-[44px]">
            {renderLevel3(it.children)}
          </ul>
        ) : null}
      </li>
    )) || null;
  };

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="h-full w-full grid grid-cols-12 gap-6 px-[56px] py-[40px]">
          <div className="col-span-12 md:col-span-10 lg:col-span-9 xl:col-span-8">
            {/* Text capacity: min 10 chars, max 60 chars */}
            <h1 className="font-['Tahoma'] text-[46px] leading-[1.02] text-[#2a1449] mb-2">
              {slideData?.title || "Cliquez pour modifier le titre 1"}
            </h1>

            {/* Text capacity: min 10 chars, max 120 chars */}
            <div className="font-['Tahoma'] text-[24px] leading-[1.15] text-[#111111] mb-6">
              {slideData?.subtitle || "Cliquez pour modifier le sous-titre"}
            </div>

            <div className="max-w-[760px]">
              <ul className="list-none pl-0 m-0">
                <li className="flex items-start mb-3">
                  <span className="flex-shrink-0 mt-1 w-2.5 h-2.5 rounded-full bg-[#cf022b] mr-4" aria-hidden="true"></span>
                  <div className="font-['Tahoma'] text-[24px] leading-[1.2] text-[#111111]">
                    {bullets && bullets.length > 0 ? bullets[0].text : "Cliquez pour modifier le texte"}
                  </div>
                </li>

                {/* Level 1 */}
                {renderLevel2asLevel1(bullets[0]?.children)}
              </ul>

              {/* 
                Bullets capacity comment:
                - Top-level bullets supported (conservative): min 1, max 6
                - Level1 bullets supported per parent: min 0, max 4
                - Level2 bullets supported per parent: min 0, max 3
              */}
            </div>
          </div>
        </div>

        <div className="absolute left-6 bottom-6 flex items-center gap-4 text-[#2a1449]">
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.pageNumber || "17"}</div>
          <div className="w-[1px] h-[14px] bg-[#2a1449]/30"></div>
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.presentationName || "Nom de la présentation"}</div>
        </div>

        <div className="absolute right-6 bottom-6 flex items-center">
          <div className="w-[120px] flex items-center justify-end">
            {slideData?.logo?.__icon_url__ ? (
              <img src={slideData?.logo?.__icon_url__} alt={slideData?.logo?.__icon_query__ || "logo"} className="w-[36px] h-[36px] rounded-full object-cover" />
            ) : (
              <div className="w-[36px] h-[36px] rounded-full bg-[#2a1449] flex items-center justify-center text-white font-['Tahoma'] text-[18px]">
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