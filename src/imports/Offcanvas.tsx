import svgPaths from "./svg-cgybs3q8k7";
import imgImageLiveExperiences from "figma:asset/bbc54d07a056408899144c01668e18bd7da6fc6f.png";
import imgImageStreetGuerrilla from "figma:asset/708a2d9ea25fac0fd1ce5aade2efd3e7762ab6db.png";
import imgImageDigitalImmersive from "figma:asset/b8955fdaf49e89654bdb15bd77088e871dcc3c7c.png";
import imgImageCommunityCultural from "figma:asset/46ff705054e32de6f63edb87b5eeaf2b3bd042c2.png";
import imgImageStreetTeams from "figma:asset/37276ca8ef4074e65d3d6776fec7379bdc3e3652.png";
import imgImageSamplingCampaigns from "figma:asset/dc4b9004065adf284a9f3e01d67e976f2efbc10c.png";
import imgImageWildPosting from "figma:asset/1b2eaf5f57ab0a67e5592a7ed9c34ade1fac1048.png";
import imgImageMobileTours from "figma:asset/5cffcd8dd81f8801c04963fbf1f0de9635743cd0.png";

function Container2() {
  return <div className="bg-[#968ab6] h-px shrink-0 w-[32px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[18px] relative shrink-0 w-[116.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[#968ab6] text-[12px] top-[0.5px] tracking-[3.6px] uppercase">What We Do</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[18px] items-center left-0 top-0 w-[1320px]" data-name="Container">
      <Container2 />
      <Text />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[114.391px] left-0 top-[34px] w-[672px]" data-name="Heading 2">
      <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[0] left-0 text-[#111] text-[0px] text-[52px] top-[-0.5px] w-[633px] whitespace-pre-wrap">
        <span className="leading-[57.2px]">{`Building Experiences That `}</span>
        <span className="font-['Playfair_Display:Bold_Italic',sans-serif] italic leading-[57.2px] text-[#968ab6]">Move</span>
        <span className="leading-[57.2px]">{` People`}</span>
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[148.391px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Heading />
    </div>
  );
}

function ImageLiveExperiences() {
  return (
    <div className="absolute h-[420px] left-0 top-0 w-[874.664px]" data-name="Image (Live Experiences)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageLiveExperiences} />
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-gradient-to-t from-[rgba(17,17,17,0.9)] h-[420px] left-0 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(17,17,17,0.3)] w-[874.664px]" data-name="Container" />;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3d881d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[26.398px] relative shrink-0 w-[182.82px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[26.4px] left-0 not-italic text-[22px] text-white top-[0.5px]">Live Experiences</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[32px] top-[32px] w-[810.664px]" data-name="Container">
      <Container8 />
      <Heading1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[44.797px] left-[32px] top-[84px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.6)] top-[0.5px] w-[439px] whitespace-pre-wrap">Large-scale brand activations, concerts, festivals, and experiential pop-ups that create unforgettable moments.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[160.797px] left-0 top-[259.2px] w-[874.664px]" data-name="Container">
      <Container7 />
      <Paragraph />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[420px] left-0 overflow-clip rounded-[16px] top-0 w-[874.664px]" data-name="Container">
      <ImageLiveExperiences />
      <Container5 />
      <Container6 />
    </div>
  );
}

function ImageStreetGuerrilla() {
  return (
    <div className="absolute h-[420px] left-0 top-0 w-[429.336px]" data-name="Image (Street & Guerrilla)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageStreetGuerrilla} />
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-gradient-to-t from-[rgba(17,17,17,0.9)] h-[420px] left-0 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(17,17,17,0.3)] w-[429.336px]" data-name="Container" />;
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pd2eb480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p19685c00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p226d9800} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2a5062c0} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[26.398px] relative shrink-0 w-[182.523px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[26.4px] left-0 not-italic text-[22px] text-white top-[0.5px]">{`Street & Guerrilla`}</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Heading2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[67.195px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.6)] top-[0.5px] w-[341px] whitespace-pre-wrap">{`Unconventional marketing that meets people where they are — on the streets, in neighborhoods, at culture's pulse.`}</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[183.195px] items-start left-0 pt-[32px] px-[32px] top-[236.8px] w-[429.336px]" data-name="Container">
      <Container12 />
      <Paragraph1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[420px] left-[890.66px] overflow-clip rounded-[16px] top-0 w-[429.336px]" data-name="Container">
      <ImageStreetGuerrilla />
      <Container10 />
      <Container11 />
    </div>
  );
}

