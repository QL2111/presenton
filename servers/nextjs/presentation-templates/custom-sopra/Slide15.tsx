const ImageSchema = z.object({
  __image_url__: z.string().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg").meta({
    description: "URL to image",
    maxWords: 20,
  }),
  __image_prompt__: z.string().min(0).max(200).default("").meta({
    description: "Prompt used to generate or describe the image. Max 30 words",
    maxWords: 30,
  }),
})

const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
    maxWords: 0,
  }),
  __icon_query__: z.string().min(1).max(20).default("i").meta({
    description: "Query used to search the icon. Max 3 words",
    maxWords: 3,
  }),
})

const layoutId = "xx-chapter-split-grid-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a left large label, right chapter title area, SVG dividers, background image, and footer."

const Schema = z.object({
  bigLabel: z.string().min(2).max(6).default("XX.").meta({
    description: "Large left label text. Capacity: min 2 chars, max 6 chars",
    maxWords: 2,
  }),
  chapterTitle: z.string().min(20).max(120).default("Cliquez pour modifier le\ntitre du chapitre").meta({
    description: "Right column chapter title text; supports line breaks. Capacity: min 20 chars, max 120 chars",
    maxWords: 24,
  }),
  background: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "abstract colorful background",
  }).meta({
    description: "Full-bleed background image for the slide",
    maxWords: 30,
  }),
  slideNumber: z.string().min(1).max(4).default("15").meta({
    description: "Slide number text in footer. Capacity: min 1 char, max 4 chars",
    maxWords: 1,
  }),
  presentationName: z.string().min(8).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer. Capacity: min 8 chars, max 40 chars",
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

type XXChapterSplitGridSlideData = z.infer<typeof Schema>

interface XXChapterSplitGridLayoutProps {
  data?: Partial<XXChapterSplitGridSlideData>
}

const dynamicSlideLayout: React.FC<XXChapterSplitGridLayoutProps> = ({ data: slideData }) => {
  const bgUrl = slideData?.background?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"
  const bigLabel = slideData?.bigLabel || "XX."
  const chapterTitle = slideData?.chapterTitle || "Cliquez pour modifier le\ntitre du chapitre"

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img
          src={bgUrl}
          alt={slideData?.background?.__image_prompt__ || ""}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 h-full w-full grid grid-cols-12 px-[56px] py-[40px]">
          <div className="col-span-6 flex items-center">
            {/* Text capacity: min 2 chars, max 6 chars */}
            <div className="text-white font-['Tahoma'] text-[187px] leading-[0.85] tracking-[-4px] select-none">
              {bigLabel}
            </div>
          </div>

          <div className="col-span-6 flex items-center">
            <div className="w-full pl-8">
              {/* Text capacity: min 20 chars, max 120 chars */}
              <div className="text-white font-['Tahoma'] text-[44px] leading-[1.05] max-w-[540px]">
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

        <svg className="absolute z-15" width="1280" height="720" viewBox="0 0 1280 720" preserveAspectRatio="none" aria-hidden="true">
          <line x1="48" y1="324" x2="1232" y2="324" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="butt" />
          <line x1="512" y1="72" x2="512" y2="612" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="butt" />
        </svg>

        <div className="absolute left-6 bottom-6 flex items-center gap-4 text-white/90">
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.slideNumber || "15"}</div>
          <div className="w-[1px] h-[14px] bg-white/40"></div>
          <div className="font-['Tahoma'] text-[11px] leading-[1]">{slideData?.presentationName || "Nom de la présentation"}</div>
        </div>

        <div className="absolute right-6 bottom-6 flex items-center">
          <div className="w-[150px] h-[28px] flex items-center justify-end gap-3">
            {slideData?.logo?.__icon_url__ ? (
              <img
                src={slideData?.logo?.__icon_url__}
                alt={slideData?.logo?.__icon_query__ || "logo"}
                className="w-[36px] h-[36px] rounded-full object-cover"
              />
            ) : (
              <div className="w-[36px] h-[36px] rounded-full bg-white/90 flex items-center justify-center text-[18px] font-['Arial'] text-[#d23b2d]">
                {slideData?.logo?.__icon_query__ || "i"}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}