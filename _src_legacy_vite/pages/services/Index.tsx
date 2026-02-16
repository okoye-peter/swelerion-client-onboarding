import { Link, useNavigate } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader'

const Index = () => {
    const navigate = useNavigate();
    

    return (
        <div className="min-h-screen bg-white text-ink">
            <SiteHeader />
            <main className="mx-auto flex w-full flex-col px-4 py-10 sm:px-6 lg:px-[50px]">
                <div className="flex items-center gap-3 text-[18px] font-medium text-muted mb-16">
                    <span>Home</span>
                    <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-subtle"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                    <span className="font-normal text-primary-600">Select Service</span>
                </div>

                {/* go back */}
                <section className="mb-10">
                    <span className="flex items-center cursor-pointer gap-x-3 w-fit" onClick={() => navigate(-1)}>
                        <button onClick={() => navigate(-1)} className='p-3.5 rounded-lg bg-[#F5F5F5] hover:bg-[#e2e2e2] flex items-center gap-2 text-sm text-muted'>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.70711 0.292893C8.09763 0.683417 8.09763 1.31658 7.70711 1.70711L3.41421 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H3.41421L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893Z" fill="#252B37" />
                            </svg>
                        </button>
                        <span>Go back</span>
                    </span>
                </section>

                {/* services section */}
                <div className="">
                    <h3 className='text-3xl/[38px] font-neue-haas-medium font-semibold text-ink mb-2'>Select a Service</h3>
                    <p className='text-[#717680] text-base/6 font-normal font-dm-sans'>Pick the project you want to begin—mixing, mastering, or more.</p>

                    <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3">
                        {/* Mixing services */}
                        <div className="p-4 border rounded-2xl border-[#E9EAEB] bg-[#FAFAFA]">
                            <h3 className='font-neue-haas-medium font-semibold text-2xl mb-3.5 text-ink'>Mixing</h3>
                            <p className='text-sm font-normal text-[#717680] font-dm-sans mb-4'>Get your tracks balanced and polished. Blend your vocals and instruments to create a clean, cohesive sound ready for the final master.</p>
                            <div className="p-4 mb-2 bg-white rounded-lg">
                                <h4 className="mb-4 text-base font-semibold font-dm-sans text-ink">What You Get With This Service</h4>

                                <div className="flex flex-col mb-2 gap-y-4">
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Balanced levels across all vocal and instrumental tracks</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Cleaned and enhanced vocals</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">EQ, compression, and effects applied for clarity and depth</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">A cohesive mix that feels polished and ready for mastering</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">A preview version for review and feedback</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 mb-4 bg-white rounded-lg">
                                <h4 className="mb-4 text-base font-semibold font-dm-sans text-ink">What do i need to get started ?</h4>

                                <div className="flex flex-col mb-2 gap-y-4">
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Separate beat and vocal files</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">High-quality audio files (WAV recommended)</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Stems properly labeled for easy workflow</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Any notes, references or examples of your preferred sound</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Optional: Effects or creative directions you want the engineer to follow</p>
                                    </div>
                                </div>
                            </div>

                            {/* select mixing service button */}
                            <Link to={'/projects/create'} className="block w-full px-6 py-2 font-semibold text-center text-white rounded-lg bg-primary-500 font-dm-sans">Select Service</Link>

                        </div>

                        {/* Mastering services */}
                        <div className="p-4 border rounded-2xl border-[#E9EAEB] bg-[#FAFAFA]">
                            <h3 className='font-neue-haas-medium font-semibold text-2xl mb-3.5 text-ink'>Mastering</h3>
                            <p className='text-sm font-normal text-[#717680] font-dm-sans mb-4'>Give your tracks its final polish. Improved loudness, clarity and overall balance so your music sounds professional and consistent on all speakers and streaming platforms.</p>
                            <div className="p-4 mb-2 bg-white rounded-lg">
                                <h4 className="mb-4 text-base font-semibold font-dm-sans text-ink">What You Get With This Service</h4>

                                <div className="flex flex-col mb-2 gap-y-4">
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">A clean, balanced and release-ready master</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Optimized loudness for streaming platforms</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Enhanced clarity and overall tonal balance</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Consistent sound across all playback systems</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Final audio delivered in high-quality formats</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 mb-4 bg-white rounded-lg">
                                <h4 className="mb-4 text-base font-semibold font-dm-sans text-ink">What do i need to get started ?</h4>

                                <div className="flex flex-col mb-2 gap-y-4">
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">The final mixed stereo file (WAV recommended)</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Any reference tracks you want us to follow</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Notes about loudness, tone or preferred sound</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Your project details or release requirements</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Optional: alternate versions needed (instrumental, clean, performance)</p>
                                    </div>
                                </div>
                            </div>

                            {/* select Mastering service button */}
                            <Link to={'/projects/create'} className="block w-full px-6 py-2 font-semibold text-center text-white rounded-lg bg-primary-500 font-dm-sans">Select Service</Link>

                        </div>

                        {/* Dolby ATMOS services */}
                        <div className="p-4 border rounded-2xl border-[#E9EAEB] bg-[#FAFAFA]">
                            <h3 className='font-neue-haas-medium font-semibold text-2xl mb-3.5 text-ink'>Dolby ATMOS</h3>
                            <p className='text-sm font-normal text-[#717680] font-dm-sans mb-4'>Give your tracks a  three-dimensional immersive sound. Enhanced music depth, movement and a more realistic listening experience.</p>
                            <div className="p-4 mb-2 bg-white rounded-lg">
                                <h4 className="mb-4 text-base font-semibold font-dm-sans text-ink">What You Get With This Service</h4>

                                <div className="flex flex-col mb-2 gap-y-4">
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">A full Dolby Atmos mix of your song</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Enhanced depth, clarity and spatial movement</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Balanced elements across a 3D sound field</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Mastered exports for streaming platforms that support Atmos</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Standard stereo version included for compatibility</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 mb-4 bg-white rounded-lg">
                                <h4 className="mb-4 text-base font-semibold font-dm-sans text-ink">What do i need to get started ?</h4>

                                <div className="flex flex-col mb-2 gap-y-4">
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">All stems separated and properly labeled</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">High-quality audio files (WAV recommended)</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Your final approved mix or production version</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Any version requirements (radio, instrumental, performance)</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66634C5.0544 2.66634 2.66659 5.05416 2.66659 7.99967C2.66659 10.9452 5.0544 13.333 7.99992 13.333C10.9454 13.333 13.3333 10.9452 13.3333 7.99967C13.3333 5.05416 10.9454 2.66634 7.99992 2.66634ZM1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967ZM10.4713 6.19494C10.7317 6.45529 10.7317 6.8774 10.4713 7.13775L7.80466 9.80441C7.54431 10.0648 7.1222 10.0648 6.86185 9.80441L5.52851 8.47108C5.26816 8.21073 5.26816 7.78862 5.52851 7.52827C5.78886 7.26792 6.21097 7.26792 6.47132 7.52827L7.33325 8.3902L9.52851 6.19494C9.78886 5.93459 10.211 5.93459 10.4713 6.19494Z" fill="#78BA14" />
                                        </svg>
                                        <p className="text-xs/[18px] font-normal text-[#414651] font-dm-sans">Notes or references for how you want elements placed in the 3D space</p>
                                    </div>
                                </div>
                            </div>

                            {/* select Dolby ATMOS service button */}
                            <Link to={'/projects/create'} className="block w-full px-6 py-2 font-semibold text-center text-white rounded-lg bg-primary-500 font-dm-sans">Select Service</Link>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Index