function ImageDigitalImmersive() {
  return (
    <div className="absolute h-[420px] left-0 top-0 w-[429.328px]" data-name="Image (Digital & Immersive)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageDigitalImmersive} />
    </div>
  );
}

function Container15() {
  return <div className="absolute bg-gradient-to-t from-[rgba(17,17,17,0.9)] h-[420px] left-0 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(17,17,17,0.3)] w-[429.328px]" data-name="Container" />;
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p138a5f40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 13.5H9.0075" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[26.398px] relative shrink-0 w-[206.406px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[26.4px] left-0 not-italic text-[22px] text-white top-[0.5px]">{`Digital & Immersive`}</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Heading3 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[67.195px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.6)] top-[0.5px] w-[341px] whitespace-pre-wrap">AR/VR installations, interactive screens, and digital-first experiences that bridge physical and virtual worlds.</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[183.195px] items-start left-0 pt-[32px] px-[32px] top-[236.8px] w-[429.328px]" data-name="Container">
      <Container17 />
      <Paragraph2 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[420px] left-0 overflow-clip rounded-[16px] top-[436px] w-[429.328px]" data-name="Container">
      <ImageDigitalImmersive />
      <Container15 />
      <Container16 />
    </div>
  );
}

function ImageCommunityCultural() {
  return (
    <div className="absolute h-[420px] left-0 top-0 w-[874.672px]" data-name="Image (Community & Cultural)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageCommunityCultural} />
    </div>
  );
}

