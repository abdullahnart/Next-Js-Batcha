import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";


interface HowItWorksSection {
  for_backers?:{
    for_backers_heading: string;
    explore_trailers_heading: string;
    back_it_heading: string;
    watch_final_video_heading: string;
    vote_heading: string;
    backers_banner_image: string;
    backer_tabs?:{
      tab_1_heading?: string;
      tab_1_content?: string;
      tab_1_video?: string;
      tab_2_heading?: string;
      tab_2_content?: string;
      tab_2_video?: number; 
      tab_3_heading?: string; 
      tab_3_content?: string; 
      tab_3_video?: string; 
      tab_4_heading?: string; 
      tab_4_content?: string; 
      tab_4_button?: string; 
      tab_4_video?: string; 
    } 
  }
}

interface PageData {
  how_it_work_section?: HowItWorksSection;
}


export const BackerSlides = () => {

return (
  <>
    <div className="box  transition-opacity duration-500">
      <div className="w-full">
        <Container>
          <div className="flex justify-end">

            <div className="w-10/12 min-[1200px]:max-[1280px]:w-full ">
              <div className="flex justify-end items-center">
                <div className="w-6/12">

                  <div>
                    <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                      Browse Video Trailers

                    </h3>

                    <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">Scroll through endless potential. Preview unique video ideas creators want to make exclusively for their backers.</p>

                  </div>
                </div>
                <div className="w-5/12">

                  <div className="flex justify-center">

                    <div className="relative w-[73%]">
                      <Image src="/assets/images/pink-circle.svg" alt="" width={228} height={228} className="absolute top-[30px] right-[-50px] -z-1" />


                      <Image src="/assets/images/purple-circle.svg" alt="" width={42} height={42} className="absolute top-[71%] right-[-20px] -z-1" />
                      <Image src="/assets/images/blue-circle.svg" alt="" width={98} height={98} className="absolute top-[50%] left-[-28px] -z-1" />


                      <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                        <video
                          autoPlay={true}
                          playsInline
                          muted
                          loop
                          className="w-full h-full   aspect-video object-contain "
                          src="/assets/images/scrolling-feed.mp4"
                        />

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>
    </div>

    <div className="box  transition-opacity duration-500">
      <div className="w-full">
        <Container>
          <div className="flex justify-end">

            <div className="w-10/12 min-[1200px]:max-[1280px]:w-full ">
              <div className="flex justify-end items-center">
                <div className="w-6/12">

                  <div>
                    <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                      Make It Happen

                    </h3>

                    <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">Fund the projects that excite you. Set your contribution amount and help creators reach their goal to produce the final exclusive content.</p>

                  </div>
                </div>
                <div className="w-5/12">

                  <div className="flex justify-center">

                    <div className="relative w-[73%]">
                      <Image src="/assets/images/pink-circle.svg" alt="" width={228} height={228} className="absolute top-[30px] right-[-50px] -z-1" />
                      <Image src="/assets/images/orange-circle.svg" alt="" width={42} height={42} className="absolute top-[30px] left-[-51px] -z-1" />


                      <Image src="/assets/images/purple-circle.svg" alt="" width={42} height={42} className="absolute top-[71%] right-[-10px] -z-1" />
                      <Image src="/assets/images/blue-circle.svg" alt="" width={98} height={98} className="absolute top-[50%] left-[-46px] -z-1" />


                      <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                        <video
                          autoPlay={true}
                          playsInline
                          muted
                          loop
                          className="w-full h-full   aspect-video object-contain "
                          src="/assets/images/back-it.mp4"
                        />

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>
    </div>

    <div className="box  transition-opacity duration-500">
      <div className="w-full">
        <Container>
          <div className="flex justify-end">

            <div className="w-10/12 min-[1200px]:max-[1280px]:w-full ">
              <div className="flex justify-end items-center">
                <div className="w-6/12">

                  <div>
                    <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                      Access the Exclusive

                    </h3>

                    <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">See your support in action! Gain exclusive entry to view the final video content – the direct result of the community's backing.
                    </p>

                  </div>
                </div>
                <div className="w-5/12">

                  <div className="flex justify-center">

                    <div className="relative ">
                      <Image src="/assets/images/exclusive.png" alt="" width={430} height={546} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>
    </div>

    <div className="box  transition-opacity duration-500">
      <div className="w-full">
        <Container>
          <div className="flex justify-end">

            <div className="w-10/12 min-[1200px]:max-[1280px]:w-full ">
              <div className="flex justify-end items-center">
                <div className="w-6/12">

                  <div>
                    <h3 className="text-[#9662FD] font-[NeueHaasDisplayRoman] text-[50px] mb-[10px]">
                      Your Voice Matters

                    </h3>

                    <p className="text-white  font-[NeueHaasDisplayRoman] text-[30px]">Hold creators accountable. Use your vote to confirm if the creator successfully delivered the exclusive content they promised. Your vote directs the funds to the creator or back to your wallet, in which case you can back other creators on the platform.</p>
                    <div className="mt-[30px]">
                      <Link href="#" className="bg-[#9662FD] inline-flex justify-center rounded-[30px] text-[16px] px-[35px] py-[13px] font-[NeueHaasDisplayMedium] text-white ">Start browsing trailers</Link>
                    </div>
                  </div>
                </div>
                <div className="w-5/12">

                  <div className="flex justify-center">

                    <div className="relative w-[73%]">
                      <Image src="/assets/images/pink-circle.svg" alt="" width={134} height={134} className="absolute top-[230px] right-[-70px] -z-1" />
                      <Image src="/assets/images/orange-circle.svg" alt="" width={88} height={88} className="absolute  left-[100px] -z-1 bottom-[-20px]" />


                      <Image src="/assets/images/purple-circle.svg" alt="" width={98} height={98} className="absolute top-[-50px] left-[105px] -z-1" />
                      <Image src="/assets/images/blue-circle.svg" alt="" width={98} height={98} className="absolute top-[40%] left-[-46px] -z-1" />


                      <div className=" h-[518px] w-full bg-white  rounded-[16px] overflow-hidden relative">
                        <video
                          autoPlay={true}
                          playsInline
                          muted
                          loop
                          className="w-full h-full   aspect-video object-contain "
                          src="/assets/images/voice-matters.mp4"
                        />

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>
    </div>
  </>

);
}