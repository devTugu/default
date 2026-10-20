"use client";

import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

type aboutusData = {
  count: string;
  title: string;
}[];

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 0.8, bounce: 0.2 },
  },
};

const STAGGER_ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Aboutus = ({ aboutusData }: { aboutusData: aboutusData }) => {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border py-8 md:py-16 px-4 lg:px-10 flex flex-col gap-8 md:gap-16">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={STAGGER_ANIMATION_VARIANTS}
          className="flex flex-col gap-4"
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
            <Badge className="text-sm font-normal h-auto px-3 py-1">
              About us
            </Badge>
          </motion.div>
          <div className="flex flex-col md:flex-row items-start gap-3">
            <motion.h2 variants={FADE_UP_ANIMATION_VARIANTS} className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
              Where living feels extraordinary
            </motion.h2>
            <motion.div variants={STAGGER_ANIMATION_VARIANTS} className="md:max-w-xl flex flex-col gap-4 sm:gap-6 items-start">
              <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-base sm:text-lg font-normal text-muted-foreground">
                Designed for those who appreciate refined living, our residences
                blend modern architecture with thoughtful details to create
                spaces that inspire comfort, connection, and effortless luxury.
              </motion.p>
              <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-base sm:text-lg font-normal text-muted-foreground">
                Set in a well-connected neighborhood, the community offers
                seamless access to essentials while maintaining a peaceful
                atmosphere. Expansive views, curated amenities, and lush
                surroundings elevate your lifestyle.
              </motion.p>
              <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
                <Button
                  variant={"ghost"}
                  className="text-sm font-medium h-auto px-3 py-1.5 hover:cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={STAGGER_ANIMATION_VARIANTS}
          className="grid grid-cols-3 items-center gap-3 md:gap-6"
        >
          <div className="flex flex-col gap-3 md:gap-6">
            <motion.img variants={FADE_UP_ANIMATION_VARIANTS} src="https://images.shadcnspace.com/assets/about/about-4-img-1.jpg" alt="aboutus-img-1" width={368} height={278} className="w-full h-auto" />
            <motion.img variants={FADE_UP_ANIMATION_VARIANTS} src="https://images.shadcnspace.com/assets/about/about-4-img-2.jpg" alt="aboutus-img-2" width={466} height={232} className="w-full h-auto" />
          </div>
          <div className="flex flex-col gap-3 md:gap-6">
            <motion.img variants={FADE_UP_ANIMATION_VARIANTS} src="https://images.shadcnspace.com/assets/about/about-4-img-3.jpg" alt="aboutus-img-3" width={270} height={271} className="w-full h-auto" />
            <motion.img variants={FADE_UP_ANIMATION_VARIANTS} src="https://images.shadcnspace.com/assets/about/about-4-img-4.jpg" alt="aboutus-img-4" width={270} height={396} className="w-full h-auto" />
          </div>
          <div className="flex flex-col gap-3 md:gap-6">
            <motion.img variants={FADE_UP_ANIMATION_VARIANTS} src="https://images.shadcnspace.com/assets/about/about-4-img-5.jpg" alt="aboutus-img-5" width={271} height={353} className="w-full h-auto" />
            <motion.img variants={FADE_UP_ANIMATION_VARIANTS} src="https://images.shadcnspace.com/assets/about/about-4-img-6.jpg" alt="aboutus-img-6" width={368} height={203} className="w-full h-auto" />
          </div>
        </motion.div>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={STAGGER_ANIMATION_VARIANTS}
          className="flex flex-col sm:flex-row items-center justify-center"
        >
          {aboutusData?.map((item, index) => {
            return (
              <motion.div key={index} variants={FADE_UP_ANIMATION_VARIANTS} className="py-4 px-4 md:px-8 flex flex-col items-center text-center gap-4 sm:max-w-xs sm:border-r border-border last:border-r-0">
                <p className="text-5xl md:text-6xl font-medium text-foreground">
                  {item?.count}
                </p>
                <p className="text-base md:text-lg font-normal text-foreground">
                  {item?.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;

