import { Link } from "react-router-dom";

const LandingPage = () => {
  
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div
        className="
          max-w-7xl
          mx-auto

          px-6
          sm:px-8
          lg:px-12

          py-12
          lg:py-20

          flex
          flex-col-reverse
          lg:flex-row

          items-center
          justify-between

          gap-12
        "
      >
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2">
          <span
            className="
              inline-block

              bg-blue-100
              text-blue-700

              px-4
              py-2

              rounded-full

              text-sm
              font-semibold
            "
          >
            🚀 Manage Projects Faster
          </span>

          <h1
            className="
              mt-6

              text-4xl
              sm:text-5xl
              lg:text-7xl

              font-bold

              leading-tight
            "
          >
            Organize Your
            <br />
            <span className="text-blue-600">
              Tasks & Teams
            </span>
            <br />
            Effortlessly
          </h1>

          <p
            className="
              mt-6

              text-gray-600

              text-base
              sm:text-lg

              max-w-xl
            "
          >
            TaskFlow helps teams collaborate,
            assign tasks, track progress, and
            deliver projects faster with a clean
            and modern workspace.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-8

              flex
              flex-col
              sm:flex-row

              gap-4
            "
          >
            <Link to="/signup">
              <button
                className="
                  px-8
                  py-4

                  bg-blue-600
                  text-white

                  font-semibold

                  rounded-xl

                  shadow-lg

                  hover:bg-blue-700
                  hover:scale-105

                  transition
                "
              >
                Get Started →
              </button>
            </Link>

            <button
              className="
                px-8
                py-4

                border
                border-gray-300

                rounded-xl

                font-semibold

                hover:bg-gray-100

                transition
              "
            >
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div
            className="
              mt-10

              grid
              grid-cols-3

              gap-6
            "
          >
            <div>
              <h3 className="text-2xl font-bold text-blue-600">
                5K+
              </h3>
              <p className="text-gray-500 text-sm">
                Tasks Managed
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-600">
                1K+
              </h3>
              <p className="text-gray-500 text-sm">
                Teams
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-purple-600">
                99%
              </h3>
              <p className="text-gray-500 text-sm">
                Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-1/2">
          <img
            src="/landingpage_img.png"
            alt="TaskFlow Dashboard"
            className="
              w-full
              max-w-2xl

              mx-auto

              drop-shadow-2xl

              hover:scale-105

              transition
              duration-500
            "
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;