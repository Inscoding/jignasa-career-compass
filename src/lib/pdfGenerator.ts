// PDF Report Generator for JIGNASA Career Guidance Platform

import { jsPDF } from 'jspdf';
import { CareerMatch, UserProfile } from './careerMatchingEngine';
import { RoadmapStep } from './careerData';

interface ReportData {
  profile: UserProfile;
  matches: CareerMatch[];
  selectedCareer: CareerMatch;
  generatedAt: Date;
}

export async function generateCareerReport(data: ReportData): Promise<void> {
  const { profile, matches, selectedCareer, generatedAt } = data;
  const doc = new jsPDF();
  
  let yPos = 20;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  
  // Helper function to add text with word wrap
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 7): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string, index: number) => {
      doc.text(line, x, y + (index * lineHeight));
    });
    return y + (lines.length * lineHeight);
  };
  
  // Helper to check and add new page if needed
  const checkNewPage = (requiredSpace: number): void => {
    if (yPos + requiredSpace > 270) {
      doc.addPage();
      yPos = 20;
    }
  };
  
  // ===== HEADER =====
  doc.setFillColor(255, 153, 51); // Saffron
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('JIGNASA', margin, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('AI Career Guidance Platform', margin, 33);
  
  doc.setFontSize(8);
  doc.text(`Generated: ${generatedAt.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, pageWidth - margin - 50, 33);
  
  yPos = 55;
  
  // ===== USER PROFILE SECTION =====
  doc.setTextColor(20, 33, 61); // Navy
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Profile Summary', margin, yPos);
  yPos += 10;
  
  doc.setDrawColor(255, 153, 51);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, margin + 50, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  
  const educationLabels: Record<string, string> = {
    '10th': '10th Standard',
    '12th': '12th Standard',
    'graduate': 'Graduate',
    'postgraduate': 'Post Graduate'
  };
  
  doc.text(`Education Level: ${educationLabels[profile.education] || profile.education}`, margin, yPos);
  yPos += 7;
  doc.text(`Location: ${profile.location.district}, ${profile.location.state} (${profile.location.type})`, margin, yPos);
  yPos += 7;
  
  const budgetLabels: Record<string, string> = {
    'low': 'Minimal (< ₹50,000)',
    'medium': 'Moderate (₹50K - ₹2L)',
    'high': 'Flexible (> ₹2 Lakh)'
  };
  doc.text(`Investment Capacity: ${budgetLabels[profile.finance.budget] || profile.finance.budget}`, margin, yPos);
  yPos += 7;
  doc.text(`Can Relocate: ${profile.finance.canRelocate ? 'Yes' : 'Prefer Local Options'}`, margin, yPos);
  yPos += 12;
  
  // Interests
  doc.setFont('helvetica', 'bold');
  doc.text('Interests:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.interests.join(', '), margin + 25, yPos);
  yPos += 12;
  
  // Subject Scores
  doc.setFont('helvetica', 'bold');
  doc.text('Academic Performance:', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  
  const subjects = Object.entries(profile.subjects);
  subjects.forEach(([subject, score], index) => {
    const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
    const col = index % 2 === 0 ? margin : margin + contentWidth / 2;
    if (index % 2 === 0 && index !== 0) yPos += 6;
    doc.text(`${subjectName}: ${score}%`, col, yPos);
  });
  yPos += 15;
  
  // ===== TOP CAREER MATCHES =====
  checkNewPage(80);
  
  doc.setTextColor(20, 33, 61);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Top Career Matches', margin, yPos);
  yPos += 10;
  
  doc.setDrawColor(255, 153, 51);
  doc.line(margin, yPos, margin + 50, yPos);
  yPos += 10;
  
  // Career cards
  matches.slice(0, 3).forEach((match, index) => {
    checkNewPage(35);
    
    // Card background
    doc.setFillColor(248, 249, 250);
    doc.roundedRect(margin, yPos, contentWidth, 30, 3, 3, 'F');
    
    // Rank badge
    doc.setFillColor(255, 153, 51);
    doc.circle(margin + 10, yPos + 10, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}`, margin + 7.5, yPos + 13);
    
    // Career title
    doc.setTextColor(20, 33, 61);
    doc.setFontSize(12);
    doc.text(match.career.title, margin + 25, yPos + 10);
    
    // Type badge
    const typeColors: Record<string, number[]> = {
      'government': [20, 33, 61],
      'private': [255, 153, 51],
      'self-employed': [34, 197, 94]
    };
    doc.setFontSize(8);
    doc.setTextColor(...(typeColors[match.career.type] || [100, 100, 100]) as [number, number, number]);
    doc.text(match.career.type.charAt(0).toUpperCase() + match.career.type.slice(1), margin + 25, yPos + 17);
    
    // Score
    doc.setFillColor(255, 153, 51);
    doc.circle(pageWidth - margin - 15, yPos + 12, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${match.matchScore}%`, pageWidth - margin - 22, yPos + 14);
    
    // Stats
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Salary: ${match.career.salaryRange.display}  |  Time: ${match.career.timeToAchieve}`, margin + 25, yPos + 25);
    
    yPos += 35;
  });
  
  // ===== SELECTED CAREER DETAILS =====
  doc.addPage();
  yPos = 20;
  
  // Header
  doc.setFillColor(20, 33, 61); // Navy
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('RECOMMENDED CAREER', margin, 20);
  
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(selectedCareer.career.title, margin, 38);
  
  // Score circle
  doc.setFillColor(255, 153, 51);
  doc.circle(pageWidth - margin - 20, 30, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(`${selectedCareer.matchScore}%`, pageWidth - margin - 32, 33);
  doc.setFontSize(7);
  doc.text('Match', pageWidth - margin - 28, 39);
  
  yPos = 65;
  
  // Career Info
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos = addWrappedText(selectedCareer.career.description, margin, yPos, contentWidth);
  yPos += 10;
  
  // Stats row
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(margin, yPos, contentWidth, 25, 3, 3, 'F');
  
  const statWidth = contentWidth / 4;
  const stats = [
    { label: 'Salary Range', value: selectedCareer.career.salaryRange.display },
    { label: 'Time to Achieve', value: selectedCareer.career.timeToAchieve },
    { label: 'Type', value: selectedCareer.career.type },
    { label: 'Near You', value: selectedCareer.nearbyLocations[0] || 'Multiple' }
  ];
  
  stats.forEach((stat, i) => {
    const x = margin + (i * statWidth) + 5;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.text(stat.label, x, yPos + 8);
    doc.setTextColor(20, 33, 61);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(stat.value, x, yPos + 17);
    doc.setFont('helvetica', 'normal');
  });
  
  yPos += 35;
  
  // Score Breakdown
  doc.setTextColor(20, 33, 61);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Match Score Breakdown', margin, yPos);
  yPos += 10;
  
  const breakdownItems = [
    { label: 'Academic Fit', score: selectedCareer.breakdown.academic },
    { label: 'Skill Alignment', score: selectedCareer.breakdown.skill },
    { label: 'Interest Match', score: selectedCareer.breakdown.interest },
    { label: 'Local Opportunity', score: selectedCareer.breakdown.opportunity }
  ];
  
  breakdownItems.forEach((item, index) => {
    // Background bar
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(margin, yPos, contentWidth - 30, 6, 2, 2, 'F');
    
    // Progress bar
    const progressWidth = ((contentWidth - 30) * item.score) / 100;
    doc.setFillColor(255, 153, 51);
    doc.roundedRect(margin, yPos, progressWidth, 6, 2, 2, 'F');
    
    // Label and score
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(item.label, margin + contentWidth - 25, yPos + 5);
    doc.text(`${item.score}%`, pageWidth - margin - 10, yPos + 5);
    
    yPos += 12;
  });
  
  yPos += 10;
  
  // ===== AI REASONING =====
  checkNewPage(60);
  
  doc.setTextColor(20, 33, 61);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Analysis: Why This Career Suits You', margin, yPos);
  yPos += 10;
  
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos = addWrappedText(selectedCareer.personalizedReasoning.summary, margin, yPos, contentWidth);
  yPos += 10;
  
  // Strengths
  doc.setTextColor(34, 197, 94);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('✓ Why You Will Succeed:', margin, yPos);
  yPos += 7;
  
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  selectedCareer.personalizedReasoning.strengths.forEach(strength => {
    checkNewPage(10);
    yPos = addWrappedText(`• ${strength}`, margin + 5, yPos, contentWidth - 10, 5);
    yPos += 3;
  });
  yPos += 5;
  
  // Considerations
  checkNewPage(40);
  doc.setTextColor(234, 179, 8);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('⚠ Things to Consider:', margin, yPos);
  yPos += 7;
  
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  selectedCareer.personalizedReasoning.considerations.forEach(consideration => {
    checkNewPage(10);
    yPos = addWrappedText(`• ${consideration}`, margin + 5, yPos, contentWidth - 10, 5);
    yPos += 3;
  });
  yPos += 5;
  
  // Local Insight
  checkNewPage(30);
  doc.setFillColor(255, 243, 224);
  doc.roundedRect(margin, yPos, contentWidth, 30, 3, 3, 'F');
  
  doc.setTextColor(255, 153, 51);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('💡 Local Opportunity Insight', margin + 5, yPos + 8);
  
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  addWrappedText(selectedCareer.personalizedReasoning.localInsight, margin + 5, yPos + 15, contentWidth - 10, 5);
  
  yPos += 40;
  
  // ===== CAREER ROADMAP =====
  doc.addPage();
  yPos = 20;
  
  doc.setTextColor(20, 33, 61);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Career Roadmap: ${selectedCareer.career.title}`, margin, yPos);
  yPos += 15;
  
  const roadmap = selectedCareer.career.roadmap;
  const stepColors: Record<string, number[]> = {
    'education': [20, 33, 61],
    'skill': [255, 153, 51],
    'experience': [34, 197, 94],
    'goal': [147, 51, 234]
  };
  
  roadmap.forEach((step, index) => {
    checkNewPage(40);
    
    // Timeline dot
    const color = stepColors[step.type] || [100, 100, 100];
    doc.setFillColor(...color as [number, number, number]);
    doc.circle(margin + 8, yPos + 8, 6, 'F');
    
    // Step number
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}`, margin + 5.5, yPos + 11);
    
    // Connecting line
    if (index < roadmap.length - 1) {
      doc.setDrawColor(...color as [number, number, number]);
      doc.setLineWidth(1);
      doc.line(margin + 8, yPos + 14, margin + 8, yPos + 35);
    }
    
    // Content box
    doc.setFillColor(248, 249, 250);
    doc.roundedRect(margin + 20, yPos, contentWidth - 20, 30, 3, 3, 'F');
    
    // Step title and duration
    doc.setTextColor(20, 33, 61);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(step.title, margin + 25, yPos + 10);
    
    // Duration badge
    doc.setFillColor(...color as [number, number, number]);
    doc.roundedRect(pageWidth - margin - 35, yPos + 3, 30, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text(step.duration, pageWidth - margin - 33, yPos + 10);
    
    // Description
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    addWrappedText(step.description, margin + 25, yPos + 17, contentWidth - 60, 4);
    
    yPos += 38;
  });
  
  // ===== DISCLAIMER =====
  doc.addPage();
  yPos = 20;
  
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(margin, yPos, contentWidth, 60, 3, 3, 'F');
  
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Important Disclaimer', margin + 10, yPos + 15);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const disclaimerText = `This career guidance report is generated by an AI system based on the information you provided. While we strive for accuracy, the recommendations should be considered as guidance, not guaranteed outcomes.

