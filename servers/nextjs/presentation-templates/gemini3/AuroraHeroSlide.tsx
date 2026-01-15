import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import * as z from "zod";

// --- 1. LE SCHEMA ZOD (Données pour l'IA) ---
export const Schema = z.object({
  title: z.string().default("Une Vision Nouvelle").meta({
    description: "Le titre principal, inspirant et centré",
  }),
  description: z.string().default("Découvrez comment nous réinventons le futur avec élégance.").meta({
    description: "Une phrase de sous-titre ou un slogan",
  }),
  buttonText: z.string().optional().default("En savoir plus").meta({
    description: "Texte d'un bouton d'action fictif (décoratif)",
  }),
});

type SchemaType = z.infer<typeof Schema>;

// --- 2. LE COMPOSANT VISUEL (Aurora Background) ---
interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  showRadialGradient?: boolean;
}

const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main
      className={cn(
        "relative flex flex-col h-full w-full items-center justify-center bg-[#F3E8FF] dark:bg-zinc-900 text-slate-950 transition-bg overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Injection de l'animation CSS localement pour éviter de toucher à tailwind.config */}
      <style>
        {`
          @keyframes aurora {
            from { background-position: 50% 50%, 50% 50%; }
            to { background-position: 350% 50%, 350% 50%; }
          }
          .animate-aurora {
            animation: aurora 60s linear infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,#E9D5FF_0%,#E9D5FF_7%,var(--transparent)_10%,var(--transparent)_12%,#E9D5FF_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#4B0082_10%,#8000FF_15%,#3b82f6_20%,#a855f7_25%,#60a5fa_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      {children}
    </main>
  );
};

// --- 3. LE COMPOSANT FINAL (Exporté pour Presenton) ---
export default function AuroraHeroSlide({ data }: { data: SchemaType }) {
  return (
    // On force un fond sombre (slate-950) pour faire ressortir l'aurore
    <div className="w-full h-full bg-slate-950"> 
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-green text-green text-center">
            {data.title}
          </div>
          <div className="font-extralight text-base md:text-4xl bg-clip-text text-transparent bg-gradient-to-br from-neutral-900 to-neutral-500 dark:text-neutral-200 py-4 text-center">
            {data.description}
          </div>
          
          {data.buttonText && (
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 dark:bg-black dark:text-white text-white rounded-full w-fit px-8 py-3 shadow-lg hover:bg-white/20 transition-all">
              {data.buttonText}
            </button>
          )}
        </motion.div>
      </AuroraBackground>
    </div>
  );
}