// // export default function Footer() {
// //   return (
// //     <footer className="bg-primary flex space-y-6 text-sm text-white p-4 text-center">
// //       <div className="pt-8 flex items-center justify-center w-full capitalize">
// //         Copyright &copy; 2025 Sentra Medika Group. All Right Reserverd.
// //       </div>
// //     </footer>
// //   );
// // }

// "use client";

// import Link from "next/link";

// const FooterItem = ({ text, link }) => (
//   <li>
//     <Link
//       href={link}
//       className="duration-200 hover:text-blue-600 dark:hover:text-blue-500"
//     >
//       {text}
//     </Link>
//   </li>
// );

// const FooterBlockItem = ({ title, items }) => (
//   <div className="space-y-6">
//     <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//       {title}
//     </h2>
//     <ul className="space-y-3">
//       {items.map((item) => (
//         <FooterItem key={item.id} {...item} />
//       ))}
//     </ul>
//   </div>
// );

// const footerBlocks = [
//   {
//     id: 1,
//     title: "Services",
//     items: [
//       { id: 1, text: "Web Design", link: "#" },
//       { id: 2, text: "Consultancy", link: "#" },
//       { id: 3, text: "Web Development", link: "#" },
//       { id: 4, text: "Mobile Development", link: "#" },
//       { id: 5, text: "UI/UX Design", link: "#" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Company",
//     items: [
//       { id: 1, text: "About", link: "#" },
//       { id: 2, text: "Career", link: "#" },
//       { id: 3, text: "Contact", link: "#" },
//       { id: 4, text: "Partners", link: "#" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Social",
//     items: [
//       { id: 1, text: "Twitter X", link: "#" },
//       { id: 2, text: "Instagram", link: "#" },
//       { id: 3, text: "Threads", link: "#" },
//       { id: 4, text: "Facebook", link: "#" },
//       { id: 5, text: "LinkedIn", link: "#" },
//     ],
//   },
//   {
//     id: 4,
//     title: "Resources",
//     items: [
//       { id: 1, text: "Blog", link: "#" },
//       { id: 2, text: "Privacy Policy", link: "#" },
//       { id: 3, text: "Terms & Conditions", link: "#" },
//       { id: 4, text: "FAQ", link: "#" },
//     ],
//   },
// ];

// export default function Footer() {
//   return (
//     <footer className="bg-primary/10 dark:bg-gray-950 text-gray-700 dark:text-gray-300">
//       <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 py-20 flex flex-col lg:flex-row gap-14">
//         {/* Brand */}
//         <div className="space-y-6 lg:w-96">
//           <Link href="#" className="inline-block text-2xl font-bold">
//             <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-800 to-indigo-400">
//               U
//             </span>
//             nify-UI
//           </Link>
//           <p className="max-w-lg">
//             Empowering developers with modern UI components built for speed,
//             accessibility, and scalability.
//           </p>

//           {/* Social Icons */}
//           <div className="flex w-full gap-5">
//             {[
//               {
//                 id: 1,
//                 href: "#",
//                 label: "Facebook",
//                 icon: (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     className="w-5 h-5"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
//                   </svg>
//                 ),
//               },
//               {
//                 id: 2,
//                 href: "#",
//                 label: "LinkedIn",
//                 icon: (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     className="w-5 h-5"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zM3.743 3.934a1.238 1.238 0 1 1 0-2.475 1.238 1.238 0 0 1 0 2.475zm4.908 9.46V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193V6.17h-2.4v7.225h2.4z" />
//                   </svg>
//                 ),
//               },
//               {
//                 id: 3,
//                 href: "#",
//                 label: "Twitter",
//                 icon: (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     className="w-5 h-5"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057A3.283 3.283 0 0 0 3.86 12.1a6.588 6.588 0 0 1-3.08.884A9.344 9.344 0 0 0 5.026 15z" />
//                   </svg>
//                 ),
//               },
//             ].map((social) => (
//               <Link
//                 key={social.id}
//                 href={social.href}
//                 aria-label={social.label}
//               >
//                 {social.icon}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Footer Navigation */}
//         <nav className="lg:flex-1 grid grid-cols-2 md:grid-cols-4 gap-10">
//           {footerBlocks.map((block) => (
//             <FooterBlockItem key={block.id} {...block} />
//           ))}
//         </nav>
//       </div>

