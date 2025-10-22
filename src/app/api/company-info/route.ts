import { NextResponse } from 'next/server';

// Mock company info
const mockCompanyInfo = {
  id: 1,
  mission: {
    en: 'To connect the right talent with the right opportunities, ensuring ethical and transparent recruitment practices globally.',
    np: 'सही प्रतिभा को सही अवसरों से जोड़ना, नैतिक और पारदर्शी भर्ती प्रथाएं सुनिश्चित करना'
  },
  vision: {
    en: 'To be the leading ethical recruitment partner empowering careers and building global workforces.',
    np: 'नैतिक भर्ती भागीदार के रूप में विश्व नेतृत्व प्रदान करना'
  },
  values: {
    en: 'Integrity, Transparency, Excellence, Responsibility, Compassion',
    np: 'सत्यनिष्ठा, पारदर्शिता, उत्कृष्टता, जिम्मेदारी, सहानुभूति'
  },
  description: {
    en: 'Sandiya Human Resources Pvt. Ltd. is Nepal\'s leading ethical recruitment partner. We provide zero-cost recruitment services, connecting talented professionals with global opportunities while maintaining the highest ethical standards.',
    np: 'Sandiya Human Resources नेपालको अग्रणी नैतिक भर्ती भागीदार हो'
  },
  founded: 2004,
  employees: 150,
};

export async function GET() {
  try {
    return NextResponse.json(mockCompanyInfo);
  } catch (error) {
    console.error('Company info API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company info' },
      { status: 500 }
    );
  }
}
