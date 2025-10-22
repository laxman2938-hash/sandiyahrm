import { NextResponse } from 'next/server';

// Mock recruitment policy data
const mockPolicies = [
  {
    id: 1,
    title: { en: 'Zero Cost Recruitment', np: 'शून्य लागत भर्ती' },
    content: {
      en: 'We do not charge candidates any recruitment fees, ensuring fair and accessible opportunities for all.',
      np: 'हम उम्मीदवारों से कोई भर्ती शुल्क नहीं लेते'
    },
    icon: '💰',
    order: 1
  },
  {
    id: 2,
    title: { en: 'Ethical Practices', np: 'नैतिक प्रथाएं' },
    content: {
      en: 'Transparent and fair recruitment processes following international standards.',
      np: 'अंतर्राष्ट्रीय मानकों का पालन करते हुए पारदर्शी और निष्पक्ष भर्ती'
    },
    icon: '🛡️',
    order: 2
  },
  {
    id: 3,
    title: { en: 'No Discrimination', np: 'कोई भेदभाव नहीं' },
    content: {
      en: 'Equal opportunities for all candidates regardless of gender, religion, or background.',
      np: 'सभी उम्मीदवारों को समान अवसर'
    },
    icon: '🤝',
    order: 3
  },
  {
    id: 4,
    title: { en: 'Data Protection', np: 'डेटा संरक्षण' },
    content: {
      en: 'Strict confidentiality and protection of candidate information.',
      np: 'उम्मीदवार की जानकारी की सुरक्षा'
    },
    icon: '🔒',
    order: 4
  },
];

export async function GET() {
  try {
    return NextResponse.json({ 
      data: mockPolicies,
      success: true 
    });
  } catch (error) {
    console.error('Recruitment policy API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recruitment policies' },
      { status: 500 }
    );
  }
}
