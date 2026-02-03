// Career Matching Engine - Generates dynamic recommendations based on user profile

import { careers, Career, getFilteredCareers, RoadmapStep } from './careerData';

export interface UserProfile {
  education: string;
  subjects: Record<string, number>;
  interests: string[];
  location: { state: string; district: string; type: string };
  finance: { budget: string; canRelocate: boolean; preferDuration: string };
}

export interface CareerMatch {
  career: Career;
  matchScore: number;
  breakdown: {
    academic: number;
    skill: number;
    interest: number;
    opportunity: number;
  };
  personalizedReasoning: {
    summary: string;
    strengths: string[];
    considerations: string[];
    localInsight: string;
  };
  nearbyLocations: string[];
}

// Calculate academic fit based on subject scores
function calculateAcademicFit(career: Career, subjects: Record<string, number>): number {
  const requiredSubjects = career.eligibility.requiredSubjects;
  
  if (requiredSubjects.length === 0) {
    // No specific requirements - give average score
    const avgScore = Object.values(subjects).reduce((a, b) => a + b, 0) / Math.max(Object.keys(subjects).length, 1);
    return Math.round(avgScore * 0.7 + 30); // Normalize to 30-100 range
  }
  
  let totalWeight = 0;
  let weightedScore = 0;
  
  for (const req of requiredSubjects) {
    const userScore = subjects[req.subject] || 50;
    const weight = req.minScore / 50; // Higher requirements = more weight
    
    // Score based on how well user meets/exceeds requirement
    let fitScore = 50;
    if (userScore >= req.minScore) {
      fitScore = 70 + (userScore - req.minScore) * 0.6; // Bonus for exceeding
    } else {
      fitScore = 50 - (req.minScore - userScore) * 0.5; // Penalty for not meeting
    }
    
    weightedScore += fitScore * weight;
    totalWeight += weight;
  }
  
  return Math.min(100, Math.max(0, Math.round(weightedScore / totalWeight)));
}

