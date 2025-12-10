import { Metadata } from 'next';

const TITLE = 'Algorithmic Dev';
const DESCRIPTION =
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs';

export const siteConfig: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        countryName: 'India',
        type: 'website',
        siteName: 'AlgorithmicDev',
        title: TITLE,
        url: `https://algorithmicdev.in`,
        locale: 'en_US',
    },
    creator: 'Vivek Kumar Gupta',
    icons: '/logo.png',
    keywords: [
        'blogs',
        'ed-tech',
        'coding tutorials for beginners',
        'software developer jobs in India',
        'AlgorithmicDev tutorials',
        'AlgorithmicDev coding platform',
        'daily job updates',
        'Data Structures',
        'tech jobs',
        'latest jobs',
        'Algorithms',
        'Python',
        'Java',
        'C++',
        'JavaScript',
        'Computer Networks',
    ],
    twitter: {
        creator: '@_Vivek_930',
        title: TITLE,
        description: DESCRIPTION,
        card: 'summary_large_image',
    },
    category: 'Technology',
};