• Salary ranges are estimates and may vary based on location, experience, and market conditions
• Career timelines depend on individual effort, available resources, and opportunities
• We recommend consulting with career counselors, teachers, and industry professionals
• Government schemes and policies mentioned may change over time
• Success in any career path requires dedication, continuous learning, and adaptability`;
  
  addWrappedText(disclaimerText, margin + 10, yPos + 25, contentWidth - 20, 5);
  
  yPos += 75;
  
  // Resources
  doc.setTextColor(20, 33, 61);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Useful Resources', margin, yPos);
  yPos += 10;
  
  const resources = [
    'National Career Service Portal: www.ncs.gov.in',
    'Skill India Portal: www.skillindia.gov.in',
    'National Skill Development Corporation: www.nsdcindia.org',
    'PMKVY (Pradhan Mantri Kaushal Vikas Yojana)',
    'State Employment Exchanges and Career Guidance Centers'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  resources.forEach(resource => {
    doc.text(`• ${resource}`, margin, yPos);
    yPos += 7;
  });
  
  yPos += 15;
  
  // Footer
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text('© 2024 JIGNASA - AI Career Guidance Platform for Rural India', margin, yPos);
  doc.text('Made with ❤️ for empowering rural youth', margin, yPos + 5);
  
  // Save the PDF
  const fileName = `JIGNASA_Career_Report_${selectedCareer.career.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
