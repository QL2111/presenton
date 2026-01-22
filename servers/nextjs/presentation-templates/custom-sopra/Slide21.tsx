import * as React from 'react';
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg").meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().min(5).max(180).default("framed picture with sun and mountains, flat illustration style").meta({
    description: "Prompt used to generate the image. Max 30 words",
  }),
})

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_prompt__: z.string().min(3).max(60).default("circle i footer replacement").meta({
    description: "Prompt used to describe or generate the icon. Max 10 words",
  }),
})

const layoutId = "header-two-column-text-framed-image-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, subtitle, two-column text, and framed image."

const Schema = z.object({
  title: z.string().min(8).max(48).default("Cliquez pour modifier le titre 7").meta({
    description: "Main title text. Max 8 words",
  }),
  subtitle: z.string().min(10).max(120).default("Cliquez pour modifier le sous-titre").meta({
    description: "Subtitle text. Max 20 words",
  }),
  sectionHeading: z.string().min(6).max(32).default("Modifiez texte").meta({
    description: "Section heading above the two-column text. Max 6 words",
  }),
  columnA_heading: z.string().min(12).max(60).default("Cliquez pour modifier les styles du texte du masque").meta({
    description: "Small heading above column A paragraph. Max 10 words",
  }),
  columnA_paragraph: z.string().min(50).max(900).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit. Mauris in convallis eros, in aliquet risus. Donec sit amet leo ut odio vehicula gravida at vitae leo.").meta({
    description: "Body paragraph for column A. Max 120 words",
  }),
  columnB_heading: z.string().min(12).max(60).default("Cliquez pour modifier les styles du texte du masque").meta({
    description: "Small heading above column B paragraph. Max 10 words",
  }),
  columnB_paragraph: z.string().min(50).max(900).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit. Mauris in convallis eros, in aliquet risus. Donec sit amet leo ut odio vehicula gravida at vitae leo.").meta({
    description: "Body paragraph for column B. Max 120 words",
  }),
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "framed picture with sun and mountains, flat illustration style",
  }).meta({
    description: "Framed supporting image for the right column. Max 30 words",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(4).default("21").meta({
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
    slideNumber: "21",
    presentationName: "Nom de la présentation",
    footerIcon: {
      __icon_url__: "",
      __icon_prompt__: "circle i footer replacement",
    },
  }).meta({
    description: "Footer data including slide number, presentation name, and icon",
  }),
})

type FramedTwoColumnSlideData = z.infer<typeof Schema>

interface FramedTwoColumnLayoutProps {
  data?: Partial<FramedTwoColumnSlideData>
}

const dynamicSlideLayout: React.FC<FramedTwoColumnLayoutProps> = ({ data: slideData }) => {
  const footer = slideData?.footer || { slideNumber: "21", presentationName: "Nom de la présentation", footerIcon: { __icon_url__: "", __icon_prompt__: "circle i footer replacement" } }

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="h-full w-full grid grid-cols-12 gap-6 px-[56px] py-[40px]">
          <div className="col-span-7 flex flex-col">
            <div dangerouslySetInnerHTML={{ __html: "<!-- Title capacity: min 8 chars, max 48 chars. Max words: 8 -->" }} />
            <h1 className="font-['Tahoma'] text-[46px] leading-[1.02] text-[#2a1449] mb-2">
              {slideData?.title || "Cliquez pour modifier le titre 7"}
            </h1>

            <div dangerouslySetInnerHTML={{ __html: "<!-- Subtitle capacity: min 10 chars, max 120 chars. Max words: 20 -->" }} />
            <div className="font-['Tahoma'] text-[24px] leading-[1.15] text-[#111111] mb-6">
              {slideData?.subtitle || "Cliquez pour modifier le sous-titre"}
            </div>

            <div className="mb-6">
              <div dangerouslySetInnerHTML={{ __html: "<!-- Section heading capacity: min 6 chars, max 32 chars. Max words: 6 -->" }} />
              <div className="font-['Tahoma'] text-[24px] text-[#5b1f63] font-semibold inline-block">
                {slideData?.sectionHeading || "Modifiez texte"}
              </div>
              <div className="w-10 h-[4px] bg-[#5b1f63] rounded-sm mt-2"></div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="max-w-[420px]">
                <div dangerouslySetInnerHTML={{ __html: "<!-- Column A heading capacity: min 12 chars, max 60 chars. Max words: 10 -->" }} />
                <div className="font-['Tahoma'] text-[18px] leading-[1.3] text-[#111111] mb-4">
                  {slideData?.columnA_heading || "Cliquez pour modifier les styles du texte du masque"}
                </div>

                <div dangerouslySetInnerHTML={{ __html: "<!-- Column A paragraph capacity: min 50 chars, max 900 chars. Max words: 120 -->" }} />
                <p className="font-['Aptos'] text-[18px] leading-[1.6] text-[#111111]">
                  {slideData?.columnA_paragraph || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit. Mauris in convallis eros, in aliquet risus. Donec sit amet leo ut odio vehicula gravida at vitae leo."}
                </p>
              </div>

              <div className="max-w-[420px]">
                <div dangerouslySetInnerHTML={{ __html: "<!-- Column B heading capacity: min 12 chars, max 60 chars. Max words: 10 -->" }} />
                <div className="font-['Tahoma'] text-[18px] leading-[1.3] text-[#111111] mb-4">
                  {slideData?.columnB_heading || "Cliquez pour modifier les styles du texte du masque"}
                </div>

                <div dangerouslySetInnerHTML={{ __html: "<!-- Column B paragraph capacity: min 50 chars, max 900 chars. Max words: 120 -->" }} />
                <p className="font-['Aptos'] text-[18px] leading-[1.6] text-[#111111]">
                  {slideData?.columnB_paragraph || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit. Mauris in convallis eros, in aliquet risus. Donec sit amet leo ut odio vehicula gravida at vitae leo."}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-5 flex items-center justify-center">
            <div className="box-border border-[8px] border-[#333333] w-[520px] h-[620px] flex items-center justify-center">
              <div className="box-border border-[6px] border-[#7d7d7d] w-[488px] h-[588px] bg-white flex items-center justify-center">
                <img src={slideData?.image?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"} alt={slideData?.image?.__image_prompt__ || ""} className="w-[456px] h-[556px] object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-6 bottom-6 flex items-center gap-4 text-[#2a1449]">
          <div className="font-['Times New'] text-[11px] leading-[1]">{slideData?.footer?.slideNumber || footer.slideNumber}</div>
          <div className="w-[1px] h-[14px] bg-[#2a1449]/30"></div>
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.footer?.presentationName || footer.presentationName}</div>
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