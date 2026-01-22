const IconSchema = z.object({
  __icon_url__: z.string().default("").meta({
    description: "URL to icon",
  }),
  __icon_query__: z.string().min(1).max(10).default("i").meta({
    description: "Query used to search the icon. Max 3 words",
  }),
})

const BulletSchema = z.lazy(() =>
  z.object({
    text: z.string().min(5).max(140).default("Cliquez pour modifier les styles du texte du masque").meta({
      description: "Bullet text for this level. Max 20 words",
    }),
    children: z.array(BulletSchema).min(0).max(3).default([]).meta({
      description: "Nested bullet items for the next level. Max 3 levels deep",
    }),
  })
)

const layoutId = "centered-card-bullets-footer-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a centered content card, title, nested bulleted list, footer row, and decorative gradient bar."

const Schema = z.object({
  title: z.string().min(20).max(80).default("Modifiez le style de l’introduction").meta({
    description: "Main title text. Max 10 words",
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
  ]).meta({
    description: "Top-level bullets with optional nested children. Top-level min 1, max 6",
  }),
  pageNumber: z.string().default("10").meta({
    description: "Slide page number text. Max 4 characters",
  }),
  presentationName: z.string().min(5).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer. Max 6 words",
  }),
  logo: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "i",
  }).meta({
    description: "Footer logo replaced with circle 'i'.",
  }),
})

type CenteredCardBulletsSlideData = z.infer<typeof Schema>

interface CenteredCardBulletsLayoutProps {
  data?: Partial<CenteredCardBulletsSlideData>
}

const dynamicSlideLayout: React.FC<CenteredCardBulletsLayoutProps> = ({ data: slideData }) => {
  const bullets = slideData?.bullets || []
  const renderBullets = (items?: typeof bullets, level = 0) => {
    if (!items || items.length === 0) return null
    return items.map((item, idx) => (
      <div key={`${level}-${idx}`} className={`${level === 0 ? "" : "ml-8"} mt-4`}>
        <div className="flex items-start gap-4">
          <div className="flex-none mt-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${level === 0 ? "bg-[#cf022b]" : "bg-[#000000]"}`}
            ></span>
          </div>
          <p className={`font-['Tahoma'] ${level >= 2 ? "text-[18px]" : level === 3 ? "text-[16px]" : "text-[20px]"} text-[#222] leading-relaxed`}>
            {item?.text}
          </p>
        </div>
        {item?.children && item?.children.length > 0 ? renderBullets(item.children, level + 1) : null}
      </div>
    ))
  }

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="mx-auto my-8 w-[880px] h-[560px] rounded-md border border-[#efeaf4] shadow-sm bg-white overflow-hidden">
          <div className="px-12 pt-10">
            {/* Text capacity: min 20 chars, max 80 chars */}
            <h1 className="font-['Tahoma'] text-[#2a1449] text-[46px] leading-tight">
              {slideData?.title || "Modifiez le style de l’introduction"}
            </h1>
          </div>

          <div className="px-16 pt-8">
            <div className="max-w-[640px]">
              {/* Bullet capacity comment: supports min 1 top-level bullet, max 6 concise top-level bullets. Nested levels: min 0, max 3 levels deep. */}
              {renderBullets(bullets)}
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 flex items-center justify-between px-8 py-4 bg-transparent">
          <div className="flex items-center gap-4 ml-6">
            <div className="font-['Tahoma'] text-[12px] text-[#2a1449]">
              {slideData?.pageNumber || "10"}
            </div>
            <div className="h-[18px] w-px bg-[#6b5a6b]"></div>
            <div className="font-['Tahoma'] text-[12px] text-[#4b3a4b]">
              {slideData?.presentationName || "Nom de la présentation"}
            </div>
          </div>

          <div className="flex items-center gap-4 mr-8">
            {slideData?.logo?.__icon_url__ ? (
              <img
                src={slideData?.logo?.__icon_url__}
                alt={slideData?.logo?.__icon_query__ || "logo"}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#2b2540] flex items-center justify-center text-white font-['Tahoma'] text-[16px]">
                {slideData?.logo?.__icon_query__ || "i"}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-[46px] left-0 w-full h-[18px] bg-gradient-to-r from-[#c8142f] via-[#d65a2b] to-[#f07d00]"></div>
      </div>
    </>
  )
}