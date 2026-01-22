const ImageSchema = z.object({
  "__image_url__": z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"),
  "__image_prompt__": z.string().min(3).max(200).default("Abstract colorful gradient background").meta({
    description: "Prompt used to generate or describe the image. Max 30 words",
    maxWords: 30
  })
})

const IconSchema = z.object({
  "__icon_url__": z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"),
  "__icon_query__": z.string().min(2).max(60).default("sopra steria logo").meta({
    description: "Query or prompt used to find the icon. Max 8 words",
    maxWords: 8
  })
})

const layoutId = "title-subtitle-rule-right-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, subtitle, horizontal rule, decorative slogan, and logos"

const Schema = z.object({
  title: z.string().min(5).max(80).default("PowerPoint Corporate 16/9_FR").meta({
    description: "Main header text. Max characters conservatively estimated",
    maxWords: 8
  }),
  subtitle: z.string().min(8).max(200).default("Cliquez pour modifier le sous-titre de la présentation").meta({
    description: "Supporting subtitle text",
    maxWords: 30
  }),
  slogan: z.string().min(3).max(60).default("The world is how we shape it*").meta({
    description: "Small decorative slogan",
    maxWords: 8
  }),
  backgroundImage: ImageSchema.default({
    "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    "__image_prompt__": "Abstract corporate gradient background orange purple"
  }).meta({
    description: "Background image for the slide"
  }),
  topRightLogo: IconSchema.default({
    "__icon_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    "__icon_query__": "top right corporate logo"
  }).meta({
    description: "Top right brand logo replacement"
  }),
  footerLogo: IconSchema.default({
    "__icon_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    "__icon_query__": "footer brand logo"
  }).meta({
    description: "Footer brand logo replacement"
  }),
  footerText: z.string().min(3).max(80).default("Nom de la présentation").meta({
    description: "Footer presentation name",
    maxWords: 8
  }),
  pageNumber: z.string().min(1).max(6).default("1").meta({
    description: "Footer page number",
    maxWords: 1
  }),
  decorativeRule: z.object({
    "visible": z.boolean().default(true),
    "widthPercent": z.number().min(10).max(100).default(66)
  }).default({
    "visible": true,
    "widthPercent": 66
  }).meta({
    description: "Horizontal decorative rule settings"
  }),
  chart: z.object({
    "chartType": z.enum(["none", "bar", "line", "pie", "donut"]).default("none"),
    "data": z.array(z.object({
      "name": z.string().default("A"),
      "value": z.number().default(0)
    })).min(0).max(20).default([])
  }).default({
    "chartType": "none",
    "data": []
  }).meta({
    description: "Optional chart data and type"
  }),
  mermaid: z.object({
    "code": z.string().default("graph TD; A-->B;")
  }).default({
    "code": "graph TD; A-->B;"
  }).meta({
    description: "Mermaid diagram code placeholder"
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const title = slideData?.title || Schema.shape.title.default
  const subtitle = slideData?.subtitle || Schema.shape.subtitle.default
  const slogan = slideData?.slogan || Schema.shape.slogan.default
  const bg = slideData?.backgroundImage || Schema.shape.backgroundImage.default
  const topRightLogo = slideData?.topRightLogo || Schema.shape.topRightLogo.default
  const footerLogo = slideData?.footerLogo || Schema.shape.footerLogo.default
  const footerText = slideData?.footerText || Schema.shape.footerText.default
  const pageNumber = slideData?.pageNumber || Schema.shape.pageNumber.default
  const decorativeRule = slideData?.decorativeRule || Schema.shape.decorativeRule.default
  const chart = slideData?.chart || Schema.shape.chart.default
  const mermaid = slideData?.mermaid || Schema.shape.mermaid.default

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img src={bg?.__image_url__} alt={bg?.__image_prompt__} className="absolute inset-0 w-full h-full object-cover" />

        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="flex justify-between items-start px-[64px] pt-[40px]">
            <div className="text-[14px] font-['Tahoma'] text-white">
              {slogan}
            </div>

            <div className="flex items-center space-x-4">
              <img src={topRightLogo?.__icon_url__} alt={topRightLogo?.__icon_query__} className="w-[160px] h-auto object-contain" />
            </div>
          </div>

          <div className="flex-1 flex items-center">
            <div className="w-1/2"></div>

            <div className="w-1/2 pr-[64px]">
              <h1 className="font-['Tahoma'] text-[64px] leading-[0.95] text-white mb-6">
                {title}
              </h1>

              {decorativeRule?.visible ? (
                <div className={`h-[3px] bg-white w-[${decorativeRule.widthPercent}%] mb-6`} />
              ) : null}

              <p className="font-['Tahoma'] text-[20px] text-white/90 leading-[1.3]">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <div className="w-full h-[12px] bg-gradient-to-r from-[#d1112b] via-[#e85a1a] to-[#f08c00]" />

            <div className="flex items-center justify-between px-[64px] py-4">
              <div className="flex items-center space-x-4 text-[12px] text-[#000]">
                <span>{pageNumber}</span>
                <span className="w-[1px] h-[14px] bg-[#bdbdbd] inline-block" />
                <span className="font-['Times New Roman']">{footerText}</span>
              </div>

              <div className="flex items-center">
                <img src={footerLogo?.__icon_url__} alt={footerLogo?.__icon_query__} className="w-[160px] h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        {chart?.chartType && chart?.chartType !== "none" ? (
          <div className="absolute left-[6%] top-[50%] w-[38%] h-[40%]">
            {chart.chartType === "bar" && (
              <div className="w-full h-full">
                <BarChart width={400} height={240} data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </div>
            )}
            {chart.chartType === "line" && (
              <div className="w-full h-full">
                <LineChart width={400} height={240} data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </div>
            )}
            {chart.chartType === "pie" && (
              <div className="w-full h-full flex items-center justify-center">
                <PieChart width={240} height={240}>
                  <Pie data={chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
                </PieChart>
              </div>
            )}
            {chart.chartType === "donut" && (
              <div className="w-full h-full flex items-center justify-center">
                <PieChart width={240} height={240}>
                  <Pie data={chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={80} fill="#8884d8" />
                </PieChart>
              </div>
            )}
          </div>
        ) : null}

        {mermaid?.code ? (
          <div className="absolute left-[6%] top-[6%] w-[40%]">
            <div className="mermaid">
              {mermaid?.code}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}