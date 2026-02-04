// Comprehensive location data for Indian states
// Structure: State → Districts → Municipalities/Mandals

export interface Municipality {
  name: string;
  type: 'municipality' | 'mandal' | 'town';
}

export interface District {
  name: string;
  municipalities: Municipality[];
}

export interface StateData {
  name: string;
  code: string;
  districts: District[];
}

// Telangana comprehensive data
export const telanganaData: StateData = {
  name: 'Telangana',
  code: 'TS',
  districts: [
    {
      name: 'Hyderabad',
      municipalities: [
        { name: 'Secunderabad', type: 'municipality' },
        { name: 'Kukatpally', type: 'municipality' },
        { name: 'LB Nagar', type: 'municipality' },
        { name: 'Ameerpet', type: 'mandal' },
        { name: 'Begumpet', type: 'mandal' },
      ]
    },
    {
      name: 'Warangal',
      municipalities: [
        { name: 'Hanamkonda', type: 'municipality' },
        { name: 'Kazipet', type: 'town' },
        { name: 'Subedari', type: 'mandal' },
        { name: 'Hunter Road', type: 'mandal' },
      ]
    },
    {
      name: 'Karimnagar',
      municipalities: [
        { name: 'Karimnagar Urban', type: 'municipality' },
        { name: 'Manakondur', type: 'mandal' },
        { name: 'Huzurabad', type: 'town' },
        { name: 'Jammikunta', type: 'town' },
      ]
    },
    {
      name: 'Nizamabad',
      municipalities: [
        { name: 'Nizamabad Urban', type: 'municipality' },
        { name: 'Armoor', type: 'town' },
        { name: 'Bodhan', type: 'town' },
        { name: 'Kamareddy', type: 'mandal' },
      ]
    },
    {
      name: 'Khammam',
      municipalities: [
        { name: 'Khammam Urban', type: 'municipality' },
        { name: 'Kothagudem', type: 'town' },
        { name: 'Palwancha', type: 'mandal' },
        { name: 'Madhira', type: 'town' },
      ]
    },
    {
      name: 'Rangareddy',
      municipalities: [
        { name: 'Shamshabad', type: 'municipality' },
        { name: 'Shadnagar', type: 'town' },
        { name: 'Ibrahimpatnam', type: 'mandal' },
        { name: 'Maheshwaram', type: 'mandal' },
      ]
    },
    {
      name: 'Medchal-Malkajgiri',
      municipalities: [
        { name: 'Medchal', type: 'municipality' },
        { name: 'Kompally', type: 'mandal' },
        { name: 'Alwal', type: 'municipality' },
        { name: 'Quthbullapur', type: 'mandal' },
      ]
    },
    {
      name: 'Sangareddy',
      municipalities: [
        { name: 'Sangareddy Urban', type: 'municipality' },
        { name: 'Zaheerabad', type: 'town' },
        { name: 'Patancheru', type: 'municipality' },
        { name: 'Medak', type: 'mandal' },
      ]
    },
  ]
};

// Karnataka data
export const karnatakaData: StateData = {
  name: 'Karnataka',
  code: 'KA',
  districts: [
    {
      name: 'Bengaluru Urban',
      municipalities: [
        { name: 'Whitefield', type: 'municipality' },
        { name: 'Electronic City', type: 'municipality' },
        { name: 'Koramangala', type: 'mandal' },
        { name: 'Indiranagar', type: 'mandal' },
      ]
    },
    {
      name: 'Mysuru',
      municipalities: [
        { name: 'Mysuru Urban', type: 'municipality' },
        { name: 'Nanjangud', type: 'town' },
        { name: 'T Narasipura', type: 'mandal' },
      ]
    },
    {
      name: 'Mangaluru',
      municipalities: [
        { name: 'Mangaluru Urban', type: 'municipality' },
        { name: 'Surathkal', type: 'town' },
        { name: 'Udupi', type: 'municipality' },
      ]
    },
    {
      name: 'Hubli-Dharwad',
      municipalities: [
        { name: 'Hubli', type: 'municipality' },
        { name: 'Dharwad', type: 'municipality' },
        { name: 'Kundgol', type: 'mandal' },
      ]
    },
  ]
};

// Andhra Pradesh data
export const andhraData: StateData = {
  name: 'Andhra Pradesh',
  code: 'AP',
  districts: [
    {
      name: 'Visakhapatnam',
      municipalities: [
        { name: 'Vizag Urban', type: 'municipality' },
        { name: 'Gajuwaka', type: 'municipality' },
        { name: 'Pendurthi', type: 'mandal' },
      ]
    },
    {
      name: 'Vijayawada',
      municipalities: [
        { name: 'Vijayawada Urban', type: 'municipality' },
        { name: 'Guntur', type: 'municipality' },
        { name: 'Tenali', type: 'town' },
      ]
    },
    {
      name: 'Tirupati',
      municipalities: [
        { name: 'Tirupati Urban', type: 'municipality' },
        { name: 'Tirumala', type: 'town' },
        { name: 'Chandragiri', type: 'mandal' },
      ]
    },
  ]
};

// Maharashtra data
export const maharashtraData: StateData = {
  name: 'Maharashtra',
  code: 'MH',
  districts: [
    {
      name: 'Mumbai',
      municipalities: [
        { name: 'Mumbai Suburban', type: 'municipality' },
        { name: 'Thane', type: 'municipality' },
        { name: 'Navi Mumbai', type: 'municipality' },
      ]
    },
    {
      name: 'Pune',
      municipalities: [
        { name: 'Pune Urban', type: 'municipality' },
        { name: 'Pimpri-Chinchwad', type: 'municipality' },
        { name: 'Lonavala', type: 'town' },
      ]
    },
    {
      name: 'Nagpur',
      municipalities: [
        { name: 'Nagpur Urban', type: 'municipality' },
        { name: 'Kamptee', type: 'town' },
        { name: 'Hingna', type: 'mandal' },
      ]
    },
  ]
};

// State data map
export const stateDataMap: Record<string, StateData> = {
  'Telangana': telanganaData,
  'Karnataka': karnatakaData,
  'Andhra Pradesh': andhraData,
  'Maharashtra': maharashtraData,
};

// Get districts for a state
export function getDistrictsForState(stateName: string): District[] {
  return stateDataMap[stateName]?.districts || [];
}

// Get municipalities for a district in a state
export function getMunicipalitiesForDistrict(stateName: string, districtName: string): Municipality[] {
  const state = stateDataMap[stateName];
  if (!state) return [];
  
  const district = state.districts.find(d => d.name === districtName);
  return district?.municipalities || [];
}

// Get nearby locations based on state (for career cards)
export function getNearbyLocationsForState(stateName: string): string[] {
  const state = stateDataMap[stateName];
  if (!state) return ['Local opportunities available'];
  
  return state.districts.slice(0, 5).map(d => d.name);
}
