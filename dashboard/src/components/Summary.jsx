const Summary = () => {
  return (
    <>
    <div className="flex flex-col gap-4 justify-center">
      <h6 className="text-2xl font-medium text-slate-700">Hi, User!</h6>
      <hr className="my-4 border-slate-200" />

      {/* Equity Section */}
      <section className="border-b border-slate-200 py-20">
        <h6 className="text-xl font-medium text-slate-600 mb-6 flex gap-2 items-center"><i className="fa-regular fa-clock"></i>Equity</h6>

        <div className="flex items-center gap-8">
          <div>
            <h3 className="text-4xl font-base text-slate-800">3.74k</h3>
            <p className="text-xs text-slate-500 mt-1">Margin available</p>
          </div>

          <div className="h-12 w-px bg-slate-200" />

          <div className="text-sm text-slate-500">
            <p>Margins used <span className="text-slate-700">0</span></p>
            <p>Opening balance <span className="text-slate-700">3.74k</span></p>
          </div>
        </div>
      </section>

      {/* Holdings Section */}
      <section className="py-20 ">
        <h6 className="text-xl font-medium text-slate-600 mb-6 flex gap-2 items-center">
<i className="fa-regular fa-calendar"></i>Holdings (13)</h6>

        <div className="flex items-center gap-8">
          <div>
            <h3 className="text-4xl font-base  text-emerald-600">
              1.55k <small className="text-xs text-emerald-500 font-base">+5.20%</small>
            </h3>
            <p className="text-xs text-slate-500 mt-1">P&amp;L</p>
          </div>

          <div className="h-12 w-px bg-slate-200" />

          <div className="text-sm text-slate-500">
            <p>Current Value <span className="text-slate-700">31.43k</span></p>
            <p>Investment <span className="text-slate-700">29.88k</span></p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Summary;
