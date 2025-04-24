import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import * as SiIcons from "react-icons/si";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-web3-dark">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            Frequently Asked <span className="text-[#a857ff]">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Explore answers to common questions about CancerCoin, BIO tokens,
            and funding decentralized cancer research on Solana&apos;s
            blockchain.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => {
              const Icon = SiIcons[faq.icon as keyof typeof SiIcons];
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-web3-gray"
                >
                  <AccordionTrigger className="text-left hover:text-web3-primary">
                    {/* {faq.question} */}
                    <div className="flex items-center">
                      <Icon
                        className="w-5 h-5 text-purple-400 mr-2"
                        aria-label={`${faq.question} icon`}
                      />
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
