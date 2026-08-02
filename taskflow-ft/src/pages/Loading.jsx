const Loading = ({ count }) => {
  
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3

        gap-6

        py-6
      "
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
            bg-white
            rounded-2xl
            border
            border-gray-200

            shadow-sm

            p-5

            animate-pulse
          "
        >
          {/* Title */}
          <div
            className="
              h-5
              w-3/4

              bg-gray-200

              rounded-md

              mb-4
            "
          />

          {/* Description */}
          <div
            className="
              h-3
              w-full

              bg-gray-200

              rounded-md

              mb-2
            "
          />

          <div
            className="
              h-3
              w-5/6

              bg-gray-200

              rounded-md

              mb-5
            "
          />

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div
              className="
                h-3
                w-20

                bg-gray-200

                rounded
              "
            />

            <div
              className="
                h-7
                w-16

                bg-gray-200

                rounded-full
              "
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;