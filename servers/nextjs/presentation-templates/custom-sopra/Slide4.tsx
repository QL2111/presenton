const ImageSchema = z.object({
  "__image_url__": z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"),
  "__image_prompt__": z.string().min(3).max(200).default("Photo placeholder").meta({
    description: "Prompt used to describe or generate the image",
    maxWords: 30
  })
})

const IconSchema = z.object({
  "__icon_url__": z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"),
  "__icon_query__": z.string().min(2).max(60).default("logo placeholder").meta({
    description: "Query or prompt used to find the icon",
    maxWords: 8
  })
})

const layoutId = "header-two-column-gallery-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, two-column layout, info cards, galleries, and footer area"

const Schema = z.object({
  title: z.string().min(10).max(60).default("Essentiel de la Charte et Astuces").meta({
    description: "Main header text",
    maxWords: 8
  }),
  topHeaderGradient: z.string().default("from-[#7b1f6a] via-[#b61b57] to-[#c8142f]").meta({
    description: "Tailwind gradient classes for top header"
  }),
  leftSectionTitle: z.string().min(4).max(40).default("Iconographie photo").meta({
    description: "Left column section title",
    maxWords: 4
  }),
  infoCard: z.object({
    label: z.string().min(6).max(40).default("Comment les\nSélectionner ?").meta({
      description: "Left card label",
      maxWords: 6
    }),
    bullets: z.array(z.object({
      badge: z.string().min(1).max(3).default("1"),
      text: z.string().min(20).max(120).default("Les poses sont authentiques, issues de situations réelles.").meta({
        description: "Concise bullet text",
        maxWords: 20
      })
    })).min(2).max(6).default([
      { badge: "1", text: "Les poses sont authentiques, issues de situations réelles." },
      { badge: "2", text: "Les photos possèdent une profondeur de champ importante." },
      { badge: "3", text: "Les lumières et l'éclairage des scènes représentées sont naturels." },
      { badge: "4", text: "Des couleurs vibrantes." }
    ]).meta({
      description: "Numbered bullets in the info card"
    })
  }).default({
    label: "Comment les\nSélectionner ?",
    bullets: [
      { badge: "1", text: "Les poses sont authentiques, issues de situations réelles." },
      { badge: "2", text: "Les photos possèdent une profondeur de champ importante." },
      { badge: "3", text: "Les lumières et l'éclairage des scènes représentées sont naturels." },
      { badge: "4", text: "Des couleurs vibrantes." }
    ]
  }),
  galleryPhotos: z.array(ImageSchema).min(1).max(8).default([
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "photo 1" },
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "photo 2" },
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "photo 3" },
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "photo 4" }
  ]).meta({
    description: "Gallery images for the left column",
    maxItems: 8
  }),
  importantBlock: z.object({
    heading: z.string().min(4).max(24).default("Important"),
    paragraphs: z.array(z.string().min(30).max(400)).min(1).max(6).default([
      "Lorsqu'une image est supprimée d'un espace réservé à une image, cette dernière se place automatiquement au premier plan.",
      "Si un espace réservé d'image chevauche un autre élément, vous devez l'envoyer à l'arrière-plan.",
      "Faites un clic droit sur l'image > Mettre à l'arrière plan ou arrière-plan"
    ])
  }).default({
    heading: "Important",
    paragraphs: [
      "Lorsqu'une image est supprimée d'un espace réservé à une image, cette dernière se place automatiquement au premier plan.",
      "Si un espace réservé d'image chevauche un autre élément, vous devez l'envoyer à l'arrière-plan.",
      "Faites un clic droit sur l'image > Mettre à l'arrière plan ou arrière-plan"
    ]
  }),
  rightSectionTitle: z.string().min(6).max(40).default("Iconographie 3D").meta({
    description: "Right column section title",
    maxWords: 3
  }),
  usageCard: z.object({
    intro: z.string().min(10).max(200).default("Son utilisation permet d’investir les images de la tech, du web 3, de l’IA Générative."),
    bullets: z.array(z.object({
      badge: z.string().min(1).max(3).default("1"),
      text: z.string().min(10).max(200).default("Son utilisation doit toujours être justifiée.")
    })).min(1).max(4).default([
      { badge: "1", text: "Son utilisation doit toujours être justifiée." },
      { badge: "2", text: "L'intégration d'une ou plusieurs couleurs de notre dégradé propriétaire." }
    ])
  }).default({
    intro: "Son utilisation permet d’investir les images de la tech, du web 3, de l’IA Générative.",
    bullets: [
      { badge: "1", text: "Son utilisation doit toujours être justifiée." },
      { badge: "2", text: "L'intégration d'une ou plusieurs couleurs de notre dégradé propriétaire." }
    ]
  }),
  rightGallery: z.array(ImageSchema).min(1).max(6).default([
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "3d image 1" },
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "3d image 2" },
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "3d image 3" }
  ]),
  footerLogoCircle: IconSchema.default({ "__icon_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__icon_query__": "footer circle i" }),
  bottomGradient: z.string().default("from-[#c8142f] via-[#d65a2b] to-[#f07d00]"),
  chart: z.object({
    chartType: z.enum(["none","bar","line","pie","donut"]).default("none"),
    data: z.array(z.object({ name: z.string().default("A"), value: z.number().default(0) })).min(0).max(20).default([])
  }).default({ chartType: "none", data: [] }),
  mermaid: z.object({ code: z.string().default("graph TD; A-->B;") }).default({ code: "graph TD; A-->B;" })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const title = slideData?.title || Schema.shape.title.default
  const gradient = slideData?.topHeaderGradient || Schema.shape.topHeaderGradient.default
  const leftTitle = slideData?.leftSectionTitle || Schema.shape.leftSectionTitle.default
  const infoCard = slideData?.infoCard || Schema.shape.infoCard.default
  const gallery = slideData?.galleryPhotos || Schema.shape.galleryPhotos.default
  const important = slideData?.importantBlock || Schema.shape.importantBlock.default
  const rightTitle = slideData?.rightSectionTitle || Schema.shape.rightSectionTitle.default
  const usage = slideData?.usageCard || Schema.shape.usageCard.default
  const rightGallery = slideData?.rightGallery || Schema.shape.rightGallery.default
  const footerIcon = slideData?.footerLogoCircle || Schema.shape.footerLogoCircle.default
  const bottomGradient = slideData?.bottomGradient || Schema.shape.bottomGradient.default
  const chart = slideData?.chart || Schema.shape.chart.default
  const mermaid = slideData?.mermaid || Schema.shape.mermaid.default

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className={`w-full h-[120px] flex items-end px-8 pb-6 bg-gradient-to-r ${gradient}`}>
          <h1 className="text-white font-['Tahoma'] text-[46px] leading-tight">{title}</h1>
        </div>

        <div className="flex gap-6 px-8 py-6 h-[calc(100%-120px)]">
          <div className="w-2/3 flex flex-col gap-5">
            <div>
              <h2 className="font-['Tahoma'] text-[20px] font-bold text-[#1f1330]">{leftTitle}</h2>
              <div className="h-px bg-[#e6dff0] mt-2"></div>
            </div>

            <div className="bg-[#efeaf4] rounded-md p-4 border border-[#e0d8e7]">
              <div className="flex">
                <div className="flex-none w-[180px] pr-4">
                  <div className="font-['Tahoma'] text-[18px] font-bold text-[#1f1330]">{infoCard?.label}</div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-3">
                    {(infoCard?.bullets || []).map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 bg-[#c61b46] text-white rounded-sm flex items-center justify-center font-['Tahoma'] text-[14px] flex-none">{b.badge}</div>
                        <p className="text-[15px] font-['Tahoma'] text-[#222] leading-snug">{b.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-4 gap-2">
              {(gallery || []).map((img, idx) => (
                <img key={idx} src={img.__image_url__} alt={img.__image_prompt__} className="w-full h-[240px] object-cover rounded-sm border border-[#ded6e2]" />
              ))}
            </div>

            <div className="bg-[#efeaf4] rounded-md p-5 border border-[#e0d8e7]">
              <h3 className="font-['Tahoma'] text-[18px] font-bold text-[#1f1330] mb-2">{important?.heading}</h3>
              {(important?.paragraphs || []).map((p, i) => (
                <p key={i} className={`font-['Tahoma'] text-[15px] text-[#222] leading-relaxed mt-${i === 0 ? "0" : "3"}`}>{p}</p>
              ))}
            </div>
          </div>

          <div className="w-1/3 flex flex-col gap-5">
            <div>
              <h2 className="font-['Tahoma'] text-[20px] font-bold text-[#1f1330]">{rightTitle}</h2>
              <div className="h-px bg-[#e6dff0] mt-2"></div>
            </div>

            <div className="bg-[#f9efe0] rounded-md p-4 border border-[#e9dfcf]">
              <p className="font-['Tahoma'] text-[14px] text-[#222] mb-3">{usage?.intro}</p>

              <div className="flex items-start gap-3">
                <div className="font-['Tahoma'] text-[16px] font-semibold text-[#47207D] mr-2">Utilisation :</div>
                <div className="flex-1">
                  {(usage?.bullets || []).map((b, i) => (
                    <div key={i} className={`flex items-start gap-3 ${i === 0 ? "" : "mt-2"}`}>
                      <div className="w-7 h-7 bg-[#c61b46] text-white rounded-sm flex items-center justify-center font-['Tahoma'] text-[14px] flex-none">{b.badge}</div>
                      <p className="text-[14px] font-['Tahoma'] text-[#222]">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-2">
              {(rightGallery || []).map((img, idx) => (
                <img key={idx} src={img.__image_url__} alt={img.__image_prompt__} className="w-full h-[240px] object-cover rounded-sm border border-[#ded6e2]" />
              ))}
            </div>

            <div className="mt-auto flex justify-end items-center">
              <div className="w-[140px] h-[42px] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#2b2540] flex items-center justify-center text-white font-['Tahoma'] text-[16px]">i</div>
              </div>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 w-full h-[18px] bg-gradient-to-r ${bottomGradient}`}></div>

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
            <div className="mermaid">{mermaid?.code}</div>
          </div>
        ) : null}
      </div>
    </>
  )
}