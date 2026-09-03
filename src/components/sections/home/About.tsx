import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import AboutNotepad from "@/components/sections/home/AboutNotepad";

export default function About() {
  return (
    <SectionWrapper id="about" className="border-t border-border">
      <Container>
        <div className="flex items-center justify-between gap-12 lg:gap-20">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-label mb-6">About</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-display-md font-display italic text-foreground mb-8">
                Why I&apos;m doing this
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                I&apos;m never good enough. Not in the dramatic way, I mean it
                plainly. I&apos;m usually somewhere in the top percentile, good
                enough that people notice, never good enough that anyone calls
                me the best. I&apos;ve made peace with that, because somewhere
                along the way I figured out that talent was never going to be
                my thing. Consistency was. I&apos;m not here because I&apos;m
                gifted. I&apos;m here purely because I showed up more than most
                people are willing to.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                I&apos;m a scholarship student from Myanmar, currently at SUTD.
                My goal is simple to say and hard to do: own a business by the
                time I graduate, or at least figure out enough of the path to
                get close. I don&apos;t know exactly how it ends yet.
                That&apos;s kind of the point of documenting it.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                I think building a personal brand, honestly, might teach me
                more than my degree will. So I&apos;m treating this the same
                way: showing up, posting the process, the wins and the parts
                that don&apos;t work, and letting people watch it happen in
                real time instead of only hearing about it after.
              </p>
            </Reveal>

            <Reveal delay={0.36}>
              <p className="text-base text-muted-foreground leading-relaxed">
                If you&apos;ve ever looked at yourself and thought you&apos;re
                just not the type of person who &quot;makes it,&quot; I want
                this page to be proof against that. I wasn&apos;t the type
                either. I&apos;m just consistent. That&apos;s the whole
                blueprint. If it worked starting from here, it can work
                starting from wherever you are.
              </p>
            </Reveal>
          </div>

          <AboutNotepad />
        </div>
      </Container>
    </SectionWrapper>
  );
}
