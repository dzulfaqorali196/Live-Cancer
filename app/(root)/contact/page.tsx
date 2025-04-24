import FollowUs from "@/components/contact/followus";
import { ContactForm } from "@/components/contact/form";
import SectionHeader from "@/components/section-header";
import { SiteSettings } from "@/constants/settings";

export const metadata = {
  title: "Connect with CancerCoin | CancerCoin",
  description:
    "Reach out to the CancerCoin team to join our mission of funding decentralized cancer research with BIO tokens on Solana’s blockchain.",
  keywords: [
    "CancerCoin",
    "BIO token",
    "cancer research",
    "Solana blockchain",
    "Web3",
    "decentralized funding",
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-40 pb-20">
      <div className="container">
        <SectionHeader
          title1="Connect with"
          title2="CancerCoin"
          description="Have questions about our platform? Want to join our mission to fund cancer research? We'd love to hear from you."
        />

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Our Office
              </h3>
              <p className="text-gray-300">
                {SiteSettings.contact.address.line1}
                <br />
                {SiteSettings.contact.address.city},{" "}
                {SiteSettings.contact.address.state}{" "}
                {SiteSettings.contact.address.postalCode}
                <br />
                {SiteSettings.contact.address.country}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Contact Information
              </h3>
              <p className="text-gray-300 mb-2">
                Email:{" "}
                <a
                  href={`mailto:${SiteSettings.contact.email}`}
                  className="text-purple-400 hover:text-purple-300"
                >
                  {SiteSettings.contact.email}
                </a>
              </p>
              <p className="text-gray-300">
                Phone:{" "}
                <a
                  href={`tel:${SiteSettings.contact.phone}`}
                  className="text-purple-400 hover:text-purple-300"
                >
                  {SiteSettings.contact.phone}
                </a>
              </p>
            </div>
            <FollowUs />
          </div>

          <div>
            <div className="p-6 md:p-8 border border-web3-gray rounded-xl bg-web3-darker/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
