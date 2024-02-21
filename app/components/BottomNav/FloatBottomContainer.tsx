const FloatBottomContainer = () => {
  return (
    <div className="relative  h-full w-12 ">
      <div
        className=" z-20 h-full w-full absolute
                          -top-4"
      >
        <div
          className="rounded-full h-full w-full border-transparent
                              border-[0.2rem]"
        >
          <button className="rounded-full w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 hover:-translate-y-1 transition duration-300 flex justify-center items-center group">
            <svg
              className=" transition duration-300 text-white group-hover:-translate-y-1
                               w-8"
              viewBox="0 0 512 512"
            >
              <path
                d="M448 224H288V64h-64v160H64v64h160v160h64V288h160z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        className="relative overflow-hidden after:content-[''] after:absolute after:rounded-[100%] w-full   backdrop-blur-md
           h-8 mt-4 after:top-[-2rem] after:left-[-0.1rem] after:w-[3.2rem] after:h-[3.2rem] after:shadow-[0px_0px_0px_4rem_#f7f7f78c] dark:after:shadow-[0px_0px_0px_4rem_#1f1f1f8c]"
      />
    </div>
  );
};

export default FloatBottomContainer;
