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

const BulletItemSchema: any = z.lazy(() =>
  z.object({
    text: z.string().min(1).max(200).default("Cliquez pour modifier le texte").meta({
      description: "Bullet item text. Max 30 words",
    }),
    children: z.array(BulletItemSchema).min(0).max(4).default([]).meta({
      description: "Nested bullet items. Max 4 items per level",
    }),
  })
);

const ProfileCardSchema = z.object({
  image: ImageSchema.default({
    "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
    "__image_prompt__": "Portrait photo, neutral background",
  }).meta({
    description: "Profile image object",
  }),
  name: z.string().min(6).max(24).default("Prénom Nom").meta({
    description: "Profile name. Max 4 words",
  }),
  role: z.string().min(4).max(40).default("Poste").meta({
    description: "Profile role or title. Max 6 words",
  }),
  cardBullets: z.array(BulletItemSchema).min(3).max(6).default([
    {
      text: "Cliquez pour modifier le texte",
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
    {
      text: "Cliquez pour modifier le texte",
      children: [],
    },
    {
      text: "Cliquez pour modifier le texte",
      children: [],
    },
  ]).meta({
    description: "List of bullet items for the content card. Max 6 items",
  }),
});

const layoutId = "header-profile-cards-slide";
const layoutName = "dynamicSlideLayout";
const layoutDescription = "A slide with a header, profile cards, and content cards";

const Schema = z.object({
  title: z.string().min(20).max(80).default("Cliquez pour modifier le titre 29").meta({
    description: "Main title of the slide. Max 8 words",
  }),
  profiles: z.array(ProfileCardSchema).min(3).max(3).default([
    ProfileCardSchema.parse({
      image: {
        "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        "__image_prompt__": "Portrait photo, neutral background",
      },
      name: "Prénom Nom",
      role: "Poste",
      cardBullets: [
        {
          text: "Cliquez pour modifier le texte",
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
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
      ],
    }),
    ProfileCardSchema.parse({
      image: {
        "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        "__image_prompt__": "Portrait photo, neutral background",
      },
      name: "Prénom Nom",
      role: "Poste",
      cardBullets: [
        {
          text: "Cliquez pour modifier le texte",
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
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
      ],
    }),
    ProfileCardSchema.parse({
      image: {
        "__image_url__": "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
        "__image_prompt__": "Portrait photo, neutral background",
      },
      name: "Prénom Nom",
      role: "Poste",
      cardBullets: [
        {
          text: "Cliquez pour modifier le texte",
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
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
        {
          text: "Cliquez pour modifier le texte",
          children: [],
        },
      ],
    }),
  ]).meta({
    description: "Array of profile cards shown as columns. Exactly 3 profiles",
  }),
  footer: z.object({
    slideNumber: z.string().min(1).max(3).default("46").meta({
      description: "Slide number displayed in footer. Max 3 chars",
    }),
    presentationName: z.string().min(10).max(40).default("Nom de la présentation").meta({
      description: "Presentation name shown in footer. Max 7 words",
    }),
  }).default({
    slideNumber: "46",
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
  const profiles = slideData?.profiles || [];
  const footer = slideData?.footer;

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        {/* Title capacity: min 20 chars, max 80 chars */}
        <div className="pt-[28px] pl-[64px] pr-[64px]">
          <h1 className="text-[48px] leading-[56px] font-['Tahoma'] text-[#2a1449]">
            {slideData?.title || "Cliquez pour modifier le titre 29"}
          </h1>
        </div>

        {/* Three columns: profile badge + content card */}
        <div className="px-[64px] mt-[28px] grid grid-cols-3 gap-[36px]">
          {profiles.map((profile, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center">
                <div className="w-[126px] h-[126px] border-[4px] border-[#2b2b2b] bg-white flex items-center justify-center">
                  <div className="w-[110px] h-[110px] border-[3px] border-[#9a9a9a] bg-white flex items-center justify-center">
                    <img
                      src={profile?.image?.__image_url__ || "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg"}
                      alt={profile?.image?.__image_prompt__ || profile?.name || ""}
                      className="w-[96px] h-[96px] object-cover"
                    />
                  </div>
                </div>

                <div className="ml-4 rounded-sm shadow-sm overflow-hidden" style={{ background: "linear-gradient(135deg,#b8123a 0%,#c81a56 100%)" }}>
                  <div className="px-[18px] py-[18px] w-[220px]">
                    {/* Name capacity: min 6 chars, max 24 chars */}
                    <div className="text-[20px] font-['Tahoma'] font-semibold text-white leading-[24px]">
                      {profile?.name || "Prénom Nom"}
                    </div>
                    {/* Role capacity: min 4 chars, max 40 chars */}
                    <div className="text-[18px] font-['Tahoma'] text-white/90 mt-1">
                      {profile?.role || "Poste"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content card */}
              <div className="mt-[24px] rounded-md border-[4px] border-[#f1eaf2] shadow-sm bg-white p-[24px] min-h-[296px]">
                {/* Card bullets capacity: min 3 bullets, max 6 bullets */}
                <ul className="list-none text-[18px] leading-[1.4] font-['Arial'] text-[#111111] space-y-4">
                  {(profile?.cardBullets || []).map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="mt-1 text-[14px] text-[#cf022b]">•</span>
                      <div>
                        <div>{bullet?.text}</div>
                        {bullet?.children && bullet.children.length > 0 && (
                          <ul className="mt-2 ml-6 space-y-2 text-[16px] leading-[1.4]">
                            {bullet.children.map((lvl2, l2Idx) => (
                              <li key={l2Idx}>
                                {lvl2?.text}
                                {lvl2?.children && lvl2.children.length > 0 && (
                                  <ul className="mt-2 ml-6 space-y-2 text-[14px] leading-[1.4]">
                                    {lvl2.children.map((lvl3, l3Idx) => (
                                      <li key={l3Idx}>
                                        {lvl3?.text}
                                        {lvl3?.children && lvl3.children.length > 0 && (
                                          <ul className="mt-2 ml-6 text-[13px] leading-[1.4]">
                                            {lvl3.children.map((lvl4, l4Idx) => (
                                              <li key={l4Idx}>{lvl4?.text}</li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute left-0 right-0 bottom-0 flex items-end justify-between pb-[20px] px-[64px]">
          <div className="flex items-center gap-4">
            {/* Slide number capacity: 1-3 chars */}
            <div className="text-[11px] leading-[12px] font-['Tahoma'] text-[#2a1449]">
              {footer?.slideNumber || "46"}
            </div>
            <div className="h-[12px] border-l border-[#e6e0e8]" />
            {/* Presentation name capacity: min 10 chars, max 40 chars */}
            <div className="text-[11px] leading-[12px] font-['Times New Roman'] text-[#2a1449]">
              {footer?.presentationName || "Nom de la présentation"}
            </div>
          </div>

          {/* Brand circle replacement */}
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