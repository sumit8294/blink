const SuggestionLoading = () => {
    
    return (
        <>
            {[...Array(5)].map((_, index) => {
                return (
                    <div
                        key={index}
                        className="mb-2 animate-pulse bg-blink-black-1 w-11/12 flex m-auto rounded h-14"
                    >
                        <div className="rounded-full bg-slate-200 w-8 h-8 m-2 my-auto"></div>
                        <div className="w-2/3 m-auto ml-0 mt-4">
                            <div className="w-full h-2 bg-slate-200 rounded-xl mb-2"></div>
                            <div className="w-11/12 h-2 bg-slate-200 rounded-xl"></div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default SuggestionLoading;
