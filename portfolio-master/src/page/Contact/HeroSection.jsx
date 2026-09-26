import React from "react";
import ContactForm from "./ContactForm";

import {
  Github,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Mail,
  Users,
  Gitlab,
  ExternalLink,
} from "lucide-react";
import rohit from "../../assets/img/rohit.jpg";

export default function HeroSction() {
  const [show, setShow] = React.useState(false);

  const showHide = () => {
    setShow(!show);
  };

  const socialLinks = [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com",
      note: "Connect professionally",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com",
      note: "View code repositories",
      icon: <Github className="w-5 h-5" />,
    },
    {
      id: "gitlab",
      label: "GitLab",
      href: "https://gitlab.com",
      note: "Explore private projects",
      icon: <Gitlab className="w-5 h-5" />,
    },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://youtube.com",
      note: "Watch project videos",
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://facebook.com",
      note: "Community updates",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com",
      note: "Follow creative posts",
      icon: <Instagram className="w-5 h-5" />,
    },
  ];
    
   if(show){
    return <ContactForm />;
   }
  return (
    <section className="bg-gray-950 text-green-400 min-h-screen flex flex-col items-center justify-center p-6">
      {/* 💻 PC / Laptop Section */}
      <div className="hidden lg:flex w-full max-w-6xl bg-gray-900 border border-green-700 rounded-3xl shadow-2xl p-10 justify-between items-start gap-10">
        
        {/* Left Info */}
        <div className="flex flex-col justify-between w-1/3 space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          <img src={rohit} alt=""  className="w-full h-full rounded-full"/>
              
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-300">
                Connect & Explore
              </h3>
              <p className="text-sm text-green-500">
                Explore all my work, code, and community.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-4">
              Quick Contact
            </h4>
            <div className="flex gap-3">
              <a
                href="mailto:hello@example.com"
                className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-500 transition-all"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
              <span onClick={showHide}
                href="/contact"
                className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg border border-green-600 text-green-400 text-sm font-medium hover:bg-green-700 hover:text-white transition-all"
              >
                <Users className="w-4 h-4" /> Form
              </span>
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-5 border border-green-800 rounded-2xl hover:bg-green-700 hover:text-white transition-all flex flex-col justify-between shadow-md hover:shadow-green-700/40"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-400 group-hover:text-white">
                  {link.icon}
                </span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h4 className="font-semibold">{link.label}</h4>
                <p className="text-xs text-green-500 group-hover:text-green-100 mt-1">
                  {link.note}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 📱 Mobile / Tablet Section */}
      <div className="flex flex-col lg:hidden w-full max-w-md bg-gray-900 border border-green-700 rounded-3xl shadow-xl p-6 items-center text-center">
        <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg">
          <img src={rohit} alt=""  className="w-full h-full rounded-full"/>
        </div>
        <h3 className="text-2xl font-semibold text-green-300 mb-2">
          Connect with Me
        </h3>
        <p className="text-sm text-green-500 mb-6">
          All my socials, videos, and updates — in one place.
        </p>

        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-green-600 hover:bg-green-700 hover:text-white transition-all flex flex-col items-center"
            >
              <div className="mb-1 text-green-400">{link.icon}</div>
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <a
            href="mailto:hello@example.com"
            className="flex-1 text-center py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-500"
          >
            <Mail className="inline w-4 h-4 mr-1" /> Email
          </a>
          <a
            href="/contact"
            className="flex-1 text-center py-2 rounded-lg border border-green-600 text-green-400 text-sm font-medium hover:bg-green-700 hover:text-white"
          >
            <Users className="inline w-4 h-4 mr-1" /> Form
          </a>
        </div>

        <p className="mt-5 text-xs text-green-600">
          Updated weekly — stay connected.
        </p>
      </div>
    </section>
  );
}