// Calculate skill alignment based on subject performance patterns
function calculateSkillFit(career: Career, subjects: Record<string, number>, interests: string[]): number {
  let score = 50;
  
  // Check if user's interests align with required skills
  const relevantInterests = career.eligibility.preferredInterests;
  const matchingInterests = interests.filter(i => relevantInterests.includes(i));
  score += matchingInterests.length * 15;
  
  // Boost based on relevant subject performance
  const subjectMappings: Record<string, string[]> = {
    technology: ['mathematics', 'computers'],
    engineering: ['mathematics', 'science'],
    healthcare: ['science'],
    business: ['mathematics', 'social'],
    creative: ['arts', 'languages'],
    education: ['languages', 'social'],
    agriculture: ['science'],
    government: ['social', 'languages']
  };
  
  for (const interest of matchingInterests) {
    const relevantSubjects = subjectMappings[interest] || [];
    for (const subj of relevantSubjects) {
      if (subjects[subj] && subjects[subj] >= 70) {
        score += 5;
      }
    }
  }
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

// Calculate interest alignment
function calculateInterestFit(career: Career, interests: string[]): number {
  const relevantInterests = career.eligibility.preferredInterests;
  
  if (relevantInterests.length === 0) return 70;
  
  const matchingCount = interests.filter(i => relevantInterests.includes(i)).length;
  const ratio = matchingCount / relevantInterests.length;
  
  return Math.round(50 + ratio * 50);
}

// Calculate local opportunity score
function calculateOpportunityFit(
  career: Career, 
  state: string, 
  areaType: string, 
  canRelocate: boolean
): number {
  let score = 60;
  
  // Check if career has state-specific opportunities
  const stateOpps = career.stateOpportunities[state] || career.stateOpportunities['default'];
  if (career.stateOpportunities[state]) {
    score += 20; // Bonus for state-specific opportunities
  }
  
  // Urban/rural considerations
  if (career.eligibility.urbanRequired && areaType === 'rural') {
    score -= 20;
    if (canRelocate) score += 15; // Partial recovery if can relocate
  }
  
  if (career.type === 'self-employed' && areaType === 'rural') {
    score += 15; // Self-employment often works well in rural areas
  }
  
  if (career.type === 'government') {
    score += 10; // Government jobs available in most areas
  }
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

// Generate personalized reasoning based on user profile and match
function generatePersonalizedReasoning(
  career: Career,
  breakdown: { academic: number; skill: number; interest: number; opportunity: number },
  profile: UserProfile
): { summary: string; strengths: string[]; considerations: string[]; localInsight: string } {
  const templates = career.reasoningTemplates;
  
  // Customize summary
  let summary = templates.summary;
  if (breakdown.academic >= 80) {
    summary = summary.replace('Your', 'Your exceptional');
  }
  if (profile.location.type === 'rural') {
    summary += ' This career can be pursued while staying connected to your roots.';
  }
  
  // Customize strengths based on breakdown
  const strengths = [...templates.strengths];
  if (breakdown.academic >= 85) {
    strengths.unshift(`Your ${breakdown.academic}% academic alignment indicates strong foundational preparation`);
  }
  if (breakdown.interest >= 90) {
    strengths.unshift(`Your interests closely match what this career requires`);
  }
  if (profile.finance.canRelocate) {
    strengths.push('Flexibility to relocate opens more opportunities');
  }
  
  // Customize considerations
  const considerations = [...templates.considerations];
  if (profile.finance.budget === 'low') {
    considerations.push('Look for free resources and scholarships to minimize costs');
  }
  if (profile.finance.preferDuration === '6months') {
    considerations.push('Short timeline preference - focus on intensive bootcamps or fast-track options');
  }
  
  // Generate local insight
  const stateOpps = career.stateOpportunities[profile.location.state] || career.stateOpportunities['default'];
  let localInsight = '';
  
  if (career.stateOpportunities[profile.location.state]) {
    localInsight = `In ${profile.location.state}, you have access to: ${stateOpps.join(', ')}. `;
    if (profile.location.district) {
      localInsight += `Being in ${profile.location.district} ${profile.location.type === 'rural' ? 'area' : 'city'} gives you ${profile.location.type === 'rural' ? 'a strong foundation for self-employment or local service' : 'access to urban opportunities'}.`;
    }
  } else {
    localInsight = `${stateOpps.join(', ')} are available in your region. `;
    if (career.type === 'self-employed') {
      localInsight += 'Self-employment options work well in your area with government support schemes.';
    } else if (profile.finance.canRelocate) {
      localInsight += 'Your willingness to relocate significantly expands your options.';
    }
  }
  
  return {
    summary,
    strengths: strengths.slice(0, 5),
    considerations: considerations.slice(0, 4),
    localInsight
  };
}

// Get nearby locations for opportunities
function getNearbyLocations(career: Career, state: string, district: string): string[] {
  const stateOpps = career.stateOpportunities[state];
  
  if (stateOpps) {
    return stateOpps.slice(0, 3);
  }
  
  // Default locations based on career type
  if (career.type === 'self-employed') {
    return [district || 'Your Village', 'Nearby Taluk', 'District Center'];
  } else if (career.type === 'government') {
    return [district || 'District HQ', state, 'Across India'];
  } else {
    return [state, 'Major Cities', 'Remote/Online'];
  }
}

// Main matching function
export function generateCareerMatches(profile: UserProfile): CareerMatch[] {
  // First, filter eligible careers
  const eligibleCareers = getFilteredCareers(
    profile.education,
    profile.interests,
    profile.finance.budget,
    profile.finance.preferDuration,
    profile.finance.canRelocate,
    profile.location.type
  );
  
  // If too few careers, add some from full list with adjusted scores
  let careersToScore = eligibleCareers;
  if (eligibleCareers.length < 5) {
    const additionalCareers = careers
      .filter(c => !eligibleCareers.includes(c))
      .slice(0, 10 - eligibleCareers.length);
    careersToScore = [...eligibleCareers, ...additionalCareers];
  }
  
  // Calculate scores for each career
  const matches: CareerMatch[] = careersToScore.map(career => {
    const breakdown = {
      academic: calculateAcademicFit(career, profile.subjects),
      skill: calculateSkillFit(career, profile.subjects, profile.interests),
      interest: calculateInterestFit(career, profile.interests),
      opportunity: calculateOpportunityFit(
        career, 
        profile.location.state, 
        profile.location.type, 
        profile.finance.canRelocate
      )
    };
    
    // Calculate weighted total score
    const weights = career.weights;
    const weightedScore = 
      (breakdown.academic * weights.academic +
       breakdown.skill * weights.skill +
       breakdown.interest * weights.interest +
       breakdown.opportunity * weights.opportunity) / 100;
    
    // Apply eligibility penalty if not fully eligible
    let finalScore = weightedScore;
    if (!eligibleCareers.includes(career)) {
      finalScore = finalScore * 0.8; // 20% penalty for not meeting all criteria
    }
    
    return {
      career,
      matchScore: Math.round(finalScore),
      breakdown,
      personalizedReasoning: generatePersonalizedReasoning(career, breakdown, profile),
      nearbyLocations: getNearbyLocations(career, profile.location.state, profile.location.district)
    };
  });
  
  // Sort by match score and return top matches
  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}

// Get roadmap for a specific career
export function getCareerRoadmap(careerId: string): RoadmapStep[] {
  const career = careers.find(c => c.id === careerId);
  return career?.roadmap || [];
}

// Format salary for display
export function formatSalary(career: Career): string {
  return career.salaryRange.display;
}
