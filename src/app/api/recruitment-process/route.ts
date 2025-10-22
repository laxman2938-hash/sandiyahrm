import { NextResponse } from 'next/server';

// Mock recruitment process data
const mockProcesses = [
  {
    id: 1,
    step: 1,
    title: { en: 'Pre Labor Approval', np: 'पूर्व श्रम अनुमोदन' },
    description: {
      en: 'Document review and Ministry compliance verification',
      np: 'दस्तावेज़ समीक्षा और मंत्रालय अनुपालन सत्यापन'
    },
    icon: '📋'
  },
  {
    id: 2,
    step: 2,
    title: { en: 'Advertisement', np: 'विज्ञापन' },
    description: {
      en: 'Wide-reaching job advertisement through multiple channels',
      np: 'विभिन्न चैनलों के माध्यम से नौकरी विज्ञापन'
    },
    icon: '📢'
  },
  {
    id: 3,
    step: 3,
    title: { en: 'Candidate Interview', np: 'उम्मीदवार साक्षात्कार' },
    description: {
      en: 'Professional interviews and candidate evaluation',
      np: 'व्यावसायिक साक्षात्कार और मूल्यांकन'
    },
    icon: '👥'
  },
  {
    id: 4,
    step: 4,
    title: { en: 'Communications', np: 'संचार' },
    description: {
      en: 'Selection notification and offer letter signing',
      np: 'चयन अधिसूचना और प्रस्ताव पत्र हस्ताक्षर'
    },
    icon: '✉️'
  },
];

export async function GET() {
  try {
    return NextResponse.json({ 
      data: mockProcesses,
      success: true 
    });
  } catch (error) {
    console.error('Recruitment process API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recruitment process' },
      { status: 500 }
    );
  }
}
