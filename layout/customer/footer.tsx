"use client";
import BlurImage from "@/shared/blur-image";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="footer-area bg-primary/50 relative pt-10 bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url("/footer-image.png")' }}
    >
      <div className="container pb-10">
        <div className="grid sm:grid-cols-2 flex-row-reverse justify-between gap-x-20">
          <div className="">
            <div className="mb-[60px] leading-7">
              <div>
                <a className="mb-7 flex justify-start gap-2" href="/">
                  <BlurImage
                    src="/main-logo.png"
                    alt="footer logo"
                    className="shadow-custom"
                    style={{ background: "white", borderRadius: 8 }}
                    width={70}
                    height={70}
                  />
                </a>
                <p dir="auto" className="text-xl">
                  تعتبر شركة أدفايزر للسياحة و السفر, مركزا متكاملا للخدمات
                  السياحية بنوعيها الداخلي والخارجي بخبرة تزيد على 12 أعوام.
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="footer-widget widget ">
              <div className="widget-contact space-y-3">
                <h4 className="widget-title text-right text-xl">طرق التواصل</h4>
                <p className="flex py-3 px-2 justify-start shadow-custom bg-white rounded-sm ">
                  <span className="text-right">
                    عمان - شارع وصفي التل - عمارة أريج 307 - الطابق الثالث
                  </span>
                  <i className="fa fa-map-marker ml-3 text-lg" />
                </p>
                <p className="location flex justify-start  py-3 px-2 bg-white rounded-sm">
                  <span className="text-right english-font">
                    booking@advisertours.com
                  </span>
                  <i className="fa fa-envelope-o ml-10 text-lg" />
                </p>
                <p className="telephone flex justify-start  py-3 px-2 bg-white rounded-sm">
                  <span dir="rtl" className="english-font text-right">
                    796893334 00962
                  </span>
                  <i className="fa fa-phone base-color ml-10 text-lg" />
                </p>
                <p className="telephone flex justify-start  py-3 px-2 bg-white rounded-sm">
                  <span dir="rtl" className="english-font text-right">
                    799986280 00962
                  </span>
                  <i className="fa fa-phone base-color ml-10 text-lg" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#061847] py-2">
        <div className="text-center text-sm text-white">
          © Adviserholidays <span className="english-font">2023</span> All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
