import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdAccessTime, MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook" },
    { icon: <FaTwitter />, label: "Twitter" },
    { icon: <FaInstagram />, label: "Instagram" },
    { icon: <FaLinkedinIn />, label: "LinkedIn" },
    { icon: <FaYoutube />, label: "YouTube" },
  ];

  const quickLinks = [
    { text: "Home", href: "#" },
    { text: "Collections", href: "#collections" },
    { text: "Artists", href: "#artists" },
    { text: "Albums", href: "#albums" },
    { text: "Favorites", href: "#favorites" },
  ];

  const contactInfo = [
    {
      icon: <MdLocationOn className="text-black text-2xl mr-3 flex-shrink-0" />,
      content: "123 Vibra Street, Music City, USA",
    },
    {
      icon: <MdPhone className="text-black text-2xl mr-3 flex-shrink-0" />,
      content: "+1 234 567 890",
    },
    {
      icon: <MdEmail className="text-black text-2xl mr-3 flex-shrink-0" />,
      content: "contact@vibra.com",
    },
    {
      icon: <MdAccessTime className="text-black text-2xl mr-3 flex-shrink-0" />,
      content: "Mon-Fri: 9AM-9PM",
    },
  ];

  return (
    <footer className="bg-yellow-200 text-black pt-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + About */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Vibra</h2>
            <p className="mb-6">
              Discover artists, albums, and tracks that match your vibe.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-black text-yellow-300 hover:text-yellow-100 hover:bg-black/80 transition p-3 rounded-full flex items-center justify-center text-xl"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-black/70 transition"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, idx) => (
                <li key={idx} className="flex items-center">
                  {info.icon}
                  <span>{info.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-black text-yellow-300 rounded-xl p-6 flex flex-col lg:flex-row items-center justify-between mb-12">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Subscribe to Vibra</h3>
            <p>Get updates on the latest tracks and collections.</p>
          </div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              alert(`Subscribed with ${values.email}`);
              actions.resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col sm:flex-row w-full lg:w-auto">
                <Field
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-full bg-yellow-300 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black mb-2 sm:mb-0 sm:mr-3 w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mb-2 sm:mb-0"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-yellow-300 hover:text-yellow-100 px-6 py-2 rounded-full transition font-semibold shadow-md"
                >
                  Subscribe
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-black/30 pt-6">
          <p className="text-black text-sm mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} Vibra. All rights reserved.
          </p>
          <div className="flex space-x-4 text-black text-sm">
            <a href="#" className="hover:text-black/70 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black/70 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-black/70 transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
