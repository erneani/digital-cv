import SectionTitle from "@/components/section-title/SectionTitle";
import Separator from "@/components/separator/Separator";
import Showcase from "@/components/showcase/Showcase";
import TheBigSquare from "@/components/thebigsquare/TheBigSquare";
import WorkCard from "@/components/work-card/WorkCard";
import { jobs } from "@/content";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vinícius Ernani, Senior Software Consultant</title>
        <meta
          name="description"
          content="Virtual CV for Vinícius Ernani, Senior Software Consultant at Thoughtworks"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TheBigSquare>
        <Showcase />
        <Separator />
        <SectionTitle text="Work Experiences" />
        {jobs.map((job, i) => (
          <WorkCard {...job} key={i} />
        ))}
      </TheBigSquare>
    </>
  );
}
