const ImageSchema = z.object({
  "__image_url__": z.string().url().meta({
    description: "URL to image",
  }),
  "__image_prompt__": z.string().meta({
    description: "Prompt used to generate the image. Max 10 words",
  }).min(3).max(60),
});

const layoutId = "full-bleed-title-footer-slide";
const layoutName = "dynamicSlideLayout";
const layoutDescription = "A slide with a full-bleed background, large title, and footer";

const Schema = z.object({
  background: ImageSchema.default({
    "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    "__image_prompt__": "Abstract colorful blurred background",
  }).meta({
    description: "Full-bleed background image",
  }),
  title: z.string().min(1).max(6).default("Q&R").meta({
    description: "Large title text. Max 6 characters",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(3).default("49").meta({
      description: "Slide number displayed in footer. Max 3 chars",
    }),
    presentationName: z.string().min(10).max(40).default("Nom de la présentation").meta({
      description: "Presentation name shown in footer. Max 7 words",
    }),
  }).default({
    slideNumber: "49",
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
  const background = slideData?.background;
  const footer = slideData?.footer;

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        {/* Background image (full bleed) */}
        <img
          src={background?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"}
          alt={background?.__image_prompt__ || ""}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative flex flex-col h-full">
          {/* Title box (capacity: title min=1 max=6 characters) */}
          <div className="pt-[291px] pl-[129px]">
            <h1 className="m-0 text-[266.667px] leading-[0.85] font-['Tahoma'] text-white select-none">
              {slideData?.title || "Q&R"}
            </h1>
          </div>

          <div className="mt-auto flex items-end justify-between px-[123px] pb-[18px]">
            {/* Footer left */}
            <div className="flex items-center space-x-4 text-[10.67px] font-['Tahoma'] text-white/90">
              <span className="inline-block text-[10.67px]">
                {footer?.slideNumber || "49"}
              </span>
              <span className="block w-[1px] h-[12px] bg-white/60" aria-hidden="true" />
              <span className="font-['Times New Roman'] text-[10.67px]">
                {footer?.presentationName || "Nom de la présentation"}
              </span>
            </div>

            {/* Brand logo replacement: circle with "i" */}
            <div>
              <div className="w-[92px] h-[92px] rounded-full bg-white/0 flex items-center justify-center">
                <div className="w-[64px] h-[64px] rounded-full bg-white flex items-center justify-center text-[28px] font-['Tahoma'] text-red-600">
                  i
                </div>
              </div>
            </div>
          </div>

          {/* thin bottom accent bar */}
          <div className="w-full">
            <div className="h-[10px] w-full bg-gradient-to-r from-[#c81b2f] via-[#ff7a00] to-[#c81b2f]" />
          </div>
        </div>
      </div>
    </>
  );
};