//       {/* Newsletter + Bottom Section */}
//       <div className="px-5 sm:px-10 md:px-12 lg:px-5 space-y-5">
//         <div className="max-w-7xl mx-auto py-3 border-t border-t-gray-100 dark:border-t-gray-900 flex flex-col md:flex-row md:justify-between gap-6 md:items-center">
//           <div className="max-w-md space-y-3">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//               Join Our Newsletter
//             </h2>
//             <p>
//               Stay updated with the latest articles, tutorials, and design
//               insights.
//             </p>
//           </div>

//           <div className="flex-1 max-w-md">
//             <form
//               onSubmit={(e) => e.preventDefault()}
//               className="w-full flex flex-col sm:flex-row gap-3"
//             >
//               <input
//                 type="email"
//                 placeholder="johndoe@gmail.com"
//                 className="px-5 py-2.5 rounded-md outline-none flex-1 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//               <button
//                 type="submit"
//                 className="outline-none w-full py-2.5 px-5 sm:w-max bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="px-5 mb-10 sm:px-10 md:px-12 lg:px-5 flex justify-center text-center py-3 bg-gray-100 dark:bg-gray-900 rounded-md">
//           <p>© {new Date().getFullYear()} UnifyUI. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  const hospitals = [
    { name: "Sentra Medika Cibinong", href: "/hospitals/cibinong" },
    { name: "Sentra Medika Cikarang", href: "/hospitals/cikarang" },
    { name: "Sentra Medika Cisalak", href: "/hospitals/cisalak" },
    { name: "Sentra Medika Minahasa Utara", href: "/hospitals/minahasa-utara" },
    { name: "Sentra Medika Gempol", href: "/hospitals/gempol" },
    { name: "RS Harapan Bunda", href: "/hospitals/harapan-bunda" },
  ];

  const centers = [
    {
      name: "Soeherman Widyatomo Integrated Cancer Center (SWICC)",
      href: "/centers/swicc",
    },
    {
      name: "Cardiovascular & Brain Center",
      href: "/centers/cardiovascular-brain",
    },
    { name: "Jakarta Timur Eye Center (JTEC)", href: "/centers/jtec" },
    { name: "Medical Rehabilitation Center", href: "/centers/rehabilitation" },
    { name: "Trauma Center", href: "/centers/trauma" },
    {
      name: "Integrated Women & Child Healthcare",
      href: "/centers/women-child",
    },
    {
      name: "Geriatric & Diabetic Center",
      href: "/centers/geriatric-diabetic",
    },
  ];

  const information = [
    { name: "Tentang Sentra Medika Hospital Group", href: "/about" },
    { name: "Panduan Pengunjung Rumah Sakit", href: "/visitor-guide" },
    { name: "Syarat & Ketentuan", href: "/terms" },
    { name: "Kebijakan Privasi", href: "/privacy" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/sentramedika",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@sentramedika",
      label: "YouTube",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/sentramedika",
      label: "Facebook",
    },
  ];

  return (
    <footer className="bg-[#1a1a3e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Rumah Sakit Kami */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rumah Sakit Kami</h3>
            <ul className="space-y-2">
              {hospitals.map((hospital) => (
                <li key={hospital.name}>
                  <Link
                    href={hospital.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {hospital.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center of Excellence */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Center of Excellence</h3>
            <ul className="space-y-2">
              {centers.map((center) => (
                <li key={center.name}>
                  <Link
                    href={center.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {center.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2">
              {information.map((info) => (
                <li key={info.name}>
                  <Link
                    href={info.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {info.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} Sentra Medika Group. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
