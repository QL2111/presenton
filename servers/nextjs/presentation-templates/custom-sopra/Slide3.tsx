import React from 'react'
import { z } from 'zod'
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie } from 'recharts'

const ImageSchema = z.object({
  "__image_url__": z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"),
  "__image_prompt__": z.string().min(3).max(200).default("Abstract corporate gradient background").meta({
    description: "Prompt used to describe the image",
    maxWords: 30
  })
})

const IconSchema = z.object({
  "__icon_url__": z.string().url().default("https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"),
  "__icon_query__": z.string().min(2).max(60).default("brand logo placeholder").meta({
    description: "Query or prompt used to find the icon",
    maxWords: 8
  })
})

const layoutId = "header-two-column-swatches-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, two-column content, swatches, preview images, and footer area"

const Schema = z.object({
  title: z.string().min(10).max(60).default("Essentiel de la Charte et Astuces").meta({
    description: "Main header text",
    maxWords: 8
  }),
  topHeaderGradient: z.string().default("from-[#7b1f6a] via-[#b61b57] to-[#c8142f]").meta({
    description: "Tailwind gradient classes for top header"
  }),
  importantCard: z.object({
    heading: z.string().min(4).max(18).default("Important").meta({
      description: "Small card heading",
      maxWords: 3
    }),
    items: z.array(z.object({
      badge: z.string().min(1).max(3).default("1"),
      text: z.string().min(40).max(400).default("Assurez-vous d'utiliser dans le menu « Polices de thème » disponibles en haut de la liste déroulante des polices.")
    })).min(1).max(4).default([
      {
        badge: "1",
        text: "Assurez-vous d'utiliser dans le menu « Polices de thème » disponibles en haut de la liste déroulante des polices."
      },
      {
        badge: "2",
        text: "Assurez-vous d’utiliser ceux du thème Couleur. Sélectionnez « Couleurs de thème » pour les textes et formes."
      }
    ])
  }).default({
    heading: "Important",
    items: [
      {
        badge: "1",
        text: "Assurez-vous d'utiliser dans le menu « Polices de thème » disponibles en haut de la liste déroulante des polices."
      },
      {
        badge: "2",
        text: "Assurez-vous d’utiliser ceux du thème Couleur. Sélectionnez « Couleurs de thème » pour les textes et formes."
      }
    ]
  }),
  tahomaBlock: z.object({
    heading: z.string().min(6).max(24).default("Tahoma"),
    paragraphs: z.array(z.string().min(50).max(800)).min(1).max(6).default([
      "À utiliser pour les formats .pptx pour un fichier modifiable ou .pdf pour un document non modifiable. C’est une police sans empattement populaire conçue par Matthew Carter pour Microsoft en 1994.",
      "L'une des principales caractéristiques est sa lisibilité. Son design simple et épuré la rend facile à lire, en particulier dans les petites tailles."
    ])
  }).default({
    heading: "Tahoma",
    paragraphs: [
      "À utiliser pour les formats .pptx pour un fichier modifiable ou .pdf pour un document non modifiable. C’est une police sans empattement populaire conçue par Matthew Carter pour Microsoft en 1994.",
      "L'une des principales caractéristiques est sa lisibilité. Son design simple et épuré la rend facile à lire, en particulier dans les petites tailles."
    ]
  }),
  typographySample: z.object({
    largeSample: z.string().min(1).max(4).default("aA"),
    sampleLines: z.array(z.string()).min(1).max(6).default([
      "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj",
      "Kk Ll Mm Nn Oo Pp Qq Rr Ss",
      "Tt Uu Vv Ww Xx Yy Zz"
    ])
  }).default({
    largeSample: "aA",
    sampleLines: [
      "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj",
      "Kk Ll Mm Nn Oo Pp Qq Rr Ss",
      "Tt Uu Vv Ww Xx Yy Zz"
    ]
  }),
  pageNumber: z.string().min(1).max(6).default("3"),
  colorsSection: z.object({
    title: z.string().min(7).max(20).default("Couleurs"),
    swatches: z.array(z.object({
      name: z.string().default("Violet foncé"),
      hex: z.string().default("#2A1449")
    })).min(6).max(24).default([
      { name: "Violet foncé", hex: "#2A1449" },
      { name: "Noir", hex: "#1D1D1B" },
      { name: "Blanc", hex: "#DAD2E5" },
      { name: "Violet", hex: "#47207D" },
      { name: "Rouge", hex: "#CF022B" },
      { name: "Orange", hex: "#F07D00" }
    ])
  }).default({
    title: "Couleurs",
    swatches: [
      { name: "Violet foncé", hex: "#2A1449" },
      { name: "Noir", hex: "#1D1D1B" },
      { name: "Blanc", hex: "#DAD2E5" },
      { name: "Violet", hex: "#47207D" },
      { name: "Rouge", hex: "#CF022B" },
      { name: "Orange", hex: "#F07D00" }
    ]
  }),
  gradientBar: z.object({
    label: z.string().default("Dégradé"),
    stops: z.array(z.string()).default(["#47207D", "#b61b57", "#f07d00"]),
    ticks: z.array(z.string()).default(["0%","15%","60%","100%"])
  }).default({
    label: "Dégradé",
    stops: ["#47207D", "#b61b57", "#f07d00"],
    ticks: ["0%","15%","60%","100%"]
  }),
  previewImages: z.array(ImageSchema).min(0).max(6).default([
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "preview screenshot 1" },
    { "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__image_prompt__": "preview screenshot 2" }
  ]),
  footerLogo: IconSchema.default({ "__icon_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__icon_query__": "footer logo" }),
  footerLogoCircle: IconSchema.default({ "__icon_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg", "__icon_query__": "circle i placeholder" }),
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
  const parsedData = Schema.parse(slideData || {});
  const { title, topHeaderGradient: gradientClasses, importantCard: important, tahomaBlock: tahoma, typographySample: typography, pageNumber, colorsSection: colors, gradientBar, previewImages: previews, footerLogo, footerLogoCircle, chart, mermaid } = parsedData;

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className={`w-full h-[120px] flex items-end px-8 pb-6 bg-gradient-to-r ${gradientClasses}`}>
          <h1 className="text-white font-['Tahoma'] text-[46px] leading-tight">{title}</h1>
        </div>

        <div className="flex gap-6 px-8 py-6 h-[calc(100%-120px)]">
          <div className="w-2/3 flex flex-col gap-4">
            <div className="bg-[#f9e6d6] rounded-md p-4 border border-[#e7dcd6] shadow-inner">
              <h2 className="font-['Tahoma'] text-[20px] font-semibold text-[#1f1330] mb-2">{important?.heading}</h2>
              <div className="flex flex-col gap-3">
                {(important?.items || []).map((it, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-none w-7 h-7 bg-[#c61b46] text-white rounded-sm flex items-center justify-center font-['Tahoma'] text-[14px]">{it.badge}</div>
                    <p className="text-[16px] font-['Tahoma'] text-[#222]">{it.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#efe9f3] rounded-md p-4 border border-[#d8d1de]">
              <h3 className="font-['Tahoma'] text-[18px] font-bold text-[#2b2540] mb-2">{tahoma?.heading}</h3>
              {(tahoma?.paragraphs || []).map((p, i) => (
                <p key={i} className="font-['Tahoma'] text-[15px] text-[#2b2540] leading-relaxed mt-3">
                  {p}
                </p>
              ))}
            </div>

            <div className="bg-[#f9e6d6] rounded-md p-6 border border-[#e7dcd6] flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-[#2b2540] font-['Tahoma'] text-[96px] leading-none">{typography?.largeSample}</div>
                <div className="font-['Tahoma'] text-[18px] text-[#2b2540]">
                  {(typography?.sampleLines || []).map((line, idx) => (
                    <div key={idx} className="mb-1">{line}</div>
                  ))}
                </div>
              </div>
              <div className="text-[14px] text-[#6b5a6b] font-['Tahoma']">{pageNumber} &nbsp; |</div>
            </div>
          </div>

          <div className="w-1/3 flex flex-col gap-4">
            <div>
              <h3 className="font-['Tahoma'] text-[18px] font-semibold text-[#2b2540]">{colors?.title}</h3>
              <div className="h-px bg-[#b98aae] mt-2"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <svg width="40" height="28" viewBox="0 0 40 28" className="flex-none"><rect width="40" height="28" fill={colors?.swatches?.[0]?.hex || "#2A1449"}></rect></svg>
                  <div className="text-[12px] font-['Tahoma']">{colors?.swatches?.[0]?.name}<br/><span className="text-[11px] text-[#6b6b6b]">{colors?.swatches?.[0]?.hex}</span></div>
                </div>

                <div className="flex items-center gap-3">
                  <svg width="40" height="28" viewBox="0 0 40 28" className="flex-none"><rect width="40" height="28" fill={colors?.swatches?.[1]?.hex || "#1D1D1B"}></rect></svg>
                  <div className="text-[12px] font-['Tahoma']">{colors?.swatches?.[1]?.name}<br/><span className="text-[11px] text-[#6b6b6b]">{colors?.swatches?.[1]?.hex}</span></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[28px] bg-white border border-[#cfcfcf] flex-none"></div>
                  <div className="text-[12px] font-['Tahoma']">{colors?.swatches?.[2]?.name}<br/><span className="text-[11px] text-[#6b6b6b]">{colors?.swatches?.[2]?.hex}</span></div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <svg width="40" height="28" viewBox="0 0 40 28" className="flex-none"><rect width="40" height="28" fill={colors?.swatches?.[3]?.hex || "#47207D"}></rect></svg>
                  <div className="text-[12px] font-['Tahoma']">{colors?.swatches?.[3]?.name}<br/><span className="text-[11px] text-[#6b6b6b]">{colors?.swatches?.[3]?.hex}</span></div>
                </div>

                <div className="flex items-center gap-3">
                  <svg width="40" height="28" viewBox="0 0 40 28" className="flex-none"><rect width="40" height="28" fill={colors?.swatches?.[4]?.hex || "#CF022B"}></rect></svg>
                  <div className="text-[12px] font-['Tahoma']">{colors?.swatches?.[4]?.name}<br/><span className="text-[11px] text-[#6b6b6b]">{colors?.swatches?.[4]?.hex}</span></div>
                </div>

                <div className="flex items-center gap-3">
                  <svg width="40" height="28" viewBox="0 0 40 28" className="flex-none"><rect width="40" height="28" fill={colors?.swatches?.[5]?.hex || "#F07D00"}></rect></svg>
                  <div className="text-[12px] font-['Tahoma']">{colors?.swatches?.[5]?.name}<br/><span className="text-[11px] text-[#6b6b6b]">{colors?.swatches?.[5]?.hex}</span></div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="font-['Tahoma'] text-[14px] font-semibold mb-2">{gradientBar?.label}</div>
              <div className="h-3 rounded-sm" style={{ background: `linear-gradient(90deg, ${gradientBar?.stops?.[0]} 0%, ${gradientBar?.stops?.[1]} 50%, ${gradientBar?.stops?.[2]} 100%)` }} />
              <div className="flex justify-between text-[12px] text-[#4b3a4b] mt-2">
                {(gradientBar?.ticks || []).map((t, i) => <span key={i}>{t}</span>)}
              </div>
            </div>

            <div className="flex gap-3 mt-4 items-end">
              {(previews || []).map((img, idx) => (
                <img key={idx} src={img.__image_url__} alt={img.__image_prompt__} className="w-[120px] h-[70px] object-cover rounded-md border border-[#ddd]" />
              ))}
            </div>

            <div className="mt-auto flex justify-end items-center">
              <div className="w-[120px] h-[36px] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#2b2540] flex items-center justify-center text-white font-['Tahoma'] text-[16px]">i</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[18px] bg-gradient-to-r from-[#c8142f] via-[#d65a2b] to-[#f07d00]"></div>

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

export default dynamicSlideLayout;
export { Schema, layoutId, layoutName, layoutDescription };