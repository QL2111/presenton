const ImageSchema = z.object({
  __image_url__: z.string().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg").meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().min(0).max(200).default("abstract colorful landscape placeholder").meta({
    description: "Prompt used to generate or describe the image. Max 30 words",
  }),
})

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_query__: z.string().min(1).max(30).default("i").meta({
    description: "Query used to search the icon. Max 3 words",
  }),
})

const layoutId = "framed-image-xx-title-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a framed image area on the left, a right title column with SVG dividers, and footer items."

const Schema = z.object({
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "framed photo placeholder landscape",
  }).meta({
    description: "Framed picture used in the left pane. Image must not be embedded inside an SVG.",
  }),
  bigLabel: z.string().min(2).max(6).default("XX.").meta({
    description: "Large label shown on the right column. Capacity: min 2 chars, max 6 chars",
  }),
  chapterTitle: z.string().min(20).max(120).default("Cliquez pour modifier le\ntitre du chapitre").meta({
    description: "Chapter title on the right column; supports line breaks. Capacity: min 20 chars, max 120 chars",
  }),
  slideNumber: z.string().min(1).max(4).default("15").meta({
    description: "Slide number in footer. Capacity: min 1 char, max 4 chars",
  }),
  presentationName: z.string().min(8).max(40).default("Nom de la présentation").meta({
    description: "Presentation name in footer. Capacity: min 8 chars, max 40 chars",
  }),
  logo: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "i",
  }).meta({
    description: "Footer logo replaced by a circle 'i'.",
  }),
})

type FramedImageXXTitleSlideData = z.infer<typeof Schema>

interface FramedImageXXTitleLayoutProps {
  data?: Partial<FramedImageXXTitleSlideData>
}

const dynamicSlideLayout: React.FC<FramedImageXXTitleLayoutProps> = ({ data: slideData }) => {
  const imgUrl = slideData?.image?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"
  const bigLabel = slideData?.bigLabel || "XX."
  const chapterTitle = slideData?.chapterTitle || "Cliquez pour modifier le\ntitre du chapitre"

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="h-full w-full grid grid-cols-12 gap-6 px-8 py-8 items-start">
          {/* LEFT: framed picture area (col 1-6) */}
          <div className="col-span-6 flex items-center justify-center">
            <div className="w-[560px] h-[560px] border-[8px] border-[#3a3a3a] box-border flex items-center justify-center">
              <div className="w-[520px] h-[520px] border-[6px] border-[#7d7d7d] box-border bg-white flex items-center justify-center">
                {/* Image (never inside svg) */}
                <img src={imgUrl} alt={slideData?.image?.__image_prompt__ || ""} className="w-[480px] h-[480px] object-cover" />
              </div>
            </div>
          </div>

          {/* RIGHT: title + divider + subtitle (col 7-12) */}
          <div className="col-span-6 flex flex-col justify-start pl-8 relative">
            <svg className="absolute left-0 top-16 h-[420px] w-[140px] pointer-events-none" viewBox="0 0 140 420" preserveAspectRatio="none" aria-hidden="true">
              <line x1="32" y1="0" x2="32" y2="420" stroke="#7b1f63" strokeWidth="3" strokeLinecap="butt" />
              <line x1="32" y1="120" x2="140" y2="120" stroke="#7b1f63" strokeWidth="3" strokeLinecap="butt" />
            </svg>

            {/* Text capacity: min 2 chars, max 6 chars */}
            <div className="ml-[56px] text-[187px] leading-[0.85] font-['Tahoma'] text-[#2a1449] select-none">
              {bigLabel}
            </div>

            <div className="mt-[48px] ml-[56px] max-w-[600px]">
              {/* Text capacity: min 20 chars, max 120 chars */}
              <div className="text-[44px] leading-[1.15] font-['Tahoma'] text-[#2a1449]">
                {chapterTitle.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer left */}
        <div className="absolute left-6 bottom-6 flex items-center gap-4 text-[#2a1449]">
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.slideNumber || "15"}</div>
          <div className="w-[1px] h-[14px] bg-[#2a1449]/40"></div>
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.presentationName || "Nom de la présentation"}</div>
        </div>

        {/* Footer right */}
        <div className="absolute right-6 bottom-6 flex items-center">
          <div className="flex items-center justify-center w-[120px]">
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