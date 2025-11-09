import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";



function Footer() {
  // Helper component for footer links
  const FooterLink = ({ href, children }) => (
    <li>
      <a
        href={href}
        className="!text-black hover:!text-blue-600 transition-colors "
      >
        {children}
      </a>
    </li>
  );

  // Helper component for footer sections
  const LinkSection = ({ title, links }) => (
    <div>
      <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <FooterLink key={link.name} href={link.href}>
            {link.name}
          </FooterLink>
        ))}
      </ul>
    </div>
  );

  // Data for the link sections
  const accountLinks = [
    { name: "Open demat account", href: "#" },
    { name: "Minor demat account", href: "#" },
    { name: "NRI demat account", href: "#" },
    { name: "Commodity", href: "#" },
    { name: "Dematerialisation", href: "#" },
    { name: "Fund transfer", href: "#" },
    { name: "MTF", href: "#" },
    { name: "Referral program", href: "#" },
  ];

  const supportLinks = [
    { name: "Contact us", href: "#" },
    { name: "Support portal", href: "#" },
    { name: "How to file a complaint?", href: "#" },
    { name: "Status of your complaints", href: "#" },
    { name: "Bulletin", href: "#" },
    { name: "Circular", href: "#" },
    { name: "Z-Connect blog", href: "#" },
    { name: "Downloads", href: "#" },
  ];

  const companyLinks = [
    { name: "About", href: "#" },
    { name: "Philosophy", href: "#" },
    { name: "Press & media", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Zerodha Cares (CSR)", href: "#" },
    { name: "Zerodha.tech", href: "#" },
    { name: "Open source", href: "#" },
  ];

  const quickLinks = [
    { name: "Upcoming IPOs", href: "#" },
    { name: "Brokerage charges", href: "#" },
    { name: "Market holidays", href: "#" },
    { name: "Economic calendar", href: "#" },
    { name: "Calculators", href: "#" },
    { name: "Markets", href: "#" },
    { name: "Sectors", href: "#" },
  ];

  const bottomLinks = [
    { name: "NSE", href: "#" },
    { name: "BSE", href: "#" },
    { name: "MCX", href: "#" },
    { name: "Terms & conditions", href: "#" },
    { name: "Policies & procedures", href: "#" },
    { name: "Privacy policy", href: "#" },
    { name: "Disclosure", href: "#" },
    { name: "For investor's attention", href: "#" },
    { name: "Investor charter", href: "#" },
  ];

  return (
    <>
      <footer className="bg-gray-300 text-gray-600 text-xs font-['Inter',_sans-serif]">
        {/* Main container with max-width-7xl */}
        <div className="max-w-7xl mx-auto mt-24 py-5 px-4 sm:px-6 lg:px-8 ">
          {/* Top section: Logo, Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Column 1: Logo & Social */}
            <div className="lg:col-span-2">
              <img
                src="/media/images/logo.svg"
                alt="Zerodha"
                className="h-5 mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/120x20/f8f8f8/000000?text=Zerodha&font=raleway";
                }}
              />
              <p className="text-gray-500 mb-6">
                &copy; 2010 – 2025, Zerodha Broking Ltd. All rights reserved.
              </p>
              <div className="flex space-x-4 ">
               <a className='!text-black hover:!text-blue-600 transition-colors duration-200'> <FaTwitter className="footer-link text-xl" /></a>
                <a className='!text-black hover:!text-blue-600 transition-colors duration-200'><FaFacebook className="footer-link text-xl" /></a>
                <a className='!text-black hover:!text-blue-600 transition-colors duration-200'><FaInstagram className="footer-link text-xl" /></a>
                <a className='!text-black hover:!text-blue-600 transition-colors duration-200'><FaLinkedin className="footer-link text-xl" /></a>
                <a className='!text-black hover:!text-blue-600 transition-colors duration-200'><FaYoutube className="footer-link text-xl" /></a>
                <a className='!text-black hover:!text-blue-600 transition-colors duration-200'><FaTelegramPlane className="footer-link text-xl" /></a>
              </div>
            </div>

            {/* Link Columns */}
            <LinkSection title="Account" links={accountLinks} />
            <LinkSection title="Support" links={supportLinks} />
            <LinkSection title="Company" links={companyLinks} />
            <LinkSection title="Quick Links" links={quickLinks} />
          </div>

          {/* Middle section: Disclaimers */}
          <div className="mt-16 border-t border-gray-200 pt-8 space-y-4 text-gray-500 !leading-relaxed">
            <p>
              Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration
              no.: INZ000031633 | CDSL: IN-DP-431-2019 | Depository services
              through Zerodha Broking Ltd. – SEBI Registration no.:
              IN-DP-431-2019 | Registered Address: Zerodha Broking Ltd.,
              #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
              J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
              complaints pertaining to securities broking please write to{" "}
              <a href="#" className="text-blue-600 hover:underline">
                complaints@zerodha.com
              </a>
              , for DP related to{" "}
              <a href="#" className="text-blue-600 hover:underline">
                dp@zerodha.com
              </a>
              . Please ensure you carefully read the Risk Disclosure Document as
              prescribed by SEBI | ICF
            </p>
            <p>
              Procedure to file a complaint on{" "}
              <a href="#" className="text-blue-600 hover:underline">
                SEBI SCORES
              </a>
              : Register on SCORES portal. Mandatory details for filing
              complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail
              ID. Benefits: Effective Communication, Speedy redressal of the
              grievances
            </p>
            <p>
              <a href="#" className="text-blue-600 hover:underline">
                Smart Online Dispute Resolution
              </a>{" "}
              |{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Grievances Redressal Mechanism
              </a>
            </p>
            <p>
              Investments in securities market are subject to market risks; read
              all the related documents carefully before investing.
            </p>
            <p>
              Attention investors: 1. Stock brokers can accept securities as
              margins from clients only by way of pledge in the depository
              system w.e.f. September 01, 2020. 2. Update your e-mail and phone
              number with your stock broker / depository participant and receive
              OTP directly from depository on your e-mail and/or mobile number
              to create pledge. 3. Check your securities / MF / bonds in the
              consolidated account statement issued by NSDL/CDSL every month.
            </p>
            <p>
              India's largest broker based on new clients in active B2C segment.{" "}
              <a href="#" className="text-blue-600 hover:underline">
                NSE broker factsheet
              </a>
            </p>
            <p>
              "Prevent unauthorised transactions in your account. Update your
              mobile numbers/email IDs with your stock brokers. Receive
              information of your transactions directly from Exchange on your
              mobile/email at the end of the day. Issued in the interest of
              investors. KYC is one time exercise while dealing in securities
              markets - once KYC is done through a SEBI registered intermediary
              (broker, DP, Mutual Fund etc.), you need not undergo the same
              process again when you approach another intermediary. Dear
              Investor, if you are subscribing to an IPO, there is no need to
              issue a cheque. Please write the Bank account number and sign the
              IPO application form to authorize your bank to make payment in
              case of allotment. In case of non allotment the funds will remain
              in your bank account. As a business we don't give stock tips, and
              have not authorized anyone to trade on behalf of others. If you
              find anyone claiming to be part of Zerodha and offering such
              services, please{" "}
              <a href="#" className="text-blue-600 hover:underline">
                create a ticket here
              </a>
              ."
            </p>
          </div>

          {/* Bottom section: Footer Links */}
          <div className="mt-12 border-t border-gray-200 pt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-gray-500">
            {bottomLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="!text-black hover:!text-blue-600 transition-colors "
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
