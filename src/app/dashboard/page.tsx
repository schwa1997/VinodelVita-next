import Image from "next/image";
import FooterComponent from "./component/footer";

export default function Page() {
  return (
    <>
      <div className="tw-h-full">
        <div className="tw-relative tw-pt-48 tw-px-12 tw-text-violet-50 tw-place-content-center">
          <div className="tw-container tw-px-3 tw-mx-auto tw-flex tw-flex-wrap tw-flex-col md:tw-flex-row tw-items-center">
            <div className="tw-flex tw-flex-col tw-w-full md:tw-w-2/5 tw-justify-center tw-items-start tw-text-center md:tw-text-left">
              <p className="tw-uppercase tw-tracking-loose tw-w-full tw-text-violet-50">
                How is your vineyard?
              </p>
              <h1 className="tw-my-4 tw-text-5xl tw-font-bold tw-leading-tight tw-text-violet-50">
                Use Vita Del Vino to imrove the management!
              </h1>
              <p className="tw-leading-normal tw-text-2xl tw-mb-8">
                For managing and reporting your vineyards! If you dont use
                proper tool, you will miss a fortune!
              </p>
              <a className="tw-w-full" href="/users/signup">
                <button
                  id="button"
                  className="tw-mx-auto tw-w-64 tw-h-12 lg:tw-mx-0 hover:tw-underline tw-text-white tw-bg-violet-300  tw-font-bold tw-rounded-full tw-my-6 py-4 tw-px-8 tw-shadow-lg focus:tw-outline-none focus:tw-shadow-outline tw-transform tw-transition hover:tw-scale-105 tw-duration-300 tw-ease-in-out"
                >
                  Sign Up
                </button>
              </a>
            </div>
            <div className="tw-w-1/2 xs:tw-w-4/5 xs:tw-left-0 md:tw-w-1/2 tw-py-6 tw-text-center">
              <Image
                src="/homeIcon.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </div>
          </div>
        </div>
        <div className="tw-relative">
          <Image
            src="/homeIcon2.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </div>
        <section
          id="landing-section"
          className="tw-bg-white tw-py-16 md:tw-py-24"
          style={{ position: "relative", top: "-5px" }}
        >
          <div className="tw-container tw-max-w-5xl tw-mx-auto tw-px-4 tw-md-px-8">
            <h2 className="tw-w-full tw-text-4xl md:tw-text-7xl tw-font-bold tw-leading-tight tw-text-center">
              Vita Del Vino
            </h2>
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-mt-8">
              <div className="tw-w-full md:tw-w-1/2 tw-p-6">
                <h3 className="tw-text-2xl md:tw-text-4xl tw-font-bold tw-leading-none tw-mb-3">
                  Professional Tracker
                </h3>
                <p className="tw-text-lg md:tw-text-2xl tw-mb-8 tw-text-justify">
                  We are a team of agronomists, supporting numerous customer
                  companies distributed in various countries of the world. We
                  want to create a web application to support the management of
                  vine diseases. This application must allow the detection of
                  vine diseases as soon as they occur to be able to follow their
                  evolution and plan the necessary interventions.
                </p>
              </div>
              <div className="tw-w-full md:tw-w-1/2 tw-p-6 tw-flex tw-justify-center">
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/homeIcon3.svg"
                  alt="Next.js Logo"
                  width={180}
                  height={37}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <FooterComponent />
      </div>
    </>
  );
}
