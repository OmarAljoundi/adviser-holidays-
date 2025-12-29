"use client";

import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { motion } from "framer-motion";
import { Edit3, Layout, Newspaper, PenTool } from "lucide-react";
import { LinearBackground } from "./liner-bg";

export default function AdminMainPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <ContentWrapper breadcrumbs={[]}>
      <LinearBackground className="bg-background text-foreground">
        <motion.div
          initial="initial"
          animate="animate"
          className="container mx-auto space-y-32 px-4 py-16"
        >
          <motion.section className="space-y-8 text-center" variants={stagger}>
            <motion.h1
              className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-6xl font-bold text-transparent"
              variants={fadeInUp}
            >
              Welcome to Your Ultimate CMS
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground"
              variants={fadeInUp}
            >
              Empower your creativity, manage your content, and build your
              digital empire
            </motion.p>
          </motion.section>

          <motion.section
            className="grid grid-cols-1 gap-16 md:grid-cols-2"
            variants={stagger}
          >
            <motion.div className="space-y-4" variants={fadeInUp}>
              <motion.div
                className="inline-block rounded-full bg-purple-700 p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 size={40} />
              </motion.div>
              <h2 className="text-3xl font-semibold">
                Craft Compelling Articles
              </h2>
              <p className="text-muted-foreground">
                Create, edit, and publish articles with our intuitive editor
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <motion.div
                className="inline-block rounded-full bg-blue-600 p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Newspaper size={40} />
              </motion.div>
              <h2 className="text-3xl font-semibold">Manage Breaking News</h2>
              <p className="text-muted-foreground">
                Stay ahead with real-time news management and instant publishing
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <motion.div
                className="inline-block rounded-full bg-pink-600 p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PenTool size={40} />
              </motion.div>
              <h2 className="text-3xl font-semibold">Showcase Your Artworks</h2>
              <p className="text-muted-foreground">
                Display your creativity with our beautiful gallery features
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <motion.div
                className="inline-block rounded-full bg-green-600 p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Layout size={40} />
              </motion.div>
              <h2 className="text-3xl font-semibold">
                Configure Your Home Page
              </h2>
              <p className="text-muted-foreground">
                Customize your landing page with drag-and-drop simplicity
              </p>
            </motion.div>
          </motion.section>
        </motion.div>
      </LinearBackground>
    </ContentWrapper>
  );
}
