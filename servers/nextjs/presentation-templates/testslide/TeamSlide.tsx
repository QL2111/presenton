import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("L'Équipe de Direction"),
  
  member1_name: z.string().default("John Doe"),
  member1_role: z.string().default("Architecte"),
  member1_image: ImageSchema.default({
      __image_url__: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      __image_prompt__: "Photo professionnelle corporate d'un homme"
  }),

  member2_name: z.string().default("Bob"),
  member2_role: z.string().default("Dév 1"),
  member2_image: ImageSchema.default({
      __image_url__: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      __image_prompt__: "Photo professionnelle corporate d'une femme"
  }),
  
  member3_name: z.string().default("John Smith"),
  member3_role: z.string().default("Dév 2"),
  member3_image: ImageSchema.default({
      __image_url__: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      __image_prompt__: "Photo professionnelle corporate d'un jeune homme"
  }),
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full bg-white flex flex-col px-24 py-16 font-sans relative overflow-hidden">
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#F7F5FF] to-transparent pointer-events-none"></div>

        {/* Header with accent line */}
        <div className="mb-20 flex items-center gap-6">
            <div className="h-16 w-2 bg-[#8000FF] rounded-full"></div>
            <h1 className="text-5xl font-bold text-[#4B0082]">{data.title}</h1>
        </div>

        {/* Team Grid */}
        <div className="flex justify-center gap-16 h-full items-start">
            {[1, 2, 3].map((num) => {
                const img = data[`member${num}_image` as keyof SchemaType] as any;
                const name = data[`member${num}_name` as keyof SchemaType] as string;
                const role = data[`member${num}_role` as keyof SchemaType] as string;

                return (
                    <div key={num} className="flex-1 max-w-sm flex flex-col items-center text-center group cursor-default">
                        {/* Image Container */}
                        <div className="mb-8 relative transition-transform duration-300 group-hover:scale-105">
                            {/* Hover Glow */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#8000FF] via-[#FFA500] to-[#FF0000] opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-300"></div>
                            
                            {/* Masked Image */}
                            <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl z-10 bg-slate-100">
                                <img 
                                    src={img?.__image_url__} 
                                    alt={img?.__image_prompt__}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="relative">
                           <h3 className="text-2xl font-bold text-[#4B0082] mb-2 group-hover:text-[#8000FF] transition-colors">{name}</h3>
                           <div className="w-12 h-1 bg-[#FFA500] mx-auto mb-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <p className="text-[#8000FF] font-medium tracking-wider uppercase text-sm bg-[#F7F5FF] px-4 py-1 rounded-full inline-block">{role}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  );
};
export default SlideComponent;
