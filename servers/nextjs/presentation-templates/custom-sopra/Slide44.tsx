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

const layoutId = "quote-with-author-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a background image, a quote area, an author block, and footer"

const Schema = z.object({
  backgroundImage: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    __image_prompt__: "abstract gradient background placeholder"
  }).meta({
    description: "Background image used behind content",
    maxWords: 10,
  }),
  quote: z.string().min(120).max(420).default("Referente praesente inclitis ministro parietes timebantur susurrasset inclitis in interdum ut Marcio aurem acciderat imperator aurem siquid referente ideoque disceret arcanorum in arcanorum postridie.").meta({
    description: "Main quote text shown in the left area. Max ~70 words",
    maxWords: 70,
  }),
  authorName: z.string().min(6).max(24).default("Prénom Nom").meta({
    description: "Author display name",
    maxWords: 4,
  }),
  authorRole: z.string().min(4).max(40).default("Poste").meta({
    description: "Author role or title",
    maxWords: 6,
  }),
  slideNumber: z.string().min(1).max(3).default("44").meta({
    description: "Slide number shown in footer",
    maxWords: 1,
  }),
  presentationName: z.string().min(10).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer",
    maxWords: 6,
  }),
  brandIcon: IconSchema.default({
    __icon_url__: "",
    __icon_prompt__: "brand circle with i"
  }).meta({
    description: "Brand replacement icon as circle 'i'",
    maxWords: 4,
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img
          src={slideData?.backgroundImage?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"}
          alt={slideData?.backgroundImage?.__image_prompt__ || ""}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="h-full grid" style={{ gridTemplateColumns: "1fr 360px" }}>
          <div className="flex items-center pl-[120px] pr-8">
            <div className="max-w-[820px]">
              <div className="flex items-start gap-6">
                <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-4 flex-shrink-0">
                  <path d="M6 0h10l-6 18H16l-6 18H6L12 0z" fill="#FFFFFF"/>
                  <path d="M30 0h10l-6 18H40l-6 18H30L36 0z" fill="#FFFFFF"/>
                </svg>

                {/* Quote capacity: min 120 chars, max 420 chars */}
                <p className="text-[48px] leading-[56px] font-['Tahoma'] italic text-white">
                  {slideData?.quote || "Referente praesente inclitis ministro parietes timebantur susurrasset inclitis in interdum ut Marcio aurem acciderat imperator aurem siquid referente ideoque disceret arcanorum in arcanorum postridie."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center pr-[96px]">
            <div className="w-full">
              {/* Name capacity: min 6 chars, max 24 chars */}
              <div className="text-[28px] leading-[32px] font-['Tahoma'] font-semibold text-white">
                {slideData?.authorName || "Prénom Nom"}
              </div>
              {/* Role capacity: min 4 chars, max 40 chars */}
              <div className="text-[20px] leading-[28px] font-['Tahoma'] text-white mt-2">
                {slideData?.authorRole || "Poste"}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 flex items-end justify-between pb-[18px]">
          <div className="flex items-center pl-[64px]">
            {/* Slide number capacity: 1-3 chars */}
            <div className="text-[11px] leading-[12px] font-['Tahoma'] text-white/90 mr-4">
              {slideData?.slideNumber || "44"}
            </div>
            <div className="h-[12px] border-l border-white/30 mr-4"></div>
            {/* Presentation name capacity: min 10 chars, max 40 chars */}
            <div className="text-[11px] leading-[12px] font-['Times New Roman'] text-white/90">
              {slideData?.presentationName || "Nom de la présentation"}
            </div>
          </div>

          <div className="pr-[48px]">
            <div className="w-[120px] h-[36px] rounded-full bg-white flex items-center justify-center">
              <span className="text-[18px] font-['Tahoma'] text-[#6b1b66]">i</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}