export default function InfoSection() {
  return (
    <div className="relative h-[90px]">
      {/* Top info bar */}
      <div className="flex w-full h-[90px] items-center justify-center gap-2.5 px-8 py-5 bg-[#1717179e]">
        <div className="relative w-fit [font-family:'Neue_Montreal-Regular',Helvetica] font-normal text-xl tracking-[0] leading-[normal] whitespace-nowrap">
          <span className="text-[#8e8888]">
            We are committed to advancing cancer research by harnessing
          </span>
          <span className="text-[#303030]">&nbsp;</span>
          <span className="text-[#5f1fe7]">decentralized science</span>
          <span className="text-[#8e8888]">
            {" "}
            to accelerate breakthroughs and enhance patient outcomes.
          </span>
        </div>
      </div>
    </div>
  );
}
