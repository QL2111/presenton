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

const layoutId = "header-columns-stacked-cards-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, column headings, and stacked cards with connectors"

const Schema = z.object({
  title: z.string().min(10).max(60).default("Cliquez pour modifier le titre 21").meta({
    description: "Header title text. Max 8 words",
    maxWords: 8,
  }),
  columnsLeft: z.array(z.object({
    text: z.string().min(10).max(40).default("Cliquez pour ajouter du texte").meta({
      description: "Left narrow card text",
      maxWords: 8,
    }),
  })).min(2).max(2).default([
    { text: "Cliquez pour ajouter du texte" },
    { text: "Cliquez pour ajouter du texte" }
  ]).meta({
    description: "Left column narrow cards",
  }),
  columnsMain: z.array(z.object({
    heading: z.string().min(6).max(30).default("Modifiez le titre").meta({
      description: "Column heading above cards. Max 4 words",
      maxWords: 4,
    }),
    topCard: z.object({
      content: z.string().min(10).max(150).default("Cliquez pour ajouter du texte").meta({
        description: "Top card content. Grows vertically. Max 25 words",
        maxWords: 25,
      }),
    }).default({
      content: "Cliquez pour ajouter du texte"
    }),
    bottomCard: z.object({
      content: z.string().min(10).max(140).default("Cliquez pour ajouter du texte").meta({
        description: "Bottom card content. Grows vertically. Max 24 words",
        maxWords: 24,
      }),
    }).default({
      content: "Cliquez pour ajouter du texte"
    })
  })).min(1).max(5).default([
    {
      heading: "Modifiez le titre",
      topCard: { content: "Cliquez pour ajouter du texte" },
      bottomCard: { content: "Cliquez pour ajouter du texte" }
    },
    {
      heading: "Modifiez le titre",
      topCard: { content: "Cliquez pour ajouter du texte" },
      bottomCard: { content: "Cliquez pour ajouter du texte" }
    },
    {
      heading: "Modifiez le titre",
      topCard: { content: "Cliquez pour ajouter du texte" },
      bottomCard: { content: "Cliquez pour ajouter du texte" }
    },
    {
      heading: "Modifiez le titre",
      topCard: { content: "Cliquez pour ajouter du texte" },
      bottomCard: { content: "Cliquez pour ajouter du texte" }
    },
    {
      heading: "Modifiez le titre",
      topCard: { content: "Cliquez pour ajouter du texte" },
      bottomCard: { content: "Cliquez pour ajouter du texte" }
    }
  ]).meta({
    description: "Main columns each with a heading, top card and bottom card. Max 5 columns",
  }),
  slideNumber: z.string().min(1).max(4).default("34").meta({
    description: "Slide number shown in footer. Max 4 chars",
    maxWords: 1,
  }),
  presentationName: z.string().min(3).max(40).default("Nom de la présentation").meta({
    description: "Presentation name shown in footer",
    maxWords: 6,
  }),
  brandIcon: IconSchema.default({
    __icon_url__: "",
    __icon_prompt__: "brand circle with i"
  }).meta({
    description: "Brand replacement icon represented as a circle with 'i'",
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const leftCards = slideData?.columnsLeft || []
  const mainCols = slideData?.columnsMain || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        {/* Title capacity: min 10 / max 60 chars */}
        <div className="px-12 pt-8">
          <h1 className="font-['Tahoma'] text-[48px] leading-tight text-[#2a1449]">
            {slideData?.title || "Cliquez pour modifier le titre 21"}
          </h1>
        </div>

        {/* Top headings + card grid */}
        <div className="px-12 mt-6 grid grid-cols-6 gap-x-6">
          {/* Left narrow column with two tall side cards */}
          <div className="flex flex-col gap-y-6">
            {/* Left card 1 capacity: min 10 / max 40 chars */}
            <div className="w-[140px] h-[160px] bg-[#f2f0f3] rounded-md border border-[#efeaf0] p-4 flex items-center">
              <span className="text-[20px] font-['Tahoma'] text-[#000000] leading-snug">
                <span className="text-[#cf022b] mr-2 align-top">•</span>
                {leftCards?.[0]?.text || "Cliquez pour ajouter du texte"}
              </span>
            </div>

            {/* Left card 2 capacity: min 10 / max 40 chars */}
            <div className="w-[140px] h-[160px] bg-[#f2f0f3] rounded-md border border-[#efeaf0] p-4 flex items-center">
              <span className="text-[20px] font-['Tahoma'] text-[#000000] leading-snug">
                <span className="text-[#cf022b] mr-2 align-top">•</span>
                {leftCards?.[1]?.text || "Cliquez pour ajouter du texte"}
              </span>
            </div>
          </div>

          {/* Five main columns */}
          {mainCols.map((col, colIndex) => (
            <div key={colIndex} className="col-span-1">
              {/* Column heading capacity: min 6 / max 30 chars */}
              <div className="w-[220px] h-3 rounded-sm bg-gradient-to-r from-[#7f278f] to-[#cf022b]"></div>
              <h3 className="mt-3 text-center font-['Tahoma'] font-semibold text-[20px] text-[#4d1d82]">
                {col?.heading || "Modifiez le titre"}
              </h3>

              {/* Top card capacity: min 10 / max 150 chars */}
              <div className="mt-4 h-[200px] bg-white rounded-md border border-[#f3eef6] shadow-sm p-6 flex items-start overflow-hidden">
                <div>
                  <span className="text-[#cf022b] mr-3">•</span>
                  <p className="font-['Tahoma'] text-[20px] text-[#000000] leading-relaxed">
                    {col?.topCard?.content || "Cliquez pour ajouter du texte"}
                  </p>
                </div>
              </div>

              {/* Chevron connector SVG */}
              <div className="flex justify-center -mt-2">
                <svg width="44" height="28" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                  <path d="M4 4 L22 22 L40 4" stroke="#6b1f7f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>

              {/* Bottom card capacity: min 10 / max 140 chars */}
              <div className="mt-0 h-[180px] bg-white rounded-md border border-[#f3eef6] shadow-sm p-6 flex items-start overflow-hidden">
                <div>
                  <span className="text-[#cf022b] mr-3">•</span>
                  <p className="font-['Tahoma'] text-[20px] text-[#000000] leading-relaxed">
                    {col?.bottomCard?.content || "Cliquez pour ajouter du texte"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer left: page number and deck name */}
        <div className="absolute bottom-4 left-8 flex items-center space-x-3">
          <span className="font-['Tahoma'] text-[11px] text-[#4d1d82]">{slideData?.slideNumber || "34"}</span>
          <span className="font-['Tahoma'] text-[11px] text-[#000000]">|</span>
          <span className="font-['Tahoma'] text-[11px] text-[#000000]">{slideData?.presentationName || "Nom de la présentation"}</span>
        </div>

        {/* Footer right: brand placeholder replaced with circle 'i' */}
        <div className="absolute bottom-4 right-8">
          <div className="w-[140px] h-[36px] flex items-center justify-center">
            <div className="w-[120px] h-[36px] rounded-full bg-white flex items-center justify-center border border-[#00000010]">
              <span className="font-['Arial'] text-[20px] text-[#000000]">i</span>
            </div>
          </div>
        </div>

        {/* Capacity comments (annotations) */}
        {/* Title capacity: min 10 / max 60 chars */}
        {/* Column heading capacity: min 6 / max 30 chars */}
        {/* Top card content: min 10 / max 150 chars (grows vertically) */}
        {/* Bottom card content: min 10 / max 140 chars (grows vertically) */}
        {/* Left narrow cards: min 10 / max 40 chars each */}
        {/* Bullets: min 1 / max 3 visible lines per card before vertical growth */}
      </div>
    </>
  )
}