function Container20() {
  return <div className="absolute bg-gradient-to-t from-[rgba(17,17,17,0.9)] h-[420px] left-0 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(17,17,17,0.3)] w-[874.672px]" data-name="Container" />;
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p288ca880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[26.398px] relative shrink-0 w-[235.672px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[26.4px] left-0 not-italic text-[22px] text-white top-[0.5px]">{`Community & Cultural`}</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[32px] top-[32px] w-[810.672px]" data-name="Container">
      <Container23 />
      <Heading4 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[44.797px] left-[32px] top-[84px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.6)] top-[0.5px] w-[443px] whitespace-pre-wrap">Authentic engagement with diverse communities through culturally intelligent, meaningful activations.</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[160.797px] left-0 top-[259.2px] w-[874.672px]" data-name="Container">
      <Container22 />
      <Paragraph3 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[420px] left-[445.33px] overflow-clip rounded-[16px] top-[436px] w-[874.672px]" data-name="Container">
      <ImageCommunityCultural />
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[856px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container9 />
      <Container14 />
      <Container19 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[64px] h-[1068.391px] items-start left-[275.5px] top-[124.5px] w-[1320px]" data-name="Section">
      <Container />
      <Container3 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[251.195px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[40px] left-[125.9px] text-[#111] text-[40px] text-center top-[-1px]">14+</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[68px] left-0 top-0 w-[251.195px]" data-name="Container">
      <Container26 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[125.46px] not-italic text-[#717182] text-[12px] text-center top-[47px] tracking-[0.6px]">Years in the Game</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[251.203px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[40px] left-[125.77px] text-[#111] text-[40px] text-center top-[-1px]">1,200+</p>
    </div>
  );
}

function Container29() {
  return <div className="absolute bg-[#e5e5ea] h-[48px] left-0 top-[10px] w-px" data-name="Container" />;
}

function Container27() {
  return (
    <div className="absolute h-[68px] left-[267.2px] top-0 w-[251.203px]" data-name="Container">
      <Container28 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[125.48px] not-italic text-[#717182] text-[12px] text-center top-[47px] tracking-[0.6px]">Activations Delivered</p>
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[251.195px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[40px] left-[126.03px] text-[#111] text-[40px] text-center top-[-1px]">50+</p>
    </div>
  );
}

function Container32() {
  return <div className="absolute bg-[#e5e5ea] h-[48px] left-0 top-[10px] w-px" data-name="Container" />;
}

function Container30() {
  return (
    <div className="absolute h-[68px] left-[534.4px] top-0 w-[251.195px]" data-name="Container">
      <Container31 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[126.52px] not-italic text-[#717182] text-[12px] text-center top-[47px] tracking-[0.6px]">Markets Covered</p>
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[251.203px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[40px] left-[126.02px] text-[#111] text-[40px] text-center top-[-1px]">300M+</p>
    </div>
  );
}

function Container35() {
  return <div className="absolute bg-[#e5e5ea] h-[48px] left-0 top-[10px] w-px" data-name="Container" />;
}

function Container33() {
  return (
    <div className="absolute h-[68px] left-[801.59px] top-0 w-[251.203px]" data-name="Container">
      <Container34 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[126.49px] not-italic text-[#717182] text-[12px] text-center top-[47px] tracking-[0.6px]">Total Impressions</p>
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[251.195px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[40px] left-[125.76px] text-[#111] text-[40px] text-center top-[-1px]">98%</p>
    </div>
  );
}

function Container38() {
  return <div className="absolute bg-[#e5e5ea] h-[48px] left-0 top-[10px] w-px" data-name="Container" />;
}

function Container36() {
  return (
    <div className="absolute h-[68px] left-[1068.8px] top-0 w-[251.195px]" data-name="Container">
      <Container37 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[125.8px] not-italic text-[#717182] text-[12px] text-center top-[47px] tracking-[0.6px]">Client Satisfaction</p>
      <Container38 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[68px] left-[275.5px] top-[80px] w-[1320px]" data-name="Container">
      <Container25 />
      <Container27 />
      <Container30 />
      <Container33 />
      <Container36 />
    </div>
  );
}

function Container39() {
  return <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-px left-0 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(150,138,182,0.2)] w-[1871px]" data-name="Container" />;
}

function Container40() {
  return <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-px left-0 to-[rgba(0,0,0,0)] top-[227px] via-1/2 via-[rgba(150,138,182,0.2)] w-[1871px]" data-name="Container" />;
}

function Section1() {
  return (
    <div className="absolute bg-[#f7f7f9] h-[228px] left-0 overflow-clip top-[1320.89px] w-[1871px]" data-name="Section">
      <Container24 />
      <Container39 />
      <Container40 />
    </div>
  );
}

function ImageStreetGuerrilla1() {
  return (
    <div className="absolute h-[400px] left-0 top-0 w-[640px]" data-name="Image (Street & Guerrilla)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageStreetGuerrilla} />
    </div>
  );
}

function Container44() {
  return <div className="absolute bg-gradient-to-t from-[#111] h-[400px] left-0 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(17,17,17,0.4)] w-[640px]" data-name="Container" />;
}

function Container45() {
  return <div className="absolute bg-gradient-to-r from-[rgba(17,17,17,0.3)] h-[400px] left-0 to-[rgba(0,0,0,0)] top-0 w-[640px]" data-name="Container" />;
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p223dec00} id="Vector" stroke="var(--stroke-0, #968AB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.p3a2f1500} id="Vector_2" stroke="var(--stroke-0, #968AB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.p39eb6800} id="Vector_3" stroke="var(--stroke-0, #968AB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.p12c6f180} id="Vector_4" stroke="var(--stroke-0, #968AB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.7)] top-[0.5px] tracking-[1.5px] uppercase">Capability</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.06)] content-stretch flex gap-[8px] h-[29px] items-center left-[24px] px-[13px] py-px rounded-[16777200px] top-[20px] w-[120.969px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Icon4 />
      <Text1 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[44px] left-0 text-[40px] text-white top-[-1px]">{`Street & Guerrilla`}</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Playfair_Display:Italic',sans-serif] font-normal italic leading-[22.5px] left-0 text-[#968ab6] text-[15px] top-0">{`Culture doesn't wait — neither do we`}</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74.5px] items-start left-[32px] top-[293.5px] w-[576px]" data-name="Container">
      <Heading5 />
      <Paragraph4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M13.5 4.5L4.5 13.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M4.5 4.5L13.5 13.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center left-[576px] p-px rounded-[16777200px] size-[44px] top-[20px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Icon5 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[400px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageStreetGuerrilla1 />
      <Container44 />
      <Container45 />
      <Container46 />
      <Container47 />
      <Button />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[54px] left-[32px] top-0 w-[576px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[15px] text-[rgba(255,255,255,0.5)] top-[-0.5px] w-[569px] whitespace-pre-wrap">{`Unconventional marketing that meets people where they are — on the streets, in neighborhoods, at culture's pulse.`}</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[28.797px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[28.8px] left-[75.35px] text-[#968ab6] text-[24px] text-center top-0">200+</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[75.36px] not-italic text-[10px] text-[rgba(255,255,255,0.35)] text-center top-[0.5px] tracking-[0.5px]">Cities Activated</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] col-1 h-[81.797px] justify-self-stretch relative rounded-[14px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.06)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container51 />
        <Container52 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[28.797px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[28.8px] left-[75.14px] text-[#968ab6] text-[24px] text-center top-0">45M+</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[75.17px] not-italic text-[10px] text-[rgba(255,255,255,0.35)] text-center top-[0.5px] tracking-[0.5px]">Street Impressions</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] col-2 h-[81.797px] justify-self-stretch relative rounded-[14px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.06)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container54 />
        <Container55 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[28.797px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[28.8px] left-[75.22px] text-[#968ab6] text-[24px] text-center top-0">3x</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[74.67px] not-italic text-[10px] text-[rgba(255,255,255,0.35)] text-center top-[0.5px] tracking-[0.5px]">Avg. ROI Multiplier</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] col-3 h-[81.797px] justify-self-stretch relative rounded-[14px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.06)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container57 />
        <Container58 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[81.797px] left-[32px] top-[86px] w-[576px]" data-name="Container">
      <Container50 />
      <Container53 />
      <Container56 />
    </div>
  );
}

function Container60() {
  return <div className="bg-[#968ab6] h-px shrink-0 w-[24px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="h-[15px] relative shrink-0 w-[131.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[#968ab6] text-[10px] top-[0.5px] tracking-[2.5px] uppercase">What We Deliver</p>
      </div>
    </div>
  );
}

function Container61() {
  return <div className="bg-[rgba(255,255,255,0.06)] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Container" />;
}

function Container59() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[15px] items-center left-[32px] top-[207.8px] w-[576px]" data-name="Container">
      <Container60 />
      <Text2 />
      <Container61 />
    </div>
  );
}

function ImageStreetTeams() {
  return (
    <div className="absolute h-[140px] left-0 top-0 w-[576px]" data-name="Image (Street Teams)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageStreetTeams} />
    </div>
  );
}

function Container65() {
  return <div className="absolute bg-[rgba(17,17,17,0.75)] h-[140px] left-0 top-0 w-[576px]" data-name="Container" />;
}

function Container66() {
  return <div className="absolute bg-gradient-to-r from-[rgba(17,17,17,0.5)] h-[140px] left-0 to-[rgba(0,0,0,0)] top-0 w-[576px]" data-name="Container" />;
}

function Container64() {
  return (
    <div className="absolute h-[140px] left-0 top-0 w-[576px]" data-name="Container">
      <ImageStreetTeams />
      <Container65 />
      <Container66 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[14.398px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#968ab6] text-[14px] top-0">01</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="bg-[rgba(150,138,182,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(150,138,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px pr-[1.008px] py-px relative size-full">
        <Text3 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[20.797px] relative shrink-0 w-[101.984px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20.8px] left-0 not-italic text-[16px] text-white top-[-0.5px]">Street Teams</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex h-[20.797px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading6 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[42.891px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.45px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.4)] top-[0.5px] w-[463px] whitespace-pre-wrap">{`Trained, on-brand ambassadors deployed in key markets to create face-to-face connections that digital alone can't replicate.`}</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="flex-[1_0_0] h-[69.688px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container70 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[109.688px] items-start left-0 pt-[20px] px-[20px] top-0 w-[576px]" data-name="Container">
      <Container68 />
      <Container69 />
    </div>
  );
}

function Container71() {
  return <div className="absolute bg-gradient-to-r from-[#968ab6] h-[2px] left-0 to-[rgba(0,0,0,0)] top-[138px] w-0" data-name="Container" />;
}

function Container63() {
  return (
    <div className="h-[140px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container67 />
      <Container71 />
    </div>
  );
}

function ImageSamplingCampaigns() {
  return (
    <div className="absolute h-[140px] left-0 top-0 w-[576px]" data-name="Image (Sampling Campaigns)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageSamplingCampaigns} />
    </div>
  );
}

function Container74() {
  return <div className="absolute bg-[rgba(17,17,17,0.75)] h-[140px] left-0 top-0 w-[576px]" data-name="Container" />;
}

function Container75() {
  return <div className="absolute bg-gradient-to-r from-[rgba(17,17,17,0.5)] h-[140px] left-0 to-[rgba(0,0,0,0)] top-0 w-[576px]" data-name="Container" />;
}

function Container73() {
  return (
    <div className="absolute h-[140px] left-0 top-0 w-[576px]" data-name="Container">
      <ImageSamplingCampaigns />
      <Container74 />
      <Container75 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#968ab6] text-[14px] top-0">02</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="bg-[rgba(150,138,182,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(150,138,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Text4 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[20.797px] relative shrink-0 w-[163.672px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20.8px] left-0 not-italic text-[16px] text-white top-[-0.5px]">Sampling Campaigns</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex h-[20.797px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading7 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[42.891px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.45px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.4)] top-[0.5px] w-[458px] whitespace-pre-wrap">Strategic product sampling at high-traffic cultural moments — getting your product into the right hands at the right time.</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="flex-[1_0_0] h-[69.688px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container79 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[109.688px] items-start left-0 pt-[20px] px-[20px] top-0 w-[576px]" data-name="Container">
      <Container77 />
      <Container78 />
    </div>
  );
}

function Container80() {
  return <div className="absolute bg-gradient-to-r from-[#968ab6] h-[2px] left-0 to-[rgba(0,0,0,0)] top-[138px] w-0" data-name="Container" />;
}

function Container72() {
  return (
    <div className="h-[140px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <Container73 />
      <Container76 />
      <Container80 />
    </div>
  );
}

function ImageWildPosting() {
  return (
    <div className="absolute h-[140px] left-0 top-0 w-[576px]" data-name="Image (Wild Posting)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWildPosting} />
    </div>
  );
}

function Container83() {
  return <div className="absolute bg-[rgba(17,17,17,0.75)] h-[140px] left-0 top-0 w-[576px]" data-name="Container" />;
}

function Container84() {
  return <div className="absolute bg-gradient-to-r from-[rgba(17,17,17,0.5)] h-[140px] left-0 to-[rgba(0,0,0,0)] top-0 w-[576px]" data-name="Container" />;
}

function Container82() {
  return (
    <div className="absolute h-[140px] left-0 top-0 w-[576px]" data-name="Container">
      <ImageWildPosting />
      <Container83 />
      <Container84 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[15.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#968ab6] text-[14px] top-0">03</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="bg-[rgba(150,138,182,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(150,138,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Text5 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[20.797px] relative shrink-0 w-[97.078px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20.8px] left-0 not-italic text-[16px] text-white top-[-0.5px]">Wild Posting</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex h-[20.797px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading8 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[42.891px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.45px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.4)] top-[0.5px] w-[459px] whitespace-pre-wrap">Bold, large-format visual campaigns placed in urban landscapes — turning city walls into storytelling canvases.</p>
    </div>
  );
}

function Container87() {
  return (
    <div className="flex-[1_0_0] h-[69.688px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container88 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[109.688px] items-start left-0 pt-[20px] px-[20px] top-0 w-[576px]" data-name="Container">
      <Container86 />
      <Container87 />
    </div>
  );
}

function Container89() {
  return <div className="absolute bg-gradient-to-r from-[#968ab6] h-[2px] left-0 to-[rgba(0,0,0,0)] top-[138px] w-0" data-name="Container" />;
}

function Container81() {
  return (
    <div className="h-[140px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <Container82 />
      <Container85 />
      <Container89 />
    </div>
  );
}

function ImageMobileTours() {
  return (
    <div className="absolute h-[140px] left-0 top-0 w-[576px]" data-name="Image (Mobile Tours)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageMobileTours} />
    </div>
  );
}

function Container92() {
  return <div className="absolute bg-[rgba(17,17,17,0.75)] h-[140px] left-0 top-0 w-[576px]" data-name="Container" />;
}

function Container93() {
  return <div className="absolute bg-gradient-to-r from-[rgba(17,17,17,0.5)] h-[140px] left-0 to-[rgba(0,0,0,0)] top-0 w-[576px]" data-name="Container" />;
}

function Container91() {
  return (
    <div className="absolute h-[140px] left-0 top-0 w-[576px]" data-name="Container">
      <ImageMobileTours />
      <Container92 />
      <Container93 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16.305px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#968ab6] text-[14px] top-0">04</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="bg-[rgba(150,138,182,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(150,138,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px pr-[1.008px] py-px relative size-full">
        <Text6 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[20.797px] relative shrink-0 w-[100.344px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20.8px] left-0 not-italic text-[16px] text-white top-[-0.5px]">Mobile Tours</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex h-[20.797px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading9 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[42.891px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.45px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.4)] top-[0.5px] w-[411px] whitespace-pre-wrap">{`Branded mobile units that travel market-to-market, bringing the full experience directly to your target audience's doorstep.`}</p>
    </div>
  );
}

function Container96() {
  return (
    <div className="flex-[1_0_0] h-[69.688px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container97 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[109.688px] items-start left-0 pt-[20px] px-[20px] top-0 w-[576px]" data-name="Container">
      <Container95 />
      <Container96 />
    </div>
  );
}

function Container98() {
  return <div className="absolute bg-gradient-to-r from-[#968ab6] h-[2px] left-0 to-[rgba(0,0,0,0)] top-[138px] w-0" data-name="Container" />;
}

function Container90() {
  return (
    <div className="h-[140px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <Container91 />
      <Container94 />
      <Container98 />
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[608px] items-start left-[32px] top-[246.8px] w-[576px]" data-name="Container">
      <Container63 />
      <Container72 />
      <Container81 />
      <Container90 />
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[902.797px] relative shrink-0 w-full" data-name="Container">
      <Paragraph5 />
      <Container49 />
      <Container59 />
      <Container62 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M11.25 13.5L6.75 9L11.25 4.5" id="Vector" stroke="var(--stroke-0, #968AB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e5ea] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #968AB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e5ea] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-start relative shrink-0 w-[88px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-[#111] content-stretch flex flex-col gap-[24px] h-[1548px] items-center overflow-clip right-[11px] top-0 w-[640px]" data-name="Container">
      <Container43 />
      <Container48 />
      <Container99 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute backdrop-blur-[7.5px] bg-[rgba(17,17,17,0.7)] h-[1548px] left-0 top-px w-[1883px]" data-name="Container">
      <Container42 />
    </div>
  );
}

export default function Offcanvas() {
  return (
    <div className="bg-[#f7f7f9] relative size-full" data-name="Offcanvas">
      <Section />
      <Section1 />
      <Container41 />
    </div>
  );
}