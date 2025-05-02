import React, { useRef , useState, useEffect } from "react";
import Container from '@/components/common/Container'




interface WhyAwesomeSection {
    why_title?: string;
    awesome_title?: string;
    backers_heading?: string;
    backers_content?: string;
    creators_heading?: string;
    creators_content?: string;
  }
  
  interface PageData {
    why_awesome_section?: WhyAwesomeSection;
    // Add other sections if needed
  }

const WhyAwesomeSection = () => {


  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://batchatv.clickysoft.us/wp-json/wp/v1/page');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result: PageData = await response.json();
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    return (

        <section className='bg-black py-[120px] min-[320px]:max-[768px]:pb-[0] overflow-hidden  relative z-[10]'>


            <Container>
                <div className="flex min-[320px]:max-[1200px]:flex-wrap  gap-[55px] items-center">
                    <div className="min-[320px]:max-[1200px]:w-full   w-4/12">
                        <div className=''>
                            {data?.why_awesome_section?.why_title && (
                            <h3 className='min-[320px]:max-[1200px]:text-center min-[320px]:max-[1200px]:text-[35px] text-[80px] font-[NeueHaasDisplay75Bold] text-white leading-[1.4]'>
                                {data.why_awesome_section.why_title}
                                <span className='block bg-[linear-gradient(334.27deg,_#FC3E70_-4.61%,_#705DF2_112.9%)] bg-clip-text text-transparent min-[320px]:max-[768]:inline-block'>{data.why_awesome_section.awesome_title}</span>
                                </h3> 
                            )}
                        </div>
                            
                    </div>
                    <div className="min-[320px]:max-[768px]:w-full  min-[768px]:max-[1200px]:w-6/12 min-[768px]:max-[1200px]:mx-auto   w-8/12">
                        <div className="grid min-[320px]:max-[1200px]:grid-cols-1 min-[320px]:max-[1200px]:gap-[20px]   grid-cols-2 gap-[55px]">

                            
                            <div className='bg-[linear-gradient(180deg,_rgba(150,98,253,0.5)_0%,_rgba(40,36,59,0)_81%)]  border border-[#9662FD] rounded-[20px] p-[20px]'>
                                <div className='flex justify-center py-[30px]'>
                                    <div className="w-[58px] h-[58px] rounded-full bg-[#D9D9D9]"></div>
                                </div>

                                <div className='flex justify-center flex-col items-center pb-[30px]'>
                                {data?.why_awesome_section?.backers_heading && (
                                    <h4 className='text-center mb-[30px] font-[NeueHaasDisplayMedium] text-[#9662FD] text-[24px]'>{data.why_awesome_section.backers_heading}</h4>
                                )}
                                {data?.why_awesome_section?.backers_content && (
                                    <p className='text-center text-white font-[NeueHaasDisplayRoman] text-[18px]'>
                                       {data.why_awesome_section.backers_content}
                                    </p>
                                )}
                                </div>

                            </div>

                            <div className='bg-[linear-gradient(180deg,_rgba(150,98,253,0.5)_0%,_rgba(40,36,59,0)_81%)]  border border-[#9662FD] rounded-[20px] p-[20px]'>
                                <div className='flex justify-center py-[30px]'>
                                    <div className="w-[58px] h-[58px] rounded-full bg-[#D9D9D9]"></div>
                                </div>

                                <div className='flex justify-center flex-col items-center pb-[30px]'>
                                {data?.why_awesome_section?.creators_heading && (
                                    <h4 className='text-center mb-[30px] font-[NeueHaasDisplayMedium] text-[#9662FD] text-[24px]'>{data.why_awesome_section.creators_heading}</h4>
                                )}
                                {data?.why_awesome_section?.creators_content && (
                                    <p className='text-center text-white font-[NeueHaasDisplayRoman] text-[18px]'>
                                        {data.why_awesome_section.creators_content}
                                    </p>
                                )}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </Container>

        </section>
    )
}

export default WhyAwesomeSection