"use client";

import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Button from "@/components/primitives/Button";

const INPUT_CLASS =
  "w-full bg-input border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors duration-200";

export default function ContactForm() {
  return (
    <SectionWrapper id="contact-form" variant="surface">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-label mb-4">Send a Message</p>
            <h2 className="text-display-md font-display italic text-foreground mb-4">
              Prefer to write?{" "}
              <span className="text-muted-foreground">Drop me a note.</span>
            </h2>
            <p className="text-xs text-muted-foreground/50 mb-10">
              Form is UI-only — backend not connected yet. Reach me directly at{" "}
              <span className="text-muted-foreground/70">aunglinhtet710@gmail.com</span> for now.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5"
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-name" className="text-label">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    placeholder="Your name"
                    className={INPUT_CLASS}
                    autoComplete="name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-email" className="text-label">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    placeholder="your@email.com"
                    className={INPUT_CLASS}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="cf-subject" className="text-label">
                  Subject
                </label>
                <input
                  id="cf-subject"
                  type="text"
                  placeholder="What's this about?"
                  className={INPUT_CLASS}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="cf-message" className="text-label">
                  Message
                </label>
                <textarea
                  id="cf-message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className={`${INPUT_CLASS} resize-none`}
                />
              </div>

              {/* TODO: Connect to Resend / Formspree / similar email API */}
              <div className="flex items-center gap-4 pt-2">
                <Button disabled variant="primary">
                  Send Message (Coming Soon)
                </Button>
                <span className="text-xs text-muted-foreground/40">
                  Backend not connected yet
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </SectionWrapper>
  );
}
