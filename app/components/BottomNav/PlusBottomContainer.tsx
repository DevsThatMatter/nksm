const PlusBottomContainer = () => {
  return (
    <div className="relative h-full w-10">
      <button className="rounded-full my-1 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 hover:-translate-y-1 duration-300 active:-translate-y-1 transition flex justify-center items-center group">
        <svg
          className=" transition duration-300 text-white group-hover:-translate-y-1
                     w-8 mx-1"
          viewBox="0 0 512 512"
        >
          <path
            d="M448 224H288V64h-64v160H64v64h160v160h64V288h160z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  );
};
export default PlusBottomContainer;
