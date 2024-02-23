const FloatBottomContainer = () => {
  return (
    <div className="relative  h-full w-12 ">
      <div
        className=" absolute -top-4 z-20 h-full
                          w-full"
      >
        <div
          className="h-full w-full rounded-full border-[0.2rem]
                              border-transparent"
        >
          <button className="group flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 transition duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-purple-500">
            <svg
              className=" w-8 text-white transition duration-300
                               group-hover:-translate-y-1"
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
        className="relative mt-4 h-8 w-full overflow-hidden backdrop-blur-md   after:absolute
           after:left-[-0.1rem] after:top-[-2rem] after:h-[3.2rem] after:w-[3.2rem] after:rounded-[100%] after:shadow-[0px_0px_0px_4rem_#f7f7f78c] after:content-[''] dark:after:shadow-[0px_0px_0px_4rem_#1f1f1f8c]"
      />
    </div>
  );
};

export default FloatBottomContainer;
