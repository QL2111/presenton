const ImageSchema = z.object({
  "__image_url__": z.string().url().meta({
    description: "URL to image",
  }),
  "__image_prompt__": z.string().meta({
    description: "Prompt used to generate the image. Max 10 words",
  }).min(3).max(60),
});

const IconSchema = z.object({
  "__icon_url__": z.string().meta({
    description: "URL to icon",
  }),
  "__icon_prompt__": z.string().meta({
    description: "Prompt used to find or generate the icon. Max 5 words",
  }).min(1).max(40),
});

const SectionSchema = z.object({
  heading: z.string().min(8).max(36).default("Modifiez texte").meta({
    description: "Section heading. Max 6 words",
  }),
  intro: z.string().min(40).max(400).default("Cliquez pour modifier les styles du texte du masque").meta({
    description: "Short intro or subtitle for the section. Max 60 words",
  }),
  body: z.string().min(40).max(400).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit.").meta({
    description: "Main paragraph text for the section. Max 80 words",
  }),
});

const layoutId = "header-stacked-sections-slide";
const layoutName = "dynamicSlideLayout";
const layoutDescription = "A slide with a header, stacked sections, and footer";

const Schema = z.object({
  title: z.string().min(20).max(80).default("Cliquez pour modifier le titre 30").meta({
    description: "Main title of the slide. Max 12 words",
  }),
  sections: z.array(SectionSchema).min(3).max(3).default([
    {
      heading: "Modifiez texte",
      intro: "Cliquez pour modifier les styles du texte du masque",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit.",
    },
    {
      heading: "Modifiez texte",
      intro: "Cliquez pour modifier les styles du texte du masque",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit.",
    },
    {
      heading: "Modifiez texte",
      intro: "Cliquez pour modifier les styles du texte du masque",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit.",
    },
  ]).meta({
    description: "Stacked content sections displayed vertically. Exactly 3 sections",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(3).default("47").meta({
      description: "Slide number displayed in footer. Max 3 chars",
    }),
    presentationName: z.string().min(10).max(40).default("Nom de la présentation").meta({
      description: "Presentation name shown in footer. Max 7 words",
    }),
  }).default({
    slideNumber: "47",
    presentationName: "Nom de la présentation",
  }).meta({
    description: "Footer metadata",
  }),
});

type SlideData = z.infer<typeof Schema>;

interface SlideLayoutProps {
  data?: Partial<SlideData>;
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const sections = slideData?.sections || [];
  const footer = slideData?.footer;

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        {/* Title capacity: min 20 chars, max 80 chars */}
        <div className="pt-[28px] pl-[64px] pr-[64px]">
          <h1 className="text-[48px] leading-[56px] font-['Tahoma'] text-[#2a1449]">
            {slideData?.title || "Cliquez pour modifier le titre 30"}
          </h1>
        </div>

        <div className="mt-[36px] px-[64px] space-y-[36px]">
          {sections.map((sec, idx) => (
            <section key={idx}>
              {/* Heading capacity: min 8 chars, max 36 chars */}
              <div className="text-[22px] leading-[26px] font-['Tahoma'] font-semibold text-[#4d1d82]">
                {sec?.heading || "Modifiez texte"}
              </div>
              <div className="w-[36px] h-[4px] bg-[#4d1d82] mt-2" />

              {/* Body capacity: min 40 chars, max 400 chars */}
              <p className="mt-4 text-[19px] leading-[1.65] font-['Arial'] text-[#111111]">
                {sec?.intro || "Cliquez pour modifier les styles du texte du masque"}
              </p>

              <p className="mt-4 text-[19px] leading-[1.65] font-['Arial'] text-[#111111]">
                {sec?.body || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris dui. Morbi ultricies aliquet nibh, non vehicula nibh elementum id. Maecenas ultrices, elit vitae luctus mattis, orci tellus fringilla tortor, sit amet volutpat tortor turpis a elit."}
              </p>

              <div className="mt-6 border-t-[3px] border-[#4d1d82]" />
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute left-0 right-0 bottom-0 flex items-end justify-between pb-[20px] px-[64px]">
          <div className="flex items-center gap-4">
            {/* Slide number capacity: 1-3 chars */}
            <div className="text-[11px] leading-[12px] font-['Tahoma'] text-[#2a1449]">
              {footer?.slideNumber || "47"}
            </div>
            <div className="h-[12px] border-l border-[#e6e0e8]" />
            {/* Presentation name capacity: min 10 chars, max 40 chars */}
            <div className="text-[11px] leading-[12px] font-['Times New Roman'] text-[#2a1449]">
              {footer?.presentationName || "Nom de la présentation"}
            </div>
          </div>

          {/* Brand replaced with circular "i" */}
          <div>
            <div className="w-[120px] h-[36px] rounded-full bg-white flex items-center justify-center">
              <span className="text-[18px] font-['Tahoma'] text-[#b8123a]">